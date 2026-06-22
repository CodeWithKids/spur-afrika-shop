import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/currency";
import { getProduct, relatedProducts } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.name} — Spur Afrika Shop` },
        { name: "description", content: p.shortDescription },
        { property: "og:title", content: `${p.name} — Spur Afrika` },
        { property: "og:description", content: p.shortDescription },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="type-h-large text-foreground">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-block text-brand-dark underline">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const currency = useCart((s) => s.currency);
  const addLine = useCart((s) => s.addLine);

  const price = currency === "KES" ? product.priceKES : product.priceUSD;
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);
  const [qty, setQty] = useState(1);

  const selectedVariant = product.variants?.find((v) => v.id === variantId);
  const inStock = !product.variants || (selectedVariant?.stock ?? 0) > 0;

  const related = relatedProducts(product.slug);

  const handleAdd = (goToCart = false) => {
    if (!inStock) return;
    addLine({
      productSlug: product.slug,
      variantId,
      variantLabel: selectedVariant?.label,
      quantity: qty,
    });
    toast.success(`Added ${qty} × ${product.name} to your cart`);
    if (goToCart) navigate({ to: "/cart" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="mb-6 type-body-sm text-muted-foreground">
        <Link to="/shop" className="hover:text-brand-dark">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <ProductImage product={product} />
        </div>
        <div>
          <span className="type-eyebrow text-brand-dark">{product.category}</span>
          <h1 className="mt-2 type-h-large text-foreground">{product.name}</h1>
          <p className="mt-4 type-h text-brand-dark">{formatPrice(price, currency)}</p>
          <p className="mt-6 type-body text-muted-foreground">{product.description}</p>

          {product.variants && product.variantLabel && (
            <div className="mt-8">
              <div className="type-eyebrow text-foreground">{product.variantLabel}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const active = v.id === variantId;
                  const out = v.stock === 0;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={out}
                      onClick={() => setVariantId(v.id)}
                      className={
                        "min-w-12 rounded-md border px-4 py-2 text-sm font-semibold transition " +
                        (out
                          ? "cursor-not-allowed border-border text-[var(--text-disabled)] line-through"
                          : active
                            ? "border-brand-dark bg-brand-dark text-[var(--white-text)]"
                            : "border-border bg-card text-foreground hover:border-brand")
                      }
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 text-foreground hover:text-brand-dark"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="p-3 text-foreground hover:text-brand-dark"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              disabled={!inStock}
              onClick={() => handleAdd(false)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag className="size-4" />
              {inStock ? "Add to cart" : "Out of stock"}
            </button>
          </div>
          <button
            type="button"
            disabled={!inStock}
            onClick={() => handleAdd(true)}
            className="mt-3 w-full rounded-full border border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark transition hover:bg-muted-green disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buy now
          </button>

          <p className="mt-6 type-body-sm text-muted-foreground">
            Ships from Nairobi. Pickup available in-store; flat-rate delivery worldwide.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="type-h text-foreground">You may also like</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
