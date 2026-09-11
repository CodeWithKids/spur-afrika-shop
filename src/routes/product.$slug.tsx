import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/currency";
import { getProduct, categoryLabel, productImages, productPrice, relatedProducts, type Product } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }): { product: Product } => {
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
  const { product } = Route.useLoaderData() as { product: Product };
  const navigate = useNavigate();
  const currency = useCart((s) => s.currency);
  const addLine = useCart((s) => s.addLine);

  const price = productPrice(product, currency);
  const [colorId, setColorId] = useState(product.colors?.[0]?.id);
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);
  const [qty, setQty] = useState(1);

  const selectedColor = product.colors?.find((c) => c.id === colorId);
  const selectedVariant = product.variants?.find((v) => v.id === variantId);
  const inStock = !product.variants || (selectedVariant?.stock ?? 0) > 0;

  const related = relatedProducts(product.slug);

  const handleAdd = (goToCart = false) => {
    if (!inStock) return;
    addLine({
      productSlug: product.slug,
      variantId,
      variantLabel: selectedVariant?.label,
      colorId,
      colorLabel: selectedColor?.label,
      quantity: qty,
    });
    toast.success(`Added ${qty} × ${product.name} to your cart`);
    if (goToCart) navigate({ to: "/cart" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 type-body-sm text-muted-foreground">
        <Link to="/shop" className="hover:text-brand-dark">Shop</Link>
        <span aria-hidden>/</span>
        <span className="min-w-0 break-words text-foreground">{product.name}</span>
      </nav>

      <div className="grid min-w-0 gap-8 md:grid-cols-2 md:gap-8 lg:gap-10">
        <ProductGallery key={colorId} product={product} colorId={colorId} />
        <div className="min-w-0">
          <span className="type-eyebrow text-brand-dark">{categoryLabel(product.category)}</span>
          <h1 className="mt-2 type-h-large text-foreground">{product.name}</h1>
          <p className="mt-4 type-h text-brand-dark">{formatPrice(price, currency)}</p>
          <p className="mt-6 type-body text-muted-foreground">{product.description}</p>

          {product.colors && product.colorLabel && (
            <div className="mt-8">
              <div className="type-eyebrow text-foreground">{product.colorLabel}</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((c) => {
                  const active = c.id === colorId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      aria-label={c.label}
                      aria-pressed={active}
                      onClick={() => setColorId(c.id)}
                      className={
                        "flex min-h-11 items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition " +
                        (active
                          ? "border-brand-dark bg-brand-dark text-[var(--white-text)]"
                          : "border-border bg-card text-foreground hover:border-brand")
                      }
                    >
                      <span
                        className="size-5 shrink-0 rounded-full border border-black/10"
                        style={{ backgroundColor: c.swatch }}
                        aria-hidden
                      />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
                        "min-h-11 min-w-12 rounded-md border px-4 py-2 text-sm font-semibold transition " +
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

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <div className="inline-flex w-fit items-center rounded-full border border-border bg-card">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="min-h-11 min-w-11 p-3 text-foreground hover:text-brand-dark"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="min-h-11 min-w-11 p-3 text-foreground hover:text-brand-dark"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              disabled={!inStock}
              onClick={() => handleAdd(false)}
              className="inline-flex min-h-11 w-full flex-1 items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12 sm:mt-20">
          <h2 className="type-h text-foreground">You may also like</h2>
          <div className="mt-6 grid max-w-3xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ProductGallery({ product, colorId }: { product: Product; colorId?: string }) {
  const images = productImages(product, colorId) ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(activeIndex, Math.max(0, images.length - 1));

  if (!images.length) {
    return <ProductImage product={product} colorId={colorId} />;
  }

  return (
    <div className="space-y-3">
      <ProductImage
        product={product}
        colorId={colorId}
        imageIndex={safeIndex}
        images={images}
      />
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible">
          {images.map((src, index) => (
            <button
              key={`${colorId ?? "default"}-${index}`}
              type="button"
              aria-label={`View image ${index + 1} of ${images.length}`}
              onClick={() => setActiveIndex(index)}
              className={
                "size-16 shrink-0 overflow-hidden rounded-lg border-2 transition sm:size-auto sm:w-full " +
                (safeIndex === index ? "border-brand-dark" : "border-transparent hover:border-border")
              }
            >
              <img
                src={src}
                alt=""
                className="aspect-square w-full object-cover object-[center_20%]"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
