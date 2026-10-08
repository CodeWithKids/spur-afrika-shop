import { productImages, ACCENT_BG, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Square catalogue frame: full photo visible, no crop (shop grid, PDP, cart). */
export function productPhotoClassName(className?: string) {
  return cn(
    "aspect-square w-full rounded-lg bg-muted-grey object-contain object-center",
    className,
  );
}

export function ProductImage({
  product,
  className,
  imageIndex = 0,
  colorId,
  images: imagesOverride,
}: {
  product: Product;
  className?: string;
  imageIndex?: number;
  colorId?: string;
  images?: string[];
}) {
  const images = imagesOverride ?? productImages(product, colorId);
  const safeIndex = Math.min(imageIndex, Math.max(0, (images?.length ?? 1) - 1));
  const image = images?.[safeIndex];

  if (image) {
    return (
      <img
        src={image}
        alt={product.name}
        className={productPhotoClassName(className)}
        loading="lazy"
        decoding="async"
      />
    );
  }

  const initials = product.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  const darkBg = product.accent === "brand-dark" || product.accent === "spruce";

  return (
    <div
      className={cn(
        "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg",
        ACCENT_BG[product.accent],
        className,
      )}
      aria-hidden="true"
    >
      <span
        className="type-display"
        style={{
          fontSize: "clamp(3rem, 12vw, 6rem)",
          color: darkBg ? "var(--off-white)" : "var(--brand-dark-green)",
          opacity: 0.85,
        }}
      >
        {initials}
      </span>
      <span
        className="absolute bottom-3 left-3 type-eyebrow"
        style={{ color: darkBg ? "var(--off-white)" : "var(--brand-dark-green)" }}
      >
        Spur Afrika
      </span>
    </div>
  );
}
