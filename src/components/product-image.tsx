import { ACCENT_BG, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Brand-compliant placeholder visual. Solid brand-tinted background with the
 * product initials — never the logo on a photo (Brand Guide v1).
 * Swap this for real product imagery when assets land.
 */
export function ProductImage({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
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
