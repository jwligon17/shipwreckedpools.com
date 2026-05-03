import Link from "next/link";

import { site } from "@/content/site";

export function Hero() {
  const { hero } = site.home;
  const { googleReviews } = site;
  const heroVideoSrc = "/videos/homescreenvideo.mp4";
  const heroPosterSrc = "/images/proof-pool-comparison-2.png";
  const ratingText = typeof googleReviews.rating === "number" ? googleReviews.rating.toFixed(1) : null;
  const reviewCountDisplayText = typeof googleReviews.reviewCount === "number" ? "45+" : null;
  const hasReviewMetrics = googleReviews.rating !== null && googleReviews.reviewCount !== null;

  return (
    <section
      data-home-hero
      className="relative min-h-[calc(100svh-var(--utility-bar-height))] overflow-hidden bg-hero-deep text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroPosterSrc})` }}
        aria-hidden="true"
      />
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={heroPosterSrc}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={heroVideoSrc} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,#020b21_0%,#08163a_42%,#0b1e4b_100%)] opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(4,14,38,0.84)_0%,rgba(7,22,56,0.58)_45%,rgba(6,20,51,0.8)_100%)]" aria-hidden="true" />
      <div className="hero-water-overlay" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(169,221,245,0.28),transparent_30%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_16%,rgba(169,221,245,0.18),transparent_34%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent_0%,rgba(4,13,34,0.92)_100%)]" aria-hidden="true" />

      <div className="container-page relative z-10 pb-14 pt-[calc(var(--header-stack-height)+1.25rem)] md:pb-16 md:pt-[calc(var(--header-stack-height)+1.5rem)] lg:pb-20 lg:pt-[calc(var(--header-stack-height)+1.75rem)]">
        <div className="max-w-5xl translate-y-4 md:translate-y-6 lg:max-w-[66rem] lg:translate-y-7 xl:translate-y-8">
          <a
            href={googleReviews.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read Shipwrecked Pools Google reviews"
            className="focus-ring group mb-2 inline-flex w-fit max-w-full flex-wrap items-center gap-x-2 gap-y-1 py-1 text-[0.78rem] font-semibold tracking-[0.01em] text-white/96 decoration-light-blue/85 decoration-1 underline-offset-4 transition duration-200 hover:decoration-pink/85 active:scale-[0.99] active:decoration-pink focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-[#061433] md:flex-nowrap md:gap-x-2.5 md:text-[0.86rem]"
          >
            <span className="inline-flex text-[1.45rem] font-black leading-none text-white drop-shadow-[0_1px_6px_rgba(4,14,38,0.7)] md:text-[1.6rem]">
              G
            </span>
            <span className="whitespace-nowrap text-white transition-colors duration-200 group-hover:text-pink group-active:text-pink">Google</span>
            {hasReviewMetrics ? (
              <>
                <span className="inline-flex items-center gap-[0.13rem] text-[0.86rem] leading-none text-[#f7d66b] drop-shadow-[0_1px_3px_rgba(4,14,38,0.65)] md:text-[0.94rem]" aria-hidden="true">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </span>
                <span className="whitespace-nowrap text-white transition-colors duration-200 group-hover:font-bold group-hover:text-pink group-active:font-bold group-active:text-pink">
                  {ratingText}
                </span>
                <span className="text-light-blue/85" aria-hidden="true">
                  ·
                </span>
                <span className="whitespace-nowrap text-white transition-colors duration-200 group-hover:font-bold group-hover:text-pink group-active:font-bold group-active:text-pink">
                  {reviewCountDisplayText} {googleReviews.label}
                </span>
              </>
            ) : (
              <span className="whitespace-nowrap text-white transition-colors duration-200 group-hover:font-bold group-hover:text-pink group-active:font-bold group-active:text-pink">
                {googleReviews.label}
              </span>
            )}
            <span className="inline-flex items-center text-[0.95rem] font-bold text-light-blue transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-pink md:text-[1rem]" aria-hidden="true">
              →
            </span>
          </a>
          <h1 className="mt-2.5 max-w-[23ch] font-sans text-[clamp(2rem,5.2vw,4.25rem)] font-black uppercase leading-[0.9] tracking-[-0.028em] sm:leading-[0.88] lg:max-w-[20ch] lg:leading-[0.84] lg:tracking-[-0.032em]">
            <span className="text-white lg:block lg:whitespace-nowrap">Pool Cleaning &amp; </span>
            <span className="text-white lg:mt-[0.14em] lg:block lg:whitespace-nowrap">Weekly Pool Service </span>
            <span className="text-light-blue lg:mt-[0.14em] lg:block lg:whitespace-nowrap">in Abilene, TX</span>
          </h1>
          <p className="mt-2.5 max-w-2xl text-[0.9rem] leading-relaxed text-white/[0.9] md:mt-3 md:text-[1rem]">{hero.description}</p>

          <div className="mt-3 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:mt-3.5 md:gap-3.5">
            <Link
              href={hero.primaryCta.href}
              className="focus-ring inline-flex min-h-14 min-w-[12rem] w-full items-center justify-center rounded-full border border-white bg-white px-8 py-3.5 text-[1.02rem] font-black uppercase tracking-[0.04em] text-navy shadow-[0_16px_34px_rgba(6,20,51,0.42)] transition hover:-translate-y-0.5 hover:bg-light-blue-soft [--tw-ring-offset-color:var(--color-navy-deep)] sm:w-auto md:min-h-[3.85rem] md:min-w-[13.25rem] md:px-10 md:text-[1.1rem]"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="focus-ring inline-flex min-h-14 min-w-[12rem] w-full items-center justify-center rounded-full border border-white/65 bg-white/[0.08] px-8 py-3.5 text-[1.02rem] font-extrabold tracking-[0.04em] text-white transition hover:-translate-y-0.5 hover:border-white/90 hover:bg-white/[0.18] [--tw-ring-offset-color:var(--color-navy-deep)] sm:w-auto md:min-h-[3.85rem] md:min-w-[13.25rem] md:px-10 md:text-[1.1rem]"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

        </div>
      </div>
      <div className="wave-divider-dark h-8 md:h-10" aria-hidden="true" />
    </section>
  );
}
