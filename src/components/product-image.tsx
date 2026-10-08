import { productImages, ACCENT_BG, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const CAP_PRODUCT_SLUGS = new Set(["baseball-cap", "spur-hive-baseball-cap"]);

function productPhotoPadding(slug: string) {
  return CAP_PRODUCT_SLUGS.has(slug) ? "p-4 sm:p-6" : "p-2 sm:p-3";
}

/** Square catalogue frame: full photo visible, no crop (shop grid, PDP, cart). */
export function productPhotoFrameClassName(className?: string, slug?: string) {
  return cn(
    "flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-muted-grey",
    slug && productPhotoPadding(slug),
    className,
  );
}

export function productPhotoClassName(className?: string) {
  return cn("max-h-full max-w-full object-contain object-center", className);
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
      <div className={productPhotoFrameClassName(className, product.slug)}>
        <img
          src={image}
          alt={product.name}
          className={productPhotoClassName()}
          loading="lazy"
          decoding="async"
        />
      </div>
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

export function ProductPhoto({
  src,
  alt,
  productSlug,
  className,
}: {
  src: string;
  alt: string;
  productSlug?: string;
  className?: string;
}) {
  return (
    <div className={productPhotoFrameClassName(className, productSlug)}>
      <img src={src} alt={alt} className={productPhotoClassName()} loading="lazy" decoding="async" />
    </div>
  );
}
