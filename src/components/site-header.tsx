import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag } from "lucide-react";
import { pageShell } from "@/lib/layout";
import { useCart, cartCount } from "@/lib/cart-store";
import { SpurLogo } from "./logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/spur-hive", label: "Spur Hive" },
  { to: "/contact", label: "Contact" },
  { href: "https://spurafrika.org/", label: "Spur Afrika" },
] as const;

const navLinkClass =
  "type-body-sm font-extrabold uppercase tracking-wide text-brand transition hover:text-brand-dark";

function NavItem({
  item,
  onNavigate,
  className = navLinkClass,
}: {
  item: (typeof nav)[number];
  onNavigate?: () => void;
  className?: string;
}) {
  if ("href" in item) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className={className}
      activeProps={{ className: "font-extrabold uppercase tracking-wide text-brand-dark underline underline-offset-4" }}
    >
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const lines = useCart((s) => s.lines);
  const count = cartCount(lines);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[var(--off-white)]/95 backdrop-blur">
      <div className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-3 sm:gap-3 sm:py-4 ${pageShell}`}>
        <Link to="/" aria-label="Spur Afrika home" className="shrink-0">
          <SpurLogo variant="dark-green" />
        </Link>

        <nav className="hidden items-center justify-center gap-7 md:flex">
          {nav.map((n) => (
            <NavItem key={"href" in n ? n.href : n.to} item={n} />
          ))}
        </nav>

        <div className="flex min-w-0 items-center justify-end gap-2">
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
                  <div key={"href" in n ? n.href : n.to} className="border-b border-border py-3">
                    <NavItem
                      item={n}
                      onNavigate={() => setOpen(false)}
                      className="type-body font-semibold text-foreground transition hover:text-brand-dark"
                    />
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
