import { useEffect, useRef, useState } from "react";
import { pageShell, sectionPadding } from "@/lib/layout";

const IMPACT_STATS = [
  {
    value: 100,
    suffix: "%",
    text: "of profit reinvested in our Elimisha sponsorship kitty, keeping more children in school",
  },
  {
    value: 16,
    suffix: "",
    text: "years transforming lives through education, mentorship and opportunity",
  },
  {
    value: 227,
    suffix: "",
    text: "children supported through the Elimisha sponsorship program",
  },
  {
    value: 172,
    suffix: "",
    text: "children currently active in the Elimisha program",
  },
] as const;

const DURATION_MS = 1600;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function AnimatedStat({
  value,
  suffix,
  text,
  active,
}: {
  value: number;
  suffix: string;
  text: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    let start: number | null = null;
    let frame = 0;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / DURATION_MS, 1);
      setDisplay(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <div>
      <div className="type-h-large tabular-nums" style={{ color: "var(--brand-light-green)" }}>
        {display}
        {suffix}
      </div>
      <p className="mt-2 type-body" style={{ opacity: 0.85 }}>
        {text}
      </p>
    </div>
  );
}

export function ImpactStatsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--dark-spruce)", color: "var(--white-text)" }}
    >
      <div className={`grid gap-7 sm:grid-cols-2 lg:grid-cols-4 ${sectionPadding} ${pageShell}`}>
        {IMPACT_STATS.map((stat) => (
          <AnimatedStat key={stat.text} active={active} {...stat} />
        ))}
      </div>
    </section>
  );
}
