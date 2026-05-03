import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeroAction = {
  label: string;
  href: string;
  newTab?: boolean;
};

type InternalHeroProps = {
  eyebrow?: string;
  title: string;
  accentTitle?: string;
  description: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  backgroundVideoSrc?: string;
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
  showDecorativeCircle?: boolean;
};

function HeroLink({ action, variant }: { action: HeroAction; variant: "primary" | "secondary" }) {
  return (
    <Link
      href={action.href}
      target={action.newTab ? "_blank" : undefined}
      rel={action.newTab ? "noreferrer" : undefined}
      className={cn(variant === "primary" ? "btn-hero-primary" : "btn-hero-secondary", "focus-ring")}
    >
      {action.label}
    </Link>
  );
}

export function InternalHero({
  eyebrow,
  title,
  accentTitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundVideoSrc,
  children,
  className,
  containerClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  showDecorativeCircle = true,
}: InternalHeroProps) {
  const hasEyebrow = Boolean(eyebrow?.trim());

  return (
    <section className={cn("relative overflow-hidden bg-hero-deep text-white", className)}>
      {backgroundVideoSrc ? (
        <>
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={backgroundVideoSrc} type="video/mp4" />
          </video>
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(3,11,29,0.78)_0%,rgba(7,20,52,0.65)_43%,rgba(10,30,75,0.75)_100%)]"
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(3,11,29,0.96)_0%,rgba(7,20,52,0.86)_43%,rgba(10,30,75,0.9)_100%)]"
            aria-hidden="true"
          />
          <div className="hero-water-overlay" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-[length:160%_auto] bg-center opacity-[0.12] mix-blend-soft-light"
            aria-hidden="true"
          />
        </>
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(169,221,245,0.26),transparent_42%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(169,221,245,0.17),transparent_38%)]"
        aria-hidden="true"
      />
      {showDecorativeCircle ? (
        <div
          className="pointer-events-none absolute right-16 top-24 hidden h-16 w-16 rounded-full border-[4px] border-pink/55 md:block"
          aria-hidden="true"
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent_0%,rgba(5,18,46,0.92)_100%)]"
        aria-hidden="true"
      />

      <div
        className={cn(
          "container-page relative z-10 flex min-h-[clamp(18rem,42vh,23rem)] items-center pb-8 pt-[calc(var(--header-stack-height)+1.3rem)] md:min-h-[clamp(19rem,42vh,24rem)] md:pb-10 md:pt-[calc(var(--header-stack-height)+1.45rem)]",
          containerClassName,
        )}
      >
        <div className={cn("max-w-4xl", contentClassName)}>
          {hasEyebrow ? (
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.08] px-4 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/95">
              <span className="h-2 w-2 rounded-full bg-pink" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "text-balance font-sans text-[clamp(2.15rem,5.2vw,4.35rem)] font-black leading-[0.9] tracking-[-0.03em]",
              hasEyebrow ? "mt-4" : "mt-0",
              titleClassName,
            )}
          >
            <span className="block text-white">{title}</span>
            {accentTitle ? <span className="mt-1.5 block text-light-blue">{accentTitle}</span> : null}
          </h1>
          <p
            className={cn(
              "mt-5 max-w-[46rem] text-[1rem] leading-relaxed text-white/90 md:text-[1.08rem]",
              descriptionClassName,
            )}
          >
            {description}
          </p>
          {primaryAction ? (
            <div className={cn("mt-7 flex flex-wrap gap-3.5", actionsClassName)}>
              <HeroLink action={primaryAction} variant="primary" />
              {secondaryAction ? <HeroLink action={secondaryAction} variant="secondary" /> : null}
            </div>
          ) : null}
          {children ? <div className="mt-5">{children}</div> : null}
        </div>
      </div>
      <div className="wave-divider-dark h-8 md:h-10" aria-hidden="true" />
    </section>
  );
}
