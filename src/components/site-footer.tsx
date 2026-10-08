import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { pageShell } from "@/lib/layout";
import charityBadge from "@/assets/registered-charity-badge.png";

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
    <footer className="mt-12 bg-spruce text-[var(--white-text)] md:mt-16">
      <div className={`grid gap-10 py-10 md:grid-cols-[1fr_auto] md:py-14 ${pageShell}`}>
        {/* Left column */}
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:gap-8 md:text-left">
          <FooterLogo />
          <div className="type-body-sm" style={{ opacity: 0.85 }}>
            <div>© {new Date().getFullYear()} Spur Afrika</div>
          </div>
          <div className="flex items-center gap-2" style={{ opacity: 0.7 }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-11 place-items-center">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/company/spurafrika-ke/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid size-11 place-items-center">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="mailto:spurafrikake@gmail.com" aria-label="Email" className="grid size-11 place-items-center">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col items-center gap-8 md:items-end md:justify-between">
          <CharityBadge />
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 items-center gap-x-6 gap-y-4 text-center type-body-sm sm:flex sm:flex-wrap sm:justify-center md:justify-end md:gap-8 md:text-right"
            style={{ opacity: 0.85 }}
          >
            <Link to="/contact">Contact</Link>
            <Link to="/shipping-returns">Shipping & Returns</Link>
            <a href="#">Policies</a>
            <a href="#">Terms of Use</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

const ACNC_URL =
  "https://www.acnc.gov.au/charity/charities/bcc5a650-3aaf-e811-a961-000d3ad24182/profile";

function trackAcncClick() {
  if (typeof window === "undefined") return;
  // Fire analytics events if a provider is wired up (GA4, GTM, Plausible, Fathom).
  type AnalyticsWindow = Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
    plausible?: (event: string, opts?: Record<string, unknown>) => void;
    fathom?: { trackEvent: (name: string) => void };
  };
  const w = window as AnalyticsWindow;
  const payload = {
    event: "acnc_badge_click",
    link_url: ACNC_URL,
    link_location: "footer",
  };
  try {
    w.gtag?.("event", "acnc_badge_click", payload);
    w.dataLayer?.push(payload);
    w.plausible?.("ACNC Badge Click", { props: { location: "footer" } });
    w.fathom?.trackEvent("ACNC Badge Click");
  } catch {
    /* analytics is best-effort */
  }
}

function CharityBadge() {
  return (
    <a
      href={ACNC_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View Spur Afrika's profile on the ACNC charity register (opens in a new tab)"
      title="Registered with the ACNC, view profile"
      data-analytics-id="acnc-badge"
      onClick={trackAcncClick}
      className="inline-flex shrink-0 rounded-full transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-spruce"
    >
      <img
        src={charityBadge}
        alt="ACNC Registered Charity, Australian Charities and Not-for-profits Commission"
        width={262}
        height={262}
        loading="lazy"
        decoding="async"
        className="h-20 w-20 md:h-24 md:w-24"
      />
    </a>
  );
}
