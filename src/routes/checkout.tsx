import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useCart, priceLines } from "@/lib/cart-store";
import { pageShell } from "@/lib/layout";
import { formatPrice, SHIPPING_FLAT } from "@/lib/currency";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Spur Afrika Shop" },
      { name: "description", content: "Complete your Spur Afrika merchandise order." },
      { property: "og:title", content: "Checkout — Spur Afrika Shop" },
      { property: "og:description", content: "Complete your Spur Afrika merchandise order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

type CheckoutApiResponse = {
  orderReference?: string;
  checkoutRequestId?: string;
  message?: string;
  error?: string;
};

function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const currency = useCart((s) => s.currency);
  const clear = useCart((s) => s.clear);
  const priced = priceLines(lines, currency);
  const subtotal = priced.reduce((n, l) => n + l.subtotal, 0);
  const navigate = useNavigate();

  const [fulfilment, setFulfilment] = useState<"pickup" | "delivery">("delivery");
  const [submitting, setSubmitting] = useState(false);
  const shipping = fulfilment === "pickup" ? SHIPPING_FLAT[currency].pickup : SHIPPING_FLAT[currency].delivery;
  const total = subtotal + shipping;

  if (priced.length === 0) {
    return (
      <div className={`py-24 text-center ${pageShell}`}>
        <h1 className="type-h-large text-foreground">Nothing to check out</h1>
        <p className="mt-3 type-body text-muted-foreground">Add items to your cart first.</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] hover:bg-brand"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className={`py-8 sm:py-12 ${pageShell}`}>
      <h1 className="type-h-large text-foreground">Checkout</h1>

      {currency !== "KES" && (
        <p className="mt-4 rounded-lg border border-border bg-muted px-4 py-3 type-body-sm text-muted-foreground">
          PayHero M-Pesa checkout requires <strong className="text-foreground">KES</strong>. Switch
          currency in the header before placing your order.
        </p>
      )}

      <form
        className="mt-8 grid gap-8 lg:grid-cols-[1fr_min(400px,100%)] lg:gap-12"
        onSubmit={async (e) => {
          e.preventDefault();
          if (currency !== "KES") {
            toast.error("Switch to KES to pay with M-Pesa.");
            return;
          }

          const form = e.currentTarget;
          const data = new FormData(form);

          setSubmitting(true);
          try {
            const payload = {
              name: String(data.get("name") ?? ""),
              email: String(data.get("email") ?? ""),
              phone: String(data.get("phone") ?? ""),
              fulfilment,
              address: fulfilment === "delivery" ? String(data.get("address") ?? "") : undefined,
              city: fulfilment === "delivery" ? String(data.get("city") ?? "") : undefined,
              country: fulfilment === "delivery" ? String(data.get("country") ?? "") : undefined,
              currency,
              lines: lines.map((line) => ({
                productSlug: line.productSlug,
                variantId: line.variantId,
                variantLabel: line.variantLabel,
                colorId: line.colorId,
                colorLabel: line.colorLabel,
                quantity: line.quantity,
              })),
            };

            const response = await fetch("/api/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            const result = (await response.json()) as CheckoutApiResponse;

            if (!response.ok) {
              toast.error(result.error ?? "Could not start payment.");
              return;
            }

            toast.success(result.message ?? "M-Pesa prompt sent to your phone.");
            clear();
            await navigate({
              to: "/checkout/success",
              search: { ref: result.orderReference ?? "" },
            });
          } catch {
            toast.error("Network error. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <div className="space-y-8">
          <fieldset className="min-w-0 space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
            <legend className="type-h-small px-2 text-foreground">Your details</legend>
            <Field label="Full name" name="name" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" name="email" type="email" required />
              <Field
                label="Phone number (M-Pesa)"
                name="phone"
                type="tel"
                placeholder="07… or +254…"
                hint="We’ll send the payment prompt to this Safaricom number."
                required
              />
            </div>
          </fieldset>

          <fieldset className="min-w-0 space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
            <legend className="type-h-small px-2 text-foreground">Fulfilment</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <RadioCard
                checked={fulfilment === "delivery"}
                onChange={() => setFulfilment("delivery")}
                title="Delivery"
                desc={`Flat ${formatPrice(SHIPPING_FLAT[currency].delivery, currency)}`}
              />
              <RadioCard
                checked={fulfilment === "pickup"}
                onChange={() => setFulfilment("pickup")}
                title="Pickup"
                desc="Free, Nairobi office"
              />
            </div>
            {fulfilment === "delivery" && (
              <div className="space-y-4 pt-2">
                <Field label="Delivery address" name="address" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="City / Town" name="city" required />
                  <Field label="Country" name="country" required />
                </div>
              </div>
            )}
          </fieldset>

        </div>

        <aside className="h-fit min-w-0 rounded-xl border border-border bg-card p-4 sm:p-6 md:sticky md:top-24">
          <h2 className="type-h-small text-foreground">Order summary</h2>
          <ul className="mt-4 divide-y divide-border text-sm">
            {priced.map(({ line, product, subtotal: lineTotal }) => (
              <li
                key={`${product.slug}-${line.colorId ?? ""}-${line.variantId ?? ""}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3"
              >
                <span className="min-w-0 flex-1 text-foreground">
                  {product.name}
                  {line.colorLabel && <span className="text-muted-foreground"> · {line.colorLabel}</span>}
                  {line.variantLabel && <span className="text-muted-foreground"> · {line.variantLabel}</span>}
                  <span className="text-muted-foreground"> × {line.quantity}</span>
                </span>
                <span className="shrink-0 font-semibold">{formatPrice(lineTotal, currency)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 type-body-sm">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(subtotal, currency)}</dd></div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"><dt className="text-muted-foreground">Shipping</dt><dd>{formatPrice(shipping, currency)}</dd></div>
          </dl>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="type-h-small">Total</span>
            <span className="type-h text-brand-dark">{formatPrice(total, currency)}</span>
          </div>
          <p className="mt-6 rounded-lg border border-border bg-muted px-3 py-3 type-body-sm text-muted-foreground">
            <span className="font-semibold text-foreground">M-Pesa</span>. After you place the order,
            enter your PIN on the STK push sent to your phone. Powered by PayHero.
          </p>
          <button
            type="submit"
            disabled={submitting || currency !== "KES"}
            className="mt-4 w-full rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Starting M-Pesa…" : "Pay with M-Pesa"}
          </button>
          <p className="mt-3 text-center type-body-sm text-muted-foreground">
            By placing the order you agree to Spur Afrika&apos;s terms.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="type-body-sm font-semibold text-foreground">
        {label}{required && <span className="text-destructive"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1 min-h-11 w-full rounded-md border border-border bg-background px-3 py-2 type-body-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
      {hint && <span className="mt-1.5 block type-body-sm text-muted-foreground">{hint}</span>}
    </label>
  );
}

function RadioCard({
  title,
  desc,
  checked,
  defaultChecked,
  onChange,
  name = "fulfilment",
}: {
  title: string;
  desc: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: () => void;
  name?: string;
}) {
  return (
    <label
      className={
        "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition " +
        (checked ? "border-brand-dark bg-muted-green" : "border-border bg-background hover:border-brand")
      }
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="mt-1 size-4 accent-[var(--brand-dark-green)]"
      />
      <div className="min-w-0">
        <div className="type-body-sm font-semibold text-foreground">{title}</div>
        <div className="type-body-sm text-muted-foreground">{desc}</div>
      </div>
    </label>
  );
}
