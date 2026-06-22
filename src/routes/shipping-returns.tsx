import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Spur Afrika Shop" },
      { name: "description", content: "Shipping rates, delivery timelines and returns policy for Spur Afrika merchandise." },
      { property: "og:title", content: "Shipping & Returns — Spur Afrika" },
      { property: "og:description", content: "Shipping, delivery and returns for Spur Afrika merch." },
    ],
  }),
  component: () => (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <span className="type-eyebrow text-brand-dark">Policies</span>
      <h1 className="mt-2 type-h-large text-foreground">Shipping & returns</h1>

      <h2 className="mt-10 type-h text-foreground">Shipping</h2>
      <ul className="mt-4 space-y-3 type-body text-muted-foreground">
        <li>• <strong className="text-foreground">Nairobi pickup:</strong> free, from our office (address shared in your order email).</li>
        <li>• <strong className="text-foreground">Kenya delivery:</strong> flat KES 350, 2–5 business days.</li>
        <li>• <strong className="text-foreground">International:</strong> flat USD 25, 7–21 business days depending on destination.</li>
      </ul>

      <h2 className="mt-10 type-h text-foreground">Returns</h2>
      <p className="mt-4 type-body text-muted-foreground">
        We accept returns of unworn, unwashed items within 14 days of delivery
        for store credit or exchange. Custom and sale items are final. Email{" "}
        <a className="text-brand-dark underline" href="mailto:info@spurafrika.org">
          info@spurafrika.org
        </a>{" "}
        with your order number to start a return.
      </p>
    </article>
  ),
});
