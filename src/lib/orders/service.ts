import { z } from "zod";
import type { Currency } from "@/lib/currency";
import { PRODUCTS, productPrice } from "@/lib/products";
import { SHIPPING_FLAT } from "@/lib/currency";
import {
  createExternalReference,
  formatPhoneForPayHero,
  type DeliveryAddress,
  type OrderLineItem,
  type OrderRecord,
} from "./types";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const cartLineSchema = z.object({
  productSlug: z.string().min(1),
  variantId: z.string().optional(),
  variantLabel: z.string().optional(),
  colorId: z.string().optional(),
  colorLabel: z.string().optional(),
  quantity: z.number().int().min(1).max(99),
});

export const checkoutPayloadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(9).max(20),
  fulfilment: z.enum(["pickup", "delivery"]),
  address: z.string().max(300).optional(),
  city: z.string().max(120).optional(),
  country: z.string().max(120).optional(),
  currency: z.enum(["KES", "USD", "AUD"]),
  lines: z.array(cartLineSchema).min(1),
});

export type CheckoutPayload = z.infer<typeof checkoutPayloadSchema>;

export function buildOrderFromPayload(payload: CheckoutPayload): {
  externalReference: string;
  lineItems: OrderLineItem[];
  subtotal: number;
  shipping: number;
  total: number;
  deliveryAddress: DeliveryAddress | null;
  phoneForPayHero: string;
} {
  const currency = payload.currency as Currency;

  if (currency !== "KES") {
    throw new Error("M-Pesa checkout is available in KES only. Switch currency to KES to pay with PayHero.");
  }

  if (payload.fulfilment === "delivery") {
    if (!payload.address?.trim() || !payload.city?.trim() || !payload.country?.trim()) {
      throw new Error("Delivery address, city, and country are required.");
    }
  }

  let subtotal = 0;
  const lineItems: OrderLineItem[] = [];

  for (const line of payload.lines) {
    const product = PRODUCTS.find((p) => p.slug === line.productSlug);
    if (!product) {
      throw new Error(`Unknown product: ${line.productSlug}`);
    }
    const unitPrice = productPrice(product, currency);
    const lineSubtotal = unitPrice * line.quantity;
    subtotal += lineSubtotal;
    lineItems.push({
      productSlug: product.slug,
      productName: product.name,
      quantity: line.quantity,
      unitPrice,
      subtotal: lineSubtotal,
      variantLabel: line.variantLabel,
      colorLabel: line.colorLabel,
    });
  }

  const shipping =
    payload.fulfilment === "pickup"
      ? SHIPPING_FLAT[currency].pickup
      : SHIPPING_FLAT[currency].delivery;
  const total = subtotal + shipping;

  const deliveryAddress =
    payload.fulfilment === "delivery"
      ? {
          address: payload.address!.trim(),
          city: payload.city!.trim(),
          country: payload.country!.trim(),
        }
      : null;

  return {
    externalReference: createExternalReference(),
    lineItems,
    subtotal,
    shipping,
    total,
    deliveryAddress,
    phoneForPayHero: formatPhoneForPayHero(payload.phone),
  };
}

export async function insertPendingOrder(
  payload: CheckoutPayload,
  computed: ReturnType<typeof buildOrderFromPayload>,
): Promise<OrderRecord> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("orders")
    .insert({
      external_reference: computed.externalReference,
      status: "pending",
      currency: payload.currency,
      subtotal: computed.subtotal,
      shipping: computed.shipping,
      total: computed.total,
      customer_name: payload.name.trim(),
      customer_email: payload.email.trim().toLowerCase(),
      customer_phone: payload.phone.trim(),
      fulfilment: payload.fulfilment,
      delivery_address: computed.deliveryAddress,
      line_items: computed.lineItems,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as OrderRecord;
}

export async function markOrderQueued(
  externalReference: string,
  payhero: { checkoutRequestId: string; reference?: string },
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("orders")
    .update({
      status: "queued",
      payhero_checkout_request_id: payhero.checkoutRequestId,
      payhero_reference: payhero.reference ?? null,
    })
    .eq("external_reference", externalReference);

  if (error) throw new Error(error.message);
}

export async function getOrderByExternalReference(
  externalReference: string,
): Promise<OrderRecord | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("external_reference", externalReference)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return (data as OrderRecord | null) ?? null;
}

export async function applyPayHeroCallback(payload: {
  externalReference: string;
  checkoutRequestId?: string;
  resultCode: number;
  resultDesc: string;
  amount?: number;
  mpesaReceipt?: string;
  raw: unknown;
}): Promise<OrderRecord | null> {
  const supabase = getSupabaseAdmin();
  const order = await getOrderByExternalReference(payload.externalReference);
  if (!order) return null;

  if (order.status === "paid") {
    return order;
  }

  const success = payload.resultCode === 0;
  const expectedAmount = Math.round(Number(order.total));
  if (success && payload.amount != null && Math.round(payload.amount) !== expectedAmount) {
    const { data, error } = await supabase
      .from("orders")
      .update({
        status: "failed",
        payment_result_code: payload.resultCode,
        payment_result_desc: `Amount mismatch: expected ${expectedAmount}, got ${payload.amount}`,
        raw_callback: payload.raw as object,
      })
      .eq("external_reference", payload.externalReference)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return data as OrderRecord;
  }

  const { data, error } = await supabase
    .from("orders")
    .update({
      status: success ? "paid" : "failed",
      payhero_checkout_request_id:
        payload.checkoutRequestId ?? order.payhero_checkout_request_id,
      mpesa_receipt_number: payload.mpesaReceipt ?? null,
      payment_result_code: payload.resultCode,
      payment_result_desc: payload.resultDesc,
      raw_callback: payload.raw as object,
    })
    .eq("external_reference", payload.externalReference)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as OrderRecord;
}
