import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/currency";
import { productPrice, type Product } from "@/lib/products";
import { ProductImage } from "./product-image";

export function ProductCard({ product }: { product: Product }) {
  const currency = useCart((s) => s.currency);
  const price = productPrice(product, currency);

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group flex h-full min-w-0 flex-col gap-3 rounded-xl bg-card p-3 transition hover:shadow-md"
    >
      <div className="relative">
        <ProductImage product={product} />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-dark px-2.5 py-1 text-[10px] font-semibold text-[var(--white-text)] sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-1 pb-1">
        <h3 className="type-h-small break-words text-foreground">{product.name}</h3>
        <p className="line-clamp-2 type-body text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="min-w-0 break-words type-h-small text-brand-dark">{formatPrice(price, currency)}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-dark group-hover:underline">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
