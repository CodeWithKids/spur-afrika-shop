import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import heroTeam from "@/assets/hero-team.jpg";
import hiveDynamicDuo from "@/assets/products/dynamic-duo-set.jpg";
import jacketLifestyle from "@/assets/jackets/black-couple-lifestyle.jpg";
import spurHoodieMustard from "@/assets/spur-hoodie-mustard-front.jpg";
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
    objectPosition: "center 30%",
  },
  {
    src: spurHoodieMustard,
    alt: "Spur Afrika mustard hoodie with branded stripe detail",
    objectPosition: "center 40%",
  },
  {
    src: jacketLifestyle,
    alt: "Couple wearing Spur Afrika jackets outdoors",
    objectPosition: "center 35%",
  },
  {
    src: hiveDynamicDuo,
    alt: "Spur Hive reusable bottle and insulated hex flask",
    objectPosition: "center 45%",
  },
] as const;

const AUTOPLAY_MS = 6000;

const heroMinHeight =
  "min-h-[min(92svh,880px)] md:min-h-[min(88vh,920px)]";

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
    <section className={cn("relative overflow-hidden", heroMinHeight)}>
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

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#0D1D23]/92 via-[#0D1D23]/82 to-[#0D1D23]/45 md:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(105deg, rgba(13, 29, 35, 0.88) 0%, rgba(13, 29, 35, 0.72) 42%, rgba(13, 29, 35, 0.2) 100%)",
        }}
        aria-hidden
      />

      <div
        className={cn(
          "relative z-[2] flex flex-col justify-end py-12 sm:justify-center sm:py-16 md:py-24",
          heroMinHeight,
          pageShell,
        )}
      >
        <div className="max-w-xl">
          <span className="type-eyebrow" style={{ color: "var(--brand-light-green)" }}>
            Spur Afrika · Merch
          </span>
          <h1 className="mt-4 type-display" style={{ color: "var(--white-text)" }}>
            Wear the mission.{" "}
            <span style={{ color: "var(--brand-light-green)" }}>Fund the impact.</span>
          </h1>
          <p
            className="mt-4 max-w-lg type-body-lg sm:mt-6"
            style={{ color: "var(--white-text)", opacity: 0.9 }}
          >
            Every tee, hoodie and mug helps fund education, mentorship and community programs for
            children and families in Kenya.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-[var(--white-text)] transition hover:bg-brand"
            >
              Shop the collection
            </Link>
            <a
              href="https://spurafrika.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 px-6 py-3 text-center text-sm font-semibold text-[var(--white-text)] backdrop-blur-sm transition hover:bg-[var(--white-text)]/20"
            >
              Learn about Spur Afrika
            </a>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 sm:mt-12">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Hero slides">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`Go to slide ${index + 1}: ${slide.alt}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  active === index
                    ? "w-8 bg-[var(--brand-light-green)]"
                    : "w-2 bg-[var(--white-text)]/40 hover:bg-[var(--white-text)]/70",
                )}
              />
            ))}
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => api?.scrollPrev()}
              className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 text-[var(--white-text)] transition hover:bg-[var(--white-text)]/20"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => api?.scrollNext()}
              className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 text-[var(--white-text)] transition hover:bg-[var(--white-text)]/20"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
