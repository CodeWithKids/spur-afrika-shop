export type OrderStatus = "pending" | "queued" | "paid" | "failed" | "cancelled";

export type OrderLineItem = {
  productSlug: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  variantLabel?: string;
  colorLabel?: string;
};

export type DeliveryAddress = {
  address: string;
  city: string;
  country: string;
};

export type OrderRecord = {
  id: string;
  external_reference: string;
  status: OrderStatus;
  currency: string;
  subtotal: number;
  shipping: number;
  total: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  fulfilment: "pickup" | "delivery";
  delivery_address: DeliveryAddress | null;
  line_items: OrderLineItem[];
  payhero_checkout_request_id: string | null;
  payhero_reference: string | null;
  mpesa_receipt_number: string | null;
  payment_result_code: number | null;
  payment_result_desc: string | null;
  created_at: string;
  updated_at: string;
};

export function createExternalReference(): string {
  const suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase();
  return `SA-${suffix}`;
}

/** PayHero samples use 07xxxxxxxx; keep local format when possible. */
export function formatPhoneForPayHero(phone: string): string {
  const trimmed = phone.trim();
  if (trimmed.startsWith("+254")) {
    return `0${trimmed.slice(4).replace(/\D/g, "")}`;
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length >= 12) {
    return `0${digits.slice(3)}`;
  }
  if (digits.startsWith("0")) return digits;
  if (digits.length === 9) return `0${digits}`;
  return trimmed;
}
