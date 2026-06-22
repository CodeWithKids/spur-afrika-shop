import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import charityBadge from "@/assets/registered-charity-badge.png.asset.json";

function FooterLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="h-14 w-14" aria-label="Spur Afrika">
      <path
        d="M250,221.6c51.41,0,82.1-39.19,82.1-104.83,0-60.56-32.22-99.7-82.1-99.7-51.41,0-82.1,37.27-82.1,99.7C167.9,169,193.29,221.6,250,221.6Zm0-157.4c30.44,0,35,32.94,35,52.57,0,38.29-11.77,57.71-35,57.71-33.29,0-35-48.07-35-57.71C215,64.2,239.54,64.2,250,64.2Z"
        fill="#97c93d"
      />
      <path
        d="M465.1,208.53c-3.35.3-82.84,8-152.48,73.45-31,29.14-49.47,64.83-61.51,96.39-11.5-33.68-29.63-72.08-61.63-102.14-70.4-66.13-152.94-67.75-156.42-67.78h-.25a23.56,23.56,0,0,0-.25,47.12c.67,0,67.5,1.32,124.65,55,38.37,36.05,52.38,90,61.65,125.7,2.54,9.82,4.64,17.87,6.94,24.49a23.56,23.56,0,0,0,23.52,22.17h1.37A23.58,23.58,0,0,0,274.19,461c2.21-6.05,4.3-13.3,6.84-22.11,9.87-34.21,24.8-85.91,63.85-122.6,57-53.54,123.08-60.72,124.45-60.86a23.57,23.57,0,0,0-4.23-46.94Z"
        fill="#97c93d"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-spruce text-[var(--white-text)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1fr_auto]">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          <FooterLogo />
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
            <a href="mailto:info@spurafrika.org" aria-label="Email">
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
    <a
      href="https://www.acnc.gov.au/charity/charities/bcc5a650-3aaf-e811-a961-000d3ad24182/profile"
      target="_blank"
      rel="noreferrer"
      aria-label="View Spur Afrika on the ACNC charity register"
      className="transition hover:opacity-80"
    >
      <img
        src={charityBadge.url}
        alt="ACNC Registered Charity"
        className="h-24 w-24"
      />
    </a>
  );
}
