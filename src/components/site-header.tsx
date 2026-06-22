import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag } from "lucide-react";
import { useCart, cartCount } from "@/lib/cart-store";
import { CURRENCIES } from "@/lib/currency";
import { SpurLogo } from "./logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/shipping-returns", label: "Shipping" },
  { to: "/about-shop", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const lines = useCart((s) => s.lines);
  const currency = useCart((s) => s.currency);
  const setCurrency = useCart((s) => s.setCurrency);
  const count = cartCount(lines);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[var(--off-white)]/95 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-2 px-4 py-3 sm:gap-3 sm:py-4">
        <Link to="/" aria-label="Spur Afrika home" className="shrink-0">
          <SpurLogo variant="dark-green" />
        </Link>

        <nav className="hidden items-center justify-center gap-7 md:flex">
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

        <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
          <div className="flex items-center rounded-full border border-border bg-card p-0.5 text-[10px] font-semibold sm:text-xs">
            {CURRENCIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={
                  "rounded-full px-2 py-1 transition sm:px-3 " +
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
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-brand-dark px-3 py-2 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand sm:min-w-0 sm:px-4"
          >
            <ShoppingBag className="size-4" aria-hidden />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="ml-0.5 rounded-full bg-[var(--brand-light-green)] px-2 py-0.5 text-xs font-bold text-[var(--brand-dark-green)] sm:ml-1">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted md:hidden"
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,20rem)] bg-[var(--off-white)]">
              <SheetHeader>
                <SheetTitle className="text-left text-brand-dark">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3 type-body font-semibold text-foreground transition hover:text-brand-dark"
                    activeProps={{ className: "text-brand-dark" }}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="type-eyebrow text-muted-foreground">Currency</span>
                <div className="flex items-center rounded-full border border-border bg-card p-0.5 text-xs font-semibold">
                  {CURRENCIES.map((c) => (
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
