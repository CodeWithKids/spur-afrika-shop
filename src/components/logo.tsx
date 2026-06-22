import logoAsset from "@/assets/spur-afrika-logo.png.asset.json";

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
      src={logoAsset.url}
      alt="Spur Afrika"
      className={className}
      style={{ height: "40px", width: "auto", display: "inline-block" }}
      loading="eager"
    />
  );
}
