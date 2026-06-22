import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Spur Afrika Shop" },
      { name: "description", content: "Get in touch with the Spur Afrika shop team." },
      { property: "og:title", content: "Contact — Spur Afrika Shop" },
      { property: "og:description", content: "Get in touch with the Spur Afrika shop team." },
    ],
  }),
  component: () => (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <span className="type-eyebrow text-brand-dark">Contact</span>
      <h1 className="mt-2 type-h-large text-foreground">We'd love to hear from you</h1>
      <p className="mt-4 type-body text-muted-foreground">
        Questions about an order, a bulk request, or partnering with Spur Afrika? Reach out.
      </p>

      <ul className="mt-10 space-y-5 type-body text-foreground">
        <li className="flex items-start gap-3">
          <Mail className="mt-0.5 size-5 text-brand-dark" />
          <a className="hover:underline" href="mailto:info@spurafrika.org">info@spurafrika.org</a>
        </li>
        <li className="flex items-start gap-3">
          <Phone className="mt-0.5 size-5 text-brand-dark" />
          <a className="hover:underline" href="tel:+254119011808">+254 119 011808</a>
        </li>
        <li className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-5 text-brand-dark" />
          <span>Spur Afrika, Nairobi, Kenya</span>
        </li>
      </ul>
    </article>
  ),
});
