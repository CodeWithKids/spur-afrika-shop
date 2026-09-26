import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import heroImage from "@/assets/hero-team.jpg";
import { pageShell } from "@/lib/layout";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* Hero — team photo with mission copy overlay */}
      <section className="relative min-h-[min(78svh,640px)] overflow-hidden md:min-h-[min(72vh,640px)]">
        <img
          src={heroImage}
          alt="Spur Afrika team members wearing branded hoodies outdoors"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-[center_35%]"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0D1D23]/92 via-[#0D1D23]/82 to-[#0D1D23]/45 md:hidden"
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(105deg, rgba(13, 29, 35, 0.88) 0%, rgba(13, 29, 35, 0.72) 42%, rgba(13, 29, 35, 0.2) 100%)",
          }}
          aria-hidden
        />
        <div className={`relative flex min-h-[min(78svh,640px)] items-end py-10 sm:items-center sm:py-16 md:min-h-[min(72vh,640px)] md:py-24 ${pageShell}`}>
          <div className="max-w-xl">
            <span className="type-eyebrow" style={{ color: "var(--brand-light-green)" }}>
              Spur Afrika · Merch
            </span>
            <h1 className="mt-4 type-display" style={{ color: "var(--white-text)" }}>
              Wear the mission.{" "}
              <span style={{ color: "var(--brand-light-green)" }}>Fund the impact.</span>
            </h1>
            <p className="mt-4 max-w-lg type-body-lg sm:mt-6" style={{ color: "var(--white-text)", opacity: 0.9 }}>
              Every tee, hoodie and mug helps fund education, mentorship and
              community programs for children and families in Kenya.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:mt-8">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand"
              >
                Shop the collection
              </Link>
              <a
                href="https://spurafrika.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 px-6 py-3 text-center text-sm font-semibold text-[var(--white-text)] backdrop-blur-sm transition hover:bg-[var(--white-text)]/20"
              >
                Learn about Spur Afrika
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission strip — real Spur Afrika impact stats */}
      <section style={{ background: "var(--dark-spruce)", color: "var(--white-text)" }}>
        <div className={`grid gap-7 py-9 sm:grid-cols-2 sm:py-12 lg:grid-cols-4 ${pageShell}`}>
          {[
            { n: "100%", t: "of profit reinvested in our Elimisha sponsorship kitty, keeping more children in school" },
            { n: "16", t: "years transforming lives through education, mentorship and opportunity" },
            { n: "227", t: "children supported through the Elimisha sponsorship program" },
            { n: "172", t: "children currently active in the Elimisha program" },
          ].map((s) => (
            <div key={s.n}>
              <div className="type-h-large" style={{ color: "var(--brand-light-green)" }}>{s.n}</div>
              <p className="mt-2 type-body-sm" style={{ opacity: 0.85 }}>{s.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About — merged from the About page */}
      <section className={`py-12 sm:py-16 ${pageShell}`}>
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-10 lg:gap-14">
          <div className="overflow-hidden rounded-2xl bg-muted-grey">
            <img
              src={heroImage}
              alt="Spur Afrika team members in branded apparel outdoors"
              className="aspect-[4/3] w-full object-cover object-[center_30%] md:aspect-[3/4] md:min-h-[420px]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="min-w-0">
            <span className="type-eyebrow text-brand-dark">About</span>
            <h2 className="mt-2 type-h-large text-foreground">More than merchandise</h2>
            <p className="mt-6 type-body-lg text-muted-foreground">
              Every purchase from the Spur Afrika Shop helps fund programs that equip
              children and young people with education, mentorship, and opportunities
              to thrive. From classrooms to communities, your support helps transform
              lives and create lasting impact.
            </p>
            <p className="mt-4 type-body text-muted-foreground">
              Spur Afrika Kenya is based at Olympic Estate, Nairobi,
              working alongside children and families in Kibera and surrounding
              communities. Shop with purpose — impact a future.
            </p>
            <h3 className="mt-10 type-h text-foreground sm:mt-12">From your cart to their future</h3>
            <ul className="mt-4 space-y-3 type-body text-muted-foreground">
              <li>• School fees, uniforms and learning materials for sponsored children.</li>
              <li>• Mentorship and life-skills programming for teens and young adults.</li>
              <li>• Family livelihood support — food security, microenterprise grants.</li>
              <li>• Community health outreach and trauma-informed care.</li>
            </ul>
            <Link
              to="/shop"
              className="mt-10 inline-flex items-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] hover:bg-brand"
            >
              Shop the collection
            </Link>
          </div>
        </div>
      </section>

      {/* Spur Hive teaser — full details on /spur-hive */}
      <section style={{ background: "var(--muted-grey)" }}>
        <div className={`flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-14 ${pageShell}`}>
          <div className="min-w-0 flex-1">
            <span className="type-eyebrow text-brand-dark">Spur Hive</span>
            <h2 className="mt-2 type-h-large text-foreground">
              A community of changemakers
            </h2>
            <p className="mt-3 type-body text-muted-foreground">
              Experience Kibera, attend the Fundraising Gala, run the Spur
              Marathon — see how the Hive invests in education one learner at a
              time.
            </p>
          </div>
          <Link
            to="/spur-hive"
            className="inline-flex shrink-0 items-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand"
          >
            Explore the Spur Hive
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className={`py-12 sm:py-16 ${pageShell}`}>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
          <h2 className="min-w-0 type-h-large text-foreground">Featured products</h2>
          <Link to="/shop" className="shrink-0 type-body-sm font-semibold text-brand-dark hover:underline">
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
