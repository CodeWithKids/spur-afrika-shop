import { Link } from "@tanstack/react-router";
import { SpurLogo } from "./logo";

export function SiteFooter() {
  return (
    <footer
      className="mt-20"
      style={{ background: "var(--dark-spruce)", color: "var(--white-text)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <SpurLogo variant="light-green" />
          <p className="mt-4 max-w-sm type-body-sm" style={{ color: "var(--white-text)", opacity: 0.8 }}>
            Branded merchandise that supports Spur Afrika's programs for children
            and families in Kenya. Every purchase fuels education, mentorship,
            and community impact.
          </p>
        </div>
        <div>
          <h4 className="type-eyebrow" style={{ color: "var(--brand-light-green)" }}>Shop</h4>
          <ul className="mt-4 space-y-2 type-body-sm">
            <li><Link to="/shop">All products</Link></li>
            <li><Link to="/shipping-returns">Shipping & returns</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="type-eyebrow" style={{ color: "var(--brand-light-green)" }}>Spur Afrika</h4>
          <ul className="mt-4 space-y-2 type-body-sm">
            <li>
              <a href="https://spurafrika.org" target="_blank" rel="noreferrer">
                spurafrika.org
              </a>
            </li>
            <li><Link to="/about-shop">About this shop</Link></li>
          </ul>
        </div>
      </div>
      <div
        className="border-t px-4 py-4 text-center type-body-sm"
        style={{ borderColor: "rgba(255,255,255,0.08)", color: "var(--white-text)", opacity: 0.7 }}
      >
        © {new Date().getFullYear()} Spur Afrika. All rights reserved.
      </div>
    </footer>
  );
}
