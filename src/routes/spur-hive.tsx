import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/spur-hive")({
  head: () => ({
    meta: [
      { title: "Spur Hive — Spur Afrika" },
      {
        name: "description",
        content:
          "Join the Spur Hive — a community of changemakers supporting education in Kenya through the Kibera Community Experience, the Spur Fundraising Gala and the Spur Marathon.",
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
    d: "Runners, walkers and supporters commit their kilometres to a greater purpose — raising awareness and funds so children from underserved communities can access life-changing education.",
    cta: "Run for a cause",
  },
];

function SpurHivePage() {
  return (
    <div>
      {/* Page hero */}
      <section className="bg-spruce text-[var(--white-text)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <span className="type-eyebrow" style={{ color: "var(--brand-light-green)" }}>
            Spur Hive
          </span>
          <h1 className="mt-3 max-w-2xl type-display">
            A community of <span style={{ color: "var(--brand-light-green)" }}>changemakers</span>
          </h1>
          <p className="mt-5 max-w-2xl type-body-lg" style={{ opacity: 0.9 }}>
            The Spur Hive is more than a giving community — it is a platform that
            lets members actively participate in experiences and initiatives that
            create meaningful impact for learners and communities, investing in
            education one learner at a time.
          </p>
        </div>
      </section>

      {/* What the Hive does */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="type-h-large text-foreground">What the Hive makes possible</h2>
        <p className="mt-5 type-body-lg text-muted-foreground">
          Hive members pool their time, skills and resources to keep children in
          school through the Elimisha sponsorship program — 214 children supported
          to date, with 172 currently active. Members get front-row access to the
          work their generosity makes possible.
        </p>
        <ul className="mt-6 space-y-3 type-body text-muted-foreground">
          <li>• Sponsoring learners through school fees, uniforms and learning materials.</li>
          <li>• Backing mentorship and life-skills programs for teens and young adults.</li>
          <li>• Taking part in community experiences, events and fundraising drives.</li>
        </ul>
      </section>

      {/* Experiences */}
      <section className="bg-muted-grey">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
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
                <p className="mt-3 type-body-sm text-muted-foreground">{item.d}</p>
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
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div
            className="rounded-2xl px-6 py-10 text-center"
            style={{ background: "var(--spruce)", color: "var(--white-text)" }}
          >
            <h2 className="type-h-large">Join the Hive</h2>
            <p className="mx-auto mt-4 max-w-xl type-body-lg" style={{ opacity: 0.85 }}>
              Become part of a community that believes every learner deserves the
              opportunity to thrive. Join the Spur Hive today and support
              initiatives that create lasting impact.
            </p>
            <a
              href="https://spurafrika.org"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand"
            >
              Join the Spur Hive
            </a>
            <p className="mt-5 type-body-sm" style={{ opacity: 0.7 }}>
              Questions? Email{" "}
              <a
                href="mailto:spurafrikake@gmail.com"
                className="font-semibold underline underline-offset-2"
              >
                spurafrikake@gmail.com
              </a>
            </p>
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
