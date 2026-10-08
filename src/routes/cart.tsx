import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, priceLines } from "@/lib/cart-store";
import { pageShell } from "@/lib/layout";
import { ctaPrimaryBlockClassName, ctaPrimaryClassName } from "@/lib/cta-button";
import { formatPrice, CURRENCIES } from "@/lib/currency";
import { ProductImage } from "@/components/product-image";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Spur Afrika Shop" },
      { name: "description", content: "Review the items in your Spur Afrika cart." },
      { property: "og:title", content: "Your Cart — Spur Afrika Shop" },
      { property: "og:description", content: "Review the items in your Spur Afrika cart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const lines = useCart((s) => s.lines);
  const currency = useCart((s) => s.currency);
  const setCurrency = useCart((s) => s.setCurrency);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const clear = useCart((s) => s.clear);

  const priced = priceLines(lines, currency);
  const subtotal = priced.reduce((n, l) => n + l.subtotal, 0);

  if (priced.length === 0) {
    return (
      <div className={`py-24 text-center ${pageShell}`}>
        <h1 className="type-h-large text-foreground">Your cart is empty</h1>
        <p className="mt-3 type-body text-muted-foreground">
          Find something you love in the shop.
        </p>
        <Link
          to="/shop"
          className={ctaPrimaryClassName("mt-8")}
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className={`py-8 sm:py-12 ${pageShell}`}>
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="type-h-large text-foreground">Your cart</h1>
        <div className="inline-flex w-fit max-w-full items-center rounded-full border border-border bg-card p-0.5 text-[10px] font-semibold sm:text-xs">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={
                "min-h-8 rounded-full px-2.5 py-1 transition sm:min-h-9 sm:px-3 " +
                (currency === c
                  ? "bg-brand-dark text-[var(--white-text)]"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_min(400px,100%)] lg:gap-12">
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {priced.map(({ line, product, unitPrice, subtotal: rowTotal }) => (
            <li
              key={`${product.slug}-${line.colorId ?? ""}-${line.variantId ?? ""}`}
              className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 p-3 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-4 sm:p-4"
            >
              <div className="w-20 shrink-0 sm:w-24">
                <ProductImage product={product} colorId={line.colorId} className="rounded-lg" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      className="type-h-small break-words text-foreground hover:text-brand-dark"
                    >
                      {product.name}
                    </Link>
                    {line.colorLabel && (
                      <p className="type-body-sm text-muted-foreground">
                        {product.colorLabel ?? "Colour"}: {line.colorLabel}
                      </p>
                    )}
                    {line.variantLabel && (
                      <p className="type-body-sm text-muted-foreground">{product.variantLabel}: {line.variantLabel}</p>
                    )}
                    <p className="type-body-sm text-muted-foreground">{formatPrice(unitPrice, currency)} each</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeLine(product.slug, line.variantId, line.colorId)}
                    className="min-h-11 min-w-11 shrink-0 p-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={() => updateQuantity(product.slug, line.variantId, line.colorId, line.quantity - 1)}
                      className="min-h-11 min-w-11 p-2"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase"
                      onClick={() => updateQuantity(product.slug, line.variantId, line.colorId, line.quantity + 1)}
                      className="min-h-11 min-w-11 p-2"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <span className="type-h-small whitespace-nowrap text-brand-dark">{formatPrice(rowTotal, currency)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-border bg-card p-4 sm:p-6 md:sticky md:top-24">
          <h2 className="type-h-small text-foreground">Order summary</h2>
          <dl className="mt-6 space-y-3 type-body-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold">{formatPrice(subtotal, currency)}</dd></div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4"><dt className="text-muted-foreground">Shipping</dt><dd className="text-right text-muted-foreground">Calculated at checkout</dd></div>
          </dl>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="type-h-small text-foreground">Total</span>
            <span className="type-h text-brand-dark">{formatPrice(subtotal, currency)}</span>
          </div>
          <Link
            to="/checkout"
            className={ctaPrimaryBlockClassName("mt-6 w-full text-center")}
          >
            Proceed to checkout
          </Link>
          <button
            type="button"
            onClick={() => clear()}
            className="mt-3 block w-full text-center type-body-sm text-muted-foreground hover:text-destructive"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}
