import { createFileRoute, Link } from "@tanstack/react-router";
import spurHiveHero from "@/assets/spur-hive/spur-hive-hero-community.jpg";
import shoeBeforeAfter from "@/assets/spur-hive/shoe-before-after.jpg";
import communityShoeGiveaway from "@/assets/spur-hive/community-shoe-giveaway.jpg";
import { pageShell, sectionPadding } from "@/lib/layout";

export const Route = createFileRoute("/spur-hive")({
  head: () => ({
    meta: [
      { title: "Spur Hive — Spur Afrika" },
      {
        name: "description",
        content:
          "Join the Spur Hive, a community of changemakers supporting education in Kenya through the Kibera Community Experience, the Spur Fundraising Gala and the Spur Marathon.",
      },
      { property: "og:title", content: "Spur Hive — Spur Afrika" },
      {
        property: "og:description",
        content:
          "A community of changemakers investing in education one learner at a time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SpurHivePage,
});

const experiences = [
  {
    t: "The Kibera Community Experience",
    s: "Experience Impact. Build Connection.",
    d: "Step into the communities where Spur Afrika works through guided visits and community engagements, and witness firsthand the impact of education-focused interventions.",
    cta: "Experience Kibera with us",
  },
  {
    t: "The Spur Fundraising Gala",
    s: "Invest in the future of young people",
    d: "Our flagship fundraising event brings together partners, supporters and corporate organizations. Every ticket and sponsorship helps unlock opportunities for learners pursuing their dreams.",
    cta: "Attend the next Gala",
  },
  {
    t: "The Spur Marathon",
    s: "Every step creates opportunity",
    d: "Runners, walkers and supporters commit their kilometres to a greater purpose: raising awareness and funds so children from underserved communities can access life-changing education.",
    cta: "Run for a cause",
  },
];

function SpurHivePage() {
  return (
    <div>
      {/* Page hero */}
      <section className="relative min-h-[min(52vh,480px)] overflow-hidden text-[var(--white-text)]">
        <img
          src={spurHiveHero}
          alt="Spur Afrika community members and children gathered outdoors"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#2f2f2f]/92 via-[#2f2f2f]/52 to-[#2f2f2f]/18"
          aria-hidden
        />
        <div
          className={`relative flex min-h-[min(52vh,480px)] flex-col justify-center py-12 sm:py-16 ${pageShell}`}
        >
          <span className="type-eyebrow" style={{ color: "var(--brand-light-green)" }}>
            Spur Hive
          </span>
          <h1 className="mt-3 max-w-2xl type-display text-[var(--white-text)]">
            A community of changemakers
          </h1>
          <p className="mt-5 max-w-2xl type-body-lg" style={{ opacity: 0.9 }}>
            The Spur Hive is more than a giving community. It is a platform that
            lets members actively participate in experiences and initiatives that
            create meaningful impact for learners and communities, investing in
            education one learner at a time.
          </p>
        </div>
      </section>

      {/* What the Hive does */}
      <section className={`${sectionPadding} ${pageShell}`}>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 lg:gap-14">
          <div className="min-w-0 md:flex md:flex-col md:justify-center">
            <h2 className="type-h-large text-foreground">What the Hive makes possible</h2>
            <p className="mt-5 type-body text-muted-foreground">
              Hive members pool their time, skills and resources to keep children in
              school through the Elimisha sponsorship program 227 children supported
              to date, with 172 currently active. Members get front-row access to the
              work their generosity makes possible.
            </p>
            <ul className="mt-6 space-y-3 type-body text-muted-foreground">
              <li>• Sponsoring learners through school fees, uniforms and learning materials.</li>
              <li>• Backing mentorship and life-skills programs for teens and young adults.</li>
              <li>• Taking part in community experiences, events and fundraising drives.</li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl bg-muted-grey">
            <img
              src={shoeBeforeAfter}
              alt="Learner showing worn shoes beside new Toughees school shoes from Hive support"
              className="block h-auto w-full object-contain object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-background">
        <div className={`pt-2 pb-6 sm:pt-4 sm:pb-8 ${pageShell}`}>
          <h2 className="max-w-2xl type-h-large text-foreground">
            Experiences & initiatives
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {experiences.map((item) => (
              <article
                key={item.t}
                className="flex flex-col rounded-2xl bg-background p-6 shadow-sm"
              >
                <h3 className="type-h-small text-foreground">{item.t}</h3>
                <p className="mt-1 type-body-sm font-semibold text-brand-dark">{item.s}</p>
                <p className="mt-3 type-body text-muted-foreground">{item.d}</p>
                <a
                  href="https://spurafrika.org"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center type-body-sm font-semibold text-brand-dark hover:underline"
                >
                  {item.cta} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section>
        <div className={`pt-2 pb-12 sm:pt-4 sm:pb-16 ${pageShell}`}>
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl sm:min-h-[380px] md:grid md:min-h-[340px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <img
              src={communityShoeGiveaway}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-[center_32%]"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-[var(--spruce)]/92 via-[var(--spruce)]/55 to-[var(--spruce)]/32 md:bg-gradient-to-r md:from-[var(--spruce)]/94 md:via-[var(--spruce)]/58 md:to-[var(--spruce)]/22"
              aria-hidden
            />
            <div className="relative z-[1] flex flex-col justify-start px-6 pb-12 pt-10 text-center text-[var(--white-text)] md:justify-center md:px-8 md:py-12 md:text-left">
              <h2 className="type-h-large [text-shadow:0_1px_14px_rgba(0,0,0,0.35)]">
                Join the Hive
              </h2>
              <p
                className="mx-auto mt-4 max-w-xl type-body md:mx-0 [text-shadow:0_1px_10px_rgba(0,0,0,0.3)]"
                style={{ opacity: 0.95 }}
              >
                Become part of a community that believes every learner deserves the
                opportunity to thrive. Join the Spur Hive today and support
                initiatives that create lasting impact.
              </p>
              <a
                href="https://spurafrika.org"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center justify-center self-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand md:self-start"
              >
                Join the Spur Hive
              </a>
              <p className="mt-5 type-body-sm [text-shadow:0_1px_8px_rgba(0,0,0,0.28)]" style={{ opacity: 0.9 }}>
                Questions? Email{" "}
                <a
                  href="mailto:spurafrikake@gmail.com"
                  className="font-semibold underline underline-offset-2"
                >
                  spurafrikake@gmail.com
                </a>
              </p>
            </div>
            <div className="relative z-[1] hidden min-h-[12rem] md:block" aria-hidden />
          </div>
          <p className="mt-8 text-center type-body-sm text-muted-foreground">
            Want to support while you shop?{" "}
            <Link to="/shop" className="font-semibold text-brand-dark hover:underline">
              Browse the collection →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
