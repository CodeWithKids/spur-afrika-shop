import logoSrc from "@/assets/spur-afrika-logo.png";

export function SpurLogo({
  variant,
  className,
}: {
  variant?: "green" | "dark-green" | "light-green";
  className?: string;
}) {
  // The uploaded logo is already the correct brand colour.
  // variant is kept for API compatibility.
  void variant;
  return (
    <img
      src={logoSrc}
      alt="Spur Afrika"
      className={`h-8 w-auto sm:h-10 ${className ?? ""}`}
      loading="eager"
    />
  );
}
