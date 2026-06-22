import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/currency";
import type { Product } from "@/lib/products";
import { ProductImage } from "./product-image";

export function ProductCard({ product }: { product: Product }) {
  const currency = useCart((s) => s.currency);
  const price = currency === "KES" ? product.priceKES : product.priceUSD;

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col gap-3 rounded-xl bg-card p-3 transition hover:shadow-md"
    >
      <div className="relative">
        <ProductImage product={product} />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-dark px-3 py-1 text-xs font-semibold text-[var(--white-text)]">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 px-1 pb-1">
        <h3 className="type-h-small text-foreground">{product.name}</h3>
        <p className="type-body-sm text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="type-h-small text-brand-dark">{formatPrice(price, currency)}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark group-hover:underline">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
