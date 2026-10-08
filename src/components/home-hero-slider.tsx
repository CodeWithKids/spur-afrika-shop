import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import heroTeam from "@/assets/hero-team.jpg";
import spurHiveTeam from "@/assets/spur-hive/spur-hive-team.jpg";
import artWorkshop from "@/assets/spur-hive/art-workshop.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { pageShell } from "@/lib/layout";

const SLIDES = [
  {
    src: heroTeam,
    alt: "Spur Afrika team members wearing branded hoodies outdoors",
    imageClass: "object-[50%_28%] md:object-[50%_17%]",
  },
  {
    src: spurHiveTeam,
    alt: "Spur Afrika team members in branded jackets",
    imageClass: "object-[55%_32%] md:object-[58%_25%]",
  },
  {
    src: artWorkshop,
    alt: "Children at a creative art workshop with easels and paint supplies",
    imageClass: "object-[50%_35%] md:object-[60%_29%]",
  },
] as const;

/** First slide URL — use for `<link rel="preload">` on the home route. */
export const homeHeroLcpSrc = SLIDES[0].src;

function shouldLoadSlideImage(index: number, active: number, total: number) {
  if (index === active) return true;
  return index === (active + 1) % total;
}

const DESKTOP_OVERLAY =
  "linear-gradient(105deg, rgba(47, 47, 47, 0.9) 0%, rgba(47, 47, 47, 0.52) 34%, rgba(47, 47, 47, 0.12) 100%)";

const AUTOPLAY_MS = 6000;

/** Min height tuned per breakpoint; landscape phones stay compact via media query class. */
const heroSectionHeight = cn(
  "min-h-[clamp(26rem,88svh,36rem)]",
  "sm:min-h-[clamp(28rem,86svh,44rem)]",
  "md:min-h-[clamp(32rem,82vh,52rem)]",
  "lg:min-h-[clamp(34rem,80vh,55rem)]",
  "xl:min-h-[clamp(36rem,78vh,58rem)]",
  "hero-landscape-compact",
);

export function HomeHeroSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const autoplay = useRef(
    Autoplay({
      delay: AUTOPLAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const onSelect = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setActive(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    const next = (active + 1) % SLIDES.length;
    const img = new Image();
    img.src = SLIDES[next].src;
  }, [active]);

  return (
    <section
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-[#2f2f2f]",
        heroSectionHeight,
      )}
    >
      <Carousel
        className="absolute inset-0 z-0 h-full w-full [&>div]:h-full"
        opts={{ loop: true, duration: 35 }}
        plugins={[autoplay.current]}
        setApi={setApi}
      >
        <CarouselContent className="-ml-0 h-full">
          {SLIDES.map((slide, index) => (
            <CarouselItem key={slide.src} className="h-full basis-full pl-0">
              <div className={cn("relative h-full w-full bg-[#2f2f2f]", heroSectionHeight)}>
                {index === 0 || shouldLoadSlideImage(index, active, SLIDES.length) ? (
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover",
                      slide.imageClass,
                    )}
                    fetchPriority={index === 0 ? "high" : undefined}
                    loading={index === active ? "eager" : "lazy"}
                    decoding={index === 0 ? "sync" : "async"}
                  />
                ) : null}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Mobile / tablet: strong bottom wash for copy legibility */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#2f2f2f]/95 via-[#2f2f2f]/72 to-[#2f2f2f]/25 md:hidden"
        aria-hidden
      />
      {/* md+: diagonal wash — copy left, photo right */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{ background: DESKTOP_OVERLAY }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-transparent via-transparent to-[#2f2f2f]/10 lg:block"
        aria-hidden
      />

      <div className="relative z-[2] flex min-h-0 flex-1 flex-col">
        <div
          className={cn(
            "flex flex-1 flex-col justify-end",
            "pb-4 pt-[max(1.25rem,env(safe-area-inset-top))]",
            "sm:justify-center sm:pb-6 sm:pt-10",
            "md:justify-center md:py-16 lg:py-20",
            pageShell,
          )}
        >
        <div
          className={cn(
            "w-full max-w-xl [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]",
            "md:max-w-[min(100%,36rem)] lg:max-w-xl",
          )}
        >
          <span className="type-eyebrow" style={{ color: "var(--brand-light-green)" }}>
            Spur Afrika · Merch
          </span>
          <h1
            className={cn(
              "mt-2 type-display text-balance sm:mt-3",
              "text-[clamp(1.75rem,6.5vw+0.5rem,3.75rem)] leading-[1.08]",
            )}
            style={{ color: "var(--white-text)" }}
          >
            Wear the mission. Fund the impact.
          </h1>
          <p
            className={cn(
              "mt-3 max-w-lg text-pretty type-body-lg sm:mt-5 md:mt-6",
              "text-[clamp(1rem,2.5vw+0.75rem,1.25rem)] leading-snug sm:leading-relaxed",
            )}
            style={{ color: "var(--white-text)", opacity: 0.9 }}
          >
            Every tee, hoodie and mug helps fund education, mentorship and community programs for
            children and families in Kenya.
          </p>
          <div className="mt-4 flex flex-row flex-wrap items-center gap-2 sm:mt-7 sm:gap-3 md:mt-8">
            <Link
              to="/shop"
              className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full bg-brand-dark px-3 py-2 text-xs font-semibold text-[var(--white-text)] transition hover:bg-brand min-[420px]:flex-none min-[420px]:px-4 sm:min-h-11 sm:px-6 sm:py-3 sm:text-sm"
            >
              Shop the collection
            </Link>
            <a
              href="https://spurafrika.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 px-3 py-2 text-center text-xs font-semibold leading-tight text-[var(--white-text)] backdrop-blur-sm transition hover:bg-[var(--white-text)]/20 min-[420px]:flex-none min-[420px]:px-4 sm:min-h-11 sm:px-6 sm:py-3 sm:text-sm"
            >
              Learn about Spur Afrika
            </a>
          </div>
        </div>
        </div>

        <div
          className={cn(
            "w-full shrink-0",
            "pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:pb-[max(1.25rem,env(safe-area-inset-bottom))]",
            pageShell,
          )}
        >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div
            className="flex min-w-0 flex-1 flex-wrap gap-1.5 sm:gap-2"
            role="tablist"
            aria-label="Hero slides"
          >
            {SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Go to slide ${index + 1}: ${slide.alt}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2.5 shrink-0 rounded-full transition-all sm:h-2",
                  active === index
                    ? "w-7 bg-[var(--brand-light-green)] sm:w-8"
                    : "w-2.5 bg-[var(--white-text)]/40 hover:bg-[var(--white-text)]/70 sm:w-2",
                )}
              />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => api?.scrollPrev()}
              className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 text-[var(--white-text)] transition hover:bg-[var(--white-text)]/20 sm:size-10"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => api?.scrollNext()}
              className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 text-[var(--white-text)] transition hover:bg-[var(--white-text)]/20 sm:size-10"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
