import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { HomeHeroSlider, homeHeroLcpSrc } from "@/components/home-hero-slider";
import { ImpactStatsStrip } from "@/components/impact-stats-strip";
import elimishaStudent from "@/assets/spur-hive/elimisha-student-uniform.jpg";
import spurHiveTeam from "@/assets/spur-hive/spur-hive-team.jpg";
import { pageShell, sectionPadding } from "@/lib/layout";
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
    links: [
      {
        rel: "preload",
        as: "image",
        href: homeHeroLcpSrc,
        fetchPriority: "high",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div>
      <HomeHeroSlider />

      <ImpactStatsStrip />

      {/* About — merged from the About page */}
      <section className={`${sectionPadding} ${pageShell}`}>
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-10 lg:gap-14">
          <div className="relative min-h-64 overflow-hidden rounded-2xl bg-muted-grey md:min-h-0 md:h-full md:self-stretch">
            <img
              src={elimishaStudent}
              alt="Smiling Elimisha sponsored learner in school uniform"
              className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="min-w-0 md:flex md:flex-col md:justify-center">
            <span className="type-eyebrow text-brand-dark">About</span>
            <h2 className="mt-2 type-h-large text-foreground">More than merchandise</h2>
            <p className="mt-6 type-body text-muted-foreground">
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
              className="mt-10 inline-flex w-fit max-w-full items-center justify-center self-start rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] hover:bg-brand"
            >
              Shop the collection
            </Link>
          </div>
        </div>
      </section>

      {/* Spur Hive teaser — full details on /spur-hive */}
      <section style={{ background: "var(--muted-grey)" }}>
        <div className={`${sectionPadding} ${pageShell}`}>
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 lg:gap-14">
            <div className="min-w-0 md:flex md:flex-col md:justify-center">
              <span className="type-eyebrow text-brand-dark">Spur Hive</span>
              <h2 className="mt-2 type-h-large text-foreground">
                A community of changemakers
              </h2>
              <p className="mt-3 type-body text-muted-foreground">
                Experience Kibera, attend the Fundraising Gala, run the Spur
                Marathon — see how the Hive invests in education one learner at a
                time.
              </p>
              <Link
                to="/spur-hive"
                className="mt-6 inline-flex w-fit max-w-full items-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand"
              >
                Explore the Spur Hive
              </Link>
            </div>
            <div className="relative min-h-64 overflow-hidden rounded-2xl bg-background shadow-sm md:min-h-0 md:h-full md:min-h-[18rem] md:self-stretch lg:min-h-[20rem]">
              <img
                src={spurHiveTeam}
                alt="Spur Afrika team members in branded jackets"
                className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className={`${sectionPadding} ${pageShell}`}>
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
