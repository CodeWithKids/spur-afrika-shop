import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, priceLines } from "@/lib/cart-store";
import { formatPrice } from "@/lib/currency";
import { ProductImage } from "@/components/product-image";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Spur Afrika Shop" },
      { name: "description", content: "Review the items in your Spur Afrika cart." },
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
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="type-h-large text-foreground">Your cart is empty</h1>
        <p className="mt-3 type-body text-muted-foreground">
          Find something you love in the shop.
        </p>
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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8 flex items-end justify-between">
        <h1 className="type-h-large text-foreground">Your cart</h1>
        <div className="inline-flex items-center rounded-full border border-border bg-card p-0.5 text-xs font-semibold">
          {(["KES", "USD"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={
                "rounded-full px-3 py-1 transition " +
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

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {priced.map(({ line, product, unitPrice, subtotal: rowTotal }) => (
            <li key={`${product.slug}-${line.variantId ?? ""}`} className="flex gap-4 p-4">
              <div className="w-24 shrink-0">
                <ProductImage product={product} />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      className="type-h-small text-foreground hover:text-brand-dark"
                    >
                      {product.name}
                    </Link>
                    {line.variantLabel && (
                      <p className="type-body-sm text-muted-foreground">{product.variantLabel}: {line.variantLabel}</p>
                    )}
                    <p className="type-body-sm text-muted-foreground">{formatPrice(unitPrice, currency)} each</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => removeLine(product.slug, line.variantId)}
                    className="p-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={() => updateQuantity(product.slug, line.variantId, line.quantity - 1)}
                      className="p-2"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase"
                      onClick={() => updateQuantity(product.slug, line.variantId, line.quantity + 1)}
                      className="p-2"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <span className="type-h-small text-brand-dark">{formatPrice(rowTotal, currency)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="type-h-small text-foreground">Order summary</h2>
          <dl className="mt-6 space-y-3 type-body-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold">{formatPrice(subtotal, currency)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="text-muted-foreground">Calculated at checkout</dd></div>
          </dl>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="type-h-small text-foreground">Total</span>
            <span className="type-h text-brand-dark">{formatPrice(subtotal, currency)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block rounded-full bg-brand-dark px-6 py-3 text-center text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand"
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
