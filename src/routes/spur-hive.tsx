import { createFileRoute, Link } from "@tanstack/react-router";
import spurHiveHero from "@/assets/hero-team.jpg";
import sponsoredLearnerPortrait from "@/assets/spur-hive/sponsored-learner-portrait.jpg";
import elimishaStudent from "@/assets/spur-hive/elimisha-student-uniform.jpg";
import olympicPrimary from "@/assets/spur-hive/olympic-primary-students.jpg";
import communityCelebration from "@/assets/spur-hive/community-celebration.jpg";
import shoeDistributionGroup from "@/assets/spur-hive/shoe-distribution-group.jpg";
import communityShoeGiveaway from "@/assets/spur-hive/community-shoe-giveaway.jpg";
import { pageShell } from "@/lib/layout";

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

const impactGallery = [
  {
    src: elimishaStudent,
    alt: "Smiling Elimisha sponsored learner in school uniform",
    caption: "School uniforms and fees keep learners in class.",
  },
  {
    src: olympicPrimary,
    alt: "Students in uniform at Olympic Primary School",
    caption: "Partnership with schools across Nairobi communities.",
  },
  {
    src: communityCelebration,
    alt: "Children celebrating together outdoors",
    caption: "Community programs that nurture joy and belonging.",
  },
  {
    src: shoeDistributionGroup,
    alt: "Young people receiving new school shoes",
    caption: "Essential supplies so children can learn with dignity.",
  },
  {
    src: sponsoredLearnerPortrait,
    alt: "Portrait of a sponsored learner smiling at camera",
    caption: "Every learner supported through Elimisha.",
  },
  {
    src: communityShoeGiveaway,
    alt: "Large group of children holding shoe donation boxes",
    caption: "Hive generosity reaching dozens of families at once.",
  },
] as const;

function SpurHivePage() {
  return (
    <div>
      {/* Page hero */}
      <section className="relative min-h-[min(48vh,440px)] overflow-hidden text-[var(--white-text)] sm:min-h-[min(52vh,480px)]">
        <img
          src={spurHiveHero}
          alt="Spur Afrika team members wearing branded hoodies and jackets outdoors"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0D1D23]/92 via-[#0D1D23]/75 to-[#0D1D23]/35"
          aria-hidden
        />
        <div
          className={`relative flex min-h-[min(48vh,440px)] flex-col justify-end py-12 sm:min-h-[min(52vh,480px)] sm:justify-center sm:py-16 ${pageShell}`}
        >
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
      <section className={`py-12 sm:py-16 ${pageShell}`}>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 lg:gap-14">
          <div className="min-w-0 md:flex md:flex-col md:justify-center">
            <h2 className="type-h-large text-foreground">What the Hive makes possible</h2>
            <p className="mt-5 type-body-lg text-muted-foreground">
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
          <div className="relative min-h-64 overflow-hidden rounded-2xl bg-muted-grey md:min-h-0 md:h-full md:self-stretch">
            <img
              src={olympicPrimary}
              alt="Students in uniform at Olympic Primary School"
              className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Elimisha & program impact — photo gallery */}
      <section style={{ background: "var(--muted-grey)" }}>
        <div className={`py-12 sm:py-16 ${pageShell}`}>
          <span className="type-eyebrow text-brand-dark">Elimisha in Kenya</span>
          <h2 className="mt-2 type-h-large text-foreground">See the impact you help create</h2>
          <p className="mt-4 max-w-3xl type-body text-muted-foreground">
            These moments from Spur Afrika&apos;s work show what Hive membership makes
            possible — children in school, supplied for learning, and supported by a
            community that shows up.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {impactGallery.map((photo) => (
              <li key={photo.src}>
                <figure className="overflow-hidden rounded-2xl bg-background shadow-sm">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="px-4 py-3 type-body-sm text-muted-foreground">
                    {photo.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-background">
        <div className={`py-12 sm:py-16 ${pageShell}`}>
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
        <div className={`py-12 sm:py-16 ${pageShell}`}>
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
