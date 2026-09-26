import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { pageShell } from "@/lib/layout";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Spur Afrika" },
      { name: "description", content: "Browse all Spur Afrika merchandise — apparel, drinkware and accessories." },
      { property: "og:title", content: "Shop — Spur Afrika" },
      { property: "og:description", content: "Browse all Spur Afrika merchandise." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  return (
    <div className={`py-8 sm:py-12 ${pageShell}`}>
      <header className="mb-8">
        <span className="type-eyebrow text-brand-dark">Catalogue</span>
        <h1 className="mt-2 type-h-large text-foreground">Shop Spur Afrika</h1>
        <p className="mt-2 max-w-2xl type-body text-muted-foreground">
          Every purchase supports our programs in Kenya.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:flex-wrap lg:overflow-visible lg:px-8 xl:-mx-10 xl:px-10">
          <CategoryChip active={category === "all"} onClick={() => setCategory("all")}>All</CategoryChip>
          {CATEGORIES.map((c) => (
            <CategoryChip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
              {c.label}
            </CategoryChip>
          ))}
        </div>
        <label className="relative w-full lg:w-72 lg:shrink-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            className="min-h-11 w-full rounded-full border border-border bg-card py-2 pl-9 pr-4 type-body-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg bg-muted px-6 py-16 text-center type-body text-muted-foreground">
          No products match your search.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "min-h-11 shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-semibold transition " +
        (active
          ? "border-brand-dark bg-brand-dark text-[var(--white-text)]"
          : "border-border bg-card text-foreground hover:bg-muted")
      }
    >
      {children}
    </button>
  );
}
