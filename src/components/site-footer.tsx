import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import { SpurLogo } from "./logo";

export function SiteFooter() {
  return (
    <footer
      className="mt-20"
      style={{ background: "#3a3a3a", color: "var(--white-text)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1fr_auto]">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          <SpurLogo variant="light-green" />
          <div className="type-body-sm" style={{ opacity: 0.85 }}>
            <div>© {new Date().getFullYear()} Spur Afrika Australia Ltd</div>
            <div>ABN 34 169 636 631</div>
          </div>
          <div className="flex items-center gap-5" style={{ opacity: 0.7 }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="mailto:hello@spurafrika.org" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col items-start justify-between gap-10 md:items-end">
          <CharityBadge />
          <nav className="flex flex-wrap items-center gap-8 type-body-sm" style={{ opacity: 0.85 }}>
            <Link to="/contact">Contact</Link>
            <a href="#">Policies</a>
            <a href="#">Terms of Use</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function CharityBadge() {
  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      style={{ color: "var(--white-text)", opacity: 0.85 }}
    >
      <defs>
        <path
          id="charity-top"
          d="M 55,55 m -42,0 a 42,42 0 1,1 84,0"
          fill="none"
        />
        <path
          id="charity-bottom"
          d="M 55,55 m -42,0 a 42,42 0 1,0 84,0"
          fill="none"
        />
      </defs>
      <circle cx="55" cy="55" r="52" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="55" cy="55" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <text fill="currentColor" fontSize="9" fontWeight="700" letterSpacing="2">
        <textPath href="#charity-top" startOffset="50%" textAnchor="middle">
          REGISTERED CHARITY
        </textPath>
      </text>
      <text fill="currentColor" fontSize="6" letterSpacing="1">
        <textPath href="#charity-bottom" startOffset="50%" textAnchor="middle">
          acnc.gov.au/charityregister
        </textPath>
      </text>
      {/* Simple ribbon mark in center */}
      <path
        d="M 47 42 Q 55 56 47 70 L 55 64 L 63 70 Q 55 56 63 42 L 55 48 Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}
