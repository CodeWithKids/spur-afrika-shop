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
    objectPosition: "50% 17%",
  },
  {
    src: spurHiveTeam,
    alt: "Spur Afrika team members in branded jackets",
    objectPosition: "58% 25%",
  },
  {
    src: artWorkshop,
    alt: "Children at a creative art workshop with easels and paint supplies",
    objectPosition: "60% 29%",
  },
] as const;

const DESKTOP_OVERLAY_DEFAULT =
  "linear-gradient(105deg, rgba(47, 47, 47, 0.9) 0%, rgba(47, 47, 47, 0.52) 34%, rgba(47, 47, 47, 0.12) 100%)";

const AUTOPLAY_MS = 6000;

/** Shared min-height across section, slide frames, and content stack. */
const heroMinHeight = cn(
  "min-h-[min(100svh,680px)] min-h-[min(100dvh,680px)]",
  "sm:min-h-[min(92svh,760px)] sm:min-h-[min(92dvh,760px)]",
  "md:min-h-[min(88vh,820px)]",
  "lg:min-h-[min(88vh,880px)]",
  "xl:min-h-[min(85vh,920px)]",
  "max-h-[32rem]:min-h-[26rem] max-h-[32rem]:sm:min-h-[28rem]",
);

const heroContentPadding = cn(
  "flex flex-col justify-end",
  "pt-8 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]",
  "sm:justify-center sm:pt-12 sm:pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))]",
  "md:justify-center md:py-20",
  "lg:py-24",
  "max-h-[32rem]:justify-center max-h-[32rem]:py-6 max-h-[32rem]:sm:py-8",
);

const heroControlsPadding =
  "pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(1.75rem+env(safe-area-inset-bottom,0px))]";

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

  return (
    <section className={cn("relative isolate overflow-hidden", heroMinHeight)}>
      <Carousel
        className="absolute inset-0 h-full w-full"
        opts={{ loop: true, duration: 35 }}
        plugins={[autoplay.current]}
        setApi={setApi}
      >
        <CarouselContent className="-ml-0 h-full">
          {SLIDES.map((slide, index) => (
            <CarouselItem key={slide.src} className="h-full basis-full pl-0">
              <div className={cn("relative h-full w-full", heroMinHeight)}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: slide.objectPosition }}
                  fetchPriority={index === 0 ? "high" : undefined}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Diagonal wash at all breakpoints — copy left, photo on the right */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-[background] duration-700"
        style={{ background: DESKTOP_OVERLAY_DEFAULT }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-transparent via-transparent to-[#2f2f2f]/10 lg:block"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-[2] w-full",
          heroMinHeight,
          heroContentPadding,
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
            className="mt-3 type-display sm:mt-4 max-[380px]:text-[1.85rem] max-[380px]:leading-[1.12]"
            style={{ color: "var(--white-text)" }}
          >
            Wear the mission.{" "}
            <span style={{ color: "var(--brand-light-green)" }}>Fund the impact.</span>
          </h1>
          <p
            className="mt-3 max-w-lg type-body-lg sm:mt-5 md:mt-6 max-[380px]:text-base"
            style={{ color: "var(--white-text)", opacity: 0.9 }}
          >
            Every tee, hoodie and mug helps fund education, mentorship and community programs for
            children and families in Kenya.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap md:mt-8">
            <Link
              to="/shop"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand sm:w-auto"
            >
              Shop the collection
            </Link>
            <a
              href="https://spurafrika.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 px-6 py-3 text-center text-sm font-semibold text-[var(--white-text)] backdrop-blur-sm transition hover:bg-[var(--white-text)]/20 sm:w-auto"
            >
              Learn about Spur Afrika
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-[2]",
          heroControlsPadding,
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
                  "h-2 shrink-0 rounded-full transition-all",
                  active === index
                    ? "w-7 bg-[var(--brand-light-green)] sm:w-8"
                    : "w-2 bg-[var(--white-text)]/40 hover:bg-[var(--white-text)]/70",
                )}
              />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => api?.scrollPrev()}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 text-[var(--white-text)] transition hover:bg-[var(--white-text)]/20 sm:size-9"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => api?.scrollNext()}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 text-[var(--white-text)] transition hover:bg-[var(--white-text)]/20 sm:size-9"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
