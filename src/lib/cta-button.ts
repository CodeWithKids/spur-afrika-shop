import { cn } from "@/lib/utils";

/** Touch-friendly primary pill — scales up from sm breakpoint. */
export const ctaPrimaryClassName = (className?: string) =>
  cn(
    "inline-flex max-w-full items-center justify-center rounded-full bg-brand-dark px-4 py-2 text-xs font-semibold text-[var(--white-text)] transition hover:bg-brand",
    "min-h-9 sm:min-h-11 sm:px-6 sm:py-3 sm:text-sm",
    className,
  );

/** Full-width on narrow viewports, auto width from sm. */
export const ctaPrimaryBlockClassName = (className?: string) =>
  ctaPrimaryClassName(cn("w-full sm:w-auto", className));

/** Secondary / outline pill on light backgrounds. */
export const ctaOutlineClassName = (className?: string) =>
  cn(
    "inline-flex max-w-full items-center justify-center rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-muted",
    "min-h-9 sm:min-h-11 sm:px-6 sm:py-3 sm:text-sm",
    className,
  );

/** Ghost pill on dark hero / image overlays. */
export const ctaHeroGhostClassName = (className?: string) =>
  cn(
    "inline-flex max-w-full items-center justify-center rounded-full border border-[var(--white-text)]/30 bg-[var(--white-text)]/10 px-3 py-2 text-xs font-semibold leading-tight text-[var(--white-text)] backdrop-blur-sm transition hover:bg-[var(--white-text)]/20",
    "min-h-9 min-[420px]:px-4 sm:min-h-11 sm:px-6 sm:py-3 sm:text-sm",
    className,
  );

/** Row of hero CTAs — side by side with wrap. */
export const ctaHeroRowClassName = "flex flex-row flex-wrap items-center gap-2 sm:gap-3";
