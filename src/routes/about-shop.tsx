import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about-shop")({
  head: () => ({
    meta: [
      { title: "About the Shop — Spur Afrika" },
      { name: "description", content: "Why we run the Spur Afrika merchandise shop and where the funds go." },
      { property: "og:title", content: "About the Shop — Spur Afrika" },
      { property: "og:description", content: "Where merchandise revenue goes and how it supports our programs." },
    ],
  }),
  component: AboutShop,
});

function AboutShop() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <span className="type-eyebrow text-brand-dark">About</span>
      <h1 className="mt-2 type-h-large text-foreground">More than merch</h1>
      <p className="mt-6 type-body-lg text-muted-foreground">
        Spur Afrika is a Kenya-based nonprofit working alongside children and
        families in Kibera, Dandora, and surrounding communities. Our programs
        cover education, mentorship, family support, and community health.
      </p>
      <p className="mt-4 type-body text-muted-foreground">
        This shop exists so supporters around the world can carry a piece of the
        mission with them. Every product is produced ethically and 100% of profit
        is reinvested in our programs.
      </p>
      <h2 className="mt-12 type-h text-foreground">Where the money goes</h2>
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
    </article>
  );
}
