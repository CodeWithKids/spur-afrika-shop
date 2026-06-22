import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart, cartCount } from "@/lib/cart-store";
import { SpurLogo } from "./logo";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/about-shop", label: "About" },
  { to: "/shipping-returns", label: "Shipping" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const lines = useCart((s) => s.lines);
  const currency = useCart((s) => s.currency);
  const setCurrency = useCart((s) => s.setCurrency);
  const count = cartCount(lines);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[var(--off-white)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" aria-label="Spur Afrika home">
          <SpurLogo variant="dark-green" />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="type-body-sm font-medium text-foreground transition hover:text-brand-dark"
              activeProps={{ className: "text-brand-dark underline underline-offset-4" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-border bg-card p-0.5 text-xs font-semibold sm:flex">
            {(["KES", "USD"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={
                  "rounded-full px-3 py-1 transition " +
                  (currency === c
                    ? "bg-brand-dark text-[var(--white-text)]"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {c}
              </button>
            ))}
          </div>
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full bg-brand-dark px-4 py-2 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand"
          >
            <ShoppingBag className="size-4" aria-hidden />
            <span>Cart</span>
            {count > 0 && (
              <span className="ml-1 rounded-full bg-[var(--brand-light-green)] px-2 py-0.5 text-xs font-bold text-[var(--brand-dark-green)]">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
