/**
 * Spur Afrika wordmark placeholder.
 *
 * Brand Guide v1: only Light Green / Green / Dark Green variants are permitted.
 * Do not recolour, rotate, stretch, or apply effects. Replace this component's
 * SVG body with the official wordmark file when the client provides it.
 */

type Variant = "green" | "dark-green" | "light-green";

const fill: Record<Variant, string> = {
  green: "var(--brand-green)",
  "dark-green": "var(--brand-dark-green)",
  "light-green": "var(--brand-light-green)",
};

export function SpurLogo({
  variant = "dark-green",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
      aria-label="Spur Afrika"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 2c2.8 4.2 6.4 7 11 8.6-3.4 1-6.4 3-8.6 6 3.6-1 7-1 11 .4-4 1.8-7 4.6-8.6 8.6-.6-4-2.6-7-6-9-.6 3.4-.4 7 1 11-3.4-2.4-6-5.6-7-9.6-2 3-3 6.4-3 10.4-1.6-4.4-1.6-9 0-13.6C7.4 9.4 11.2 5.2 16 2z"
          fill={fill[variant]}
        />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "1.125rem",
          letterSpacing: "-0.01em",
          color: fill[variant],
        }}
      >
        Spur Afrika
      </span>
    </span>
  );
}
