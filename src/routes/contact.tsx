import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { pageShell, sectionPadding } from "@/lib/layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Spur Afrika Shop" },
      { name: "description", content: "Get in touch with the Spur Afrika shop team." },
      { property: "og:title", content: "Contact — Spur Afrika Shop" },
      { property: "og:description", content: "Get in touch with the Spur Afrika shop team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <article className={`${sectionPadding} ${pageShell}`}>
        <span className="type-eyebrow text-brand-dark">Contact</span>
        <h1 className="mt-2 type-h-large text-foreground">We'd love to hear from you</h1>
        <p className="mt-4 type-body text-muted-foreground">
          Questions about an order, a bulk request, or partnering with Spur Afrika? Reach out.
        </p>

        <ul className="mt-10 space-y-5 type-body text-foreground">
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-brand-dark" />
            <a className="min-w-0 break-all hover:underline" href="mailto:spurafrikake@gmail.com">spurafrikake@gmail.com</a>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-brand-dark" />
            <a className="hover:underline" href="tel:+254119011808">+254 119 011808</a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand-dark" />
            <span>Spur Afrika, Nairobi, Kenya</span>
          </li>
        </ul>
      </article>

      <section style={{ background: "var(--muted-grey)" }}>
        <div className={`flex flex-col items-center text-center ${sectionPadding} ${pageShell}`}>
          <h2 className="type-h-large text-foreground">Find us on social media</h2>
          <p className="mt-4 max-w-md type-body text-muted-foreground">
            Connect with us through any of the following social media platforms!
          </p>
          <div className="mt-8 flex items-center gap-5" style={{ color: "var(--spruce)" }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-12 place-items-center transition hover:opacity-70">
              <Facebook className="size-8" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-12 place-items-center transition hover:opacity-70">
              <Instagram className="size-8" />
            </a>
            <a href="https://www.linkedin.com/company/spurafrika-ke/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-12 place-items-center transition hover:opacity-70">
              <Linkedin className="size-8" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid size-12 place-items-center transition hover:opacity-70">
              <Youtube className="size-8" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

