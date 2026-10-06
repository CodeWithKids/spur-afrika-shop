import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { pageShell } from "@/lib/layout";
import { getOrderByExternalReference } from "@/lib/orders/service";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/currency";
import type { Currency } from "@/lib/currency";

const searchSchema = z.object({
  ref: z.string().optional(),
});

export const Route = createFileRoute("/checkout/success")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ ref: search.ref }),
  loader: async ({ deps }) => {
    const ref = deps.ref;
    if (!ref || !isSupabaseConfigured()) {
      return { order: null as null, ref };
    }
    try {
      const order = await getOrderByExternalReference(ref);
      return { order, ref };
    } catch {
      return { order: null, ref };
    }
  },
  head: () => ({
    meta: [{ title: "Order status — Spur Afrika Shop" }],
  }),
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  const { order, ref } = Route.useLoaderData();

  return (
    <div className={`py-12 sm:py-16 ${pageShell}`}>
      <h1 className="type-h-large text-foreground">Payment status</h1>

      {!ref && (
        <p className="mt-4 type-body text-muted-foreground">
          No order reference provided.
        </p>
      )}

      {ref && !order && (
        <p className="mt-4 type-body text-muted-foreground">
          We could not find order <span className="font-semibold">{ref}</span>. If you
          just paid, wait a moment and refresh — M-Pesa confirmations can take a
          short time.
        </p>
      )}

      {order && (
        <div className="mt-6 max-w-lg rounded-xl border border-border bg-card p-6">
          <p className="type-body-sm text-muted-foreground">Order reference</p>
          <p className="type-h-small text-foreground">{order.external_reference}</p>
          <p className="mt-4 type-body">
            Status:{" "}
            <span className="font-semibold capitalize text-brand-dark">{order.status}</span>
          </p>
          <p className="mt-2 type-body text-muted-foreground">
            Total:{" "}
            {formatPrice(Number(order.total), order.currency as Currency)}
          </p>
          {order.status === "queued" && (
            <p className="mt-4 type-body text-muted-foreground">
              Approve the M-Pesa prompt on your phone. This page will update after PayHero
              confirms payment.
            </p>
          )}
          {order.status === "paid" && (
            <p className="mt-4 type-body text-muted-foreground">
              Thank you — your payment was received
              {order.mpesa_receipt_number
                ? ` (M-Pesa receipt ${order.mpesa_receipt_number})`
                : ""}
              . We will follow up about fulfilment.
            </p>
          )}
          {order.status === "failed" && (
            <p className="mt-4 type-body text-muted-foreground">
              {order.payment_result_desc ?? "Payment was not completed."}{" "}
              <Link to="/checkout" className="font-semibold text-brand-dark hover:underline">
                Try checkout again
              </Link>
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/shop"
          className="inline-flex rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] hover:bg-brand"
        >
          Continue shopping
        </Link>
        {ref && (
          <Link
            to="/checkout/success"
            search={{ ref }}
            className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Refresh status
          </Link>
        )}
      </div>
    </div>
  );
}
