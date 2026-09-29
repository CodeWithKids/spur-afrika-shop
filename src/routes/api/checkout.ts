import { createFileRoute } from "@tanstack/react-router";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import {
  buildOrderFromPayload,
  checkoutPayloadSchema,
  insertPendingOrder,
  markOrderQueued,
} from "@/lib/orders/service";
import { getPayHeroConfig, initiateMpesaStkPush } from "@/lib/payhero/client";

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          if (!isSupabaseConfigured()) {
            return Response.json(
              {
                error:
                  "Order storage is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then run the Supabase migration.",
              },
              { status: 503 },
            );
          }

          const json = await request.json();
          const parsed = checkoutPayloadSchema.safeParse(json);
          if (!parsed.success) {
            return Response.json(
              { error: "Invalid checkout data.", details: parsed.error.flatten() },
              { status: 400 },
            );
          }

          const computed = buildOrderFromPayload(parsed.data);
          const order = await insertPendingOrder(parsed.data, computed);

          const payheroConfig = getPayHeroConfig();
          const stk = await initiateMpesaStkPush({
            amount: computed.total,
            phoneNumber: computed.phoneForPayHero,
            externalReference: order.external_reference,
            customerName: parsed.data.name.trim(),
            callbackUrl: payheroConfig.callbackUrl,
          });

          if (!stk.success || !stk.checkoutRequestId) {
            return Response.json(
              {
                error:
                  stk.message ??
                  "PayHero could not start M-Pesa payment. Check phone number and PayHero channel settings.",
                orderReference: order.external_reference,
              },
              { status: 502 },
            );
          }

          await markOrderQueued(order.external_reference, {
            checkoutRequestId: stk.checkoutRequestId,
            reference: stk.reference,
          });

          return Response.json({
            orderReference: order.external_reference,
            checkoutRequestId: stk.checkoutRequestId,
            payheroReference: stk.reference,
            status: stk.status ?? "QUEUED",
            message:
              "Check your phone for the M-Pesa prompt to complete payment.",
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Checkout failed.";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
