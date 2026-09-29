import { createFileRoute } from "@tanstack/react-router";
import { applyPayHeroCallback } from "@/lib/orders/service";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

type PayHeroCallbackBody = {
  status?: boolean;
  response?: {
    Amount?: number;
    CheckoutRequestID?: string;
    ExternalReference?: string;
    MpesaReceiptNumber?: string;
    ResultCode?: number;
    ResultDesc?: string;
    Status?: string;
  };
};

export const Route = createFileRoute("/api/public/payments/payhero/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSupabaseConfigured()) {
          return Response.json({ error: "Storage not configured" }, { status: 503 });
        }

        let body: PayHeroCallbackBody;
        try {
          body = (await request.json()) as PayHeroCallbackBody;
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const response = body.response;
        const externalReference = response?.ExternalReference?.trim();
        if (!externalReference) {
          return Response.json({ error: "Missing ExternalReference" }, { status: 400 });
        }

        const resultCode =
          typeof response.ResultCode === "number" ? response.ResultCode : -1;
        const resultDesc =
          response.ResultDesc?.trim() ??
          (resultCode === 0 ? "Success" : "Payment failed or cancelled");

        try {
          await applyPayHeroCallback({
            externalReference,
            checkoutRequestId: response.CheckoutRequestID,
            resultCode,
            resultDesc,
            amount: response.Amount,
            mpesaReceipt: response.MpesaReceiptNumber,
            raw: body,
          });
        } catch (error) {
          console.error("PayHero webhook error:", error);
          return Response.json({ error: "Failed to update order" }, { status: 500 });
        }

        return Response.json({ received: true });
      },
    },
  },
});
