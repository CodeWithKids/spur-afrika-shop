import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spur Afrika Shop — Wear the mission" },
      {
        name: "description",
        content:
          "Branded apparel, accessories and stationery from Spur Afrika. Every purchase funds our programs in Kenya.",
      },
      { property: "og:title", content: "Spur Afrika Shop — Wear the mission" },
      { property: "og:description", content: "Branded merchandise that funds Spur Afrika's programs in Kenya." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* Hero — Off White background with Dark Green accents (Brand Guide v1). */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="type-eyebrow text-brand-dark">Spur Afrika · Merch</span>
            <h1 className="mt-4 type-display text-foreground" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}>
              Wear the mission. <span className="text-brand-dark">Fund the impact.</span>
            </h1>
            <p className="mt-6 max-w-lg type-body-lg text-muted-foreground">
              Every tee, hoodie and mug helps fund education, mentorship and
              community programs for children and families in Kenya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand"
              >
                Shop the collection
              </Link>
              <a
                href="https://spurafrika.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Learn about Spur Afrika
              </a>
            </div>
          </div>
          <div
            className="relative aspect-square w-full rounded-3xl"
            style={{ background: "var(--muted-green)" }}
            aria-hidden
          >
            <div
              className="absolute inset-8 rounded-2xl"
              style={{ background: "var(--brand-dark-green)" }}
            />
            <div
              className="absolute left-12 top-12 right-12 bottom-12 rounded-xl"
              style={{ background: "var(--brand-light-green)" }}
            />
            <span
              className="absolute inset-0 flex items-center justify-center type-display"
              style={{ color: "var(--off-white)", fontSize: "clamp(3rem, 8vw, 5rem)" }}
            >
              SA
            </span>
          </div>
        </div>
      </section>

      {/* Mission strip — Dark Spruce background (Brand Guide v1 dark sections). */}
      <section style={{ background: "var(--dark-spruce)", color: "var(--white-text)" }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          {[
            { n: "100%", t: "of profit reinvested in programs" },
            { n: "12+", t: "years serving Kenyan communities" },
            { n: "1000s", t: "of children supported each year" },
          ].map((s) => (
            <div key={s.n}>
              <div className="type-h-large" style={{ color: "var(--brand-light-green)" }}>{s.n}</div>
              <p className="mt-2 type-body" style={{ opacity: 0.85 }}>{s.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="type-h-large text-foreground">Featured products</h2>
          <Link to="/shop" className="type-body-sm font-semibold text-brand-dark hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
