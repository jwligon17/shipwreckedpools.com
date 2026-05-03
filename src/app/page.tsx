import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { HomeFinalCtaSection } from "@/components/home-final-cta-section";
import { Hero } from "@/components/hero";
import { HomePoolAreaHighlightsSection } from "@/components/home-pool-area-highlights-section";
import { HomePoolCareServicesSection } from "@/components/home-pool-care-services-section";
import { HomeReviewsCarouselSection } from "@/components/home-reviews-carousel-section";
import { site } from "@/content/site";

export const metadata = {
  title: "Pool Service in Abilene, TX",
  description:
    "Shipwrecked Pools provides professional pool cleaning and asset-management focused pool care for homeowners in Abilene and surrounding towns.",
};

function getExistingPublicImage(imagePath?: string) {
  if (!imagePath || !imagePath.startsWith("/")) {
    return null;
  }

  // Final difference-card photos should be dropped into /public using the paths from src/content/site.ts.
  const absolutePath = path.join(process.cwd(), "public", imagePath.slice(1));
  return existsSync(absolutePath) ? imagePath : null;
}

export default function HomePage() {
  const differenceCards = site.home.difference.cards.map((card) => ({
    ...card,
    existingImage: getExistingPublicImage(card.imagePath),
  }));
  const differenceBlueCircleImage = getExistingPublicImage("/images/decorative-blue-circle.png");

  return (
    <>
      <Hero />

      <section className="relative overflow-hidden bg-white pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1100px_auto] bg-center opacity-[0.03]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden="true">
          {differenceBlueCircleImage ? (
            <>
              <Image
                src={differenceBlueCircleImage}
                alt=""
                width={680}
                height={680}
                className="pointer-events-none absolute -left-[14rem] top-[50%] w-[24rem] opacity-95 lg:-left-[16rem] lg:top-[48%] lg:w-[26rem]"
                sizes="(min-width: 1024px) 26rem, 24rem"
                aria-hidden="true"
              />
              <Image
                src={differenceBlueCircleImage}
                alt=""
                width={650}
                height={650}
                className="pointer-events-none absolute -right-[14rem] top-[39%] w-[24rem] opacity-95 lg:-right-[16rem] lg:top-[37%] lg:w-[26rem]"
                sizes="(min-width: 1024px) 26rem, 24rem"
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              {/* TODO: Add /public/images/decorative-blue-circle.png to replace this CSS fallback circle. */}
              <div className="pointer-events-none absolute -left-[14rem] top-[50%] h-[24rem] w-[24rem] rounded-full bg-light-blue opacity-95 lg:-left-[16rem] lg:top-[48%] lg:h-[26rem] lg:w-[26rem]" aria-hidden="true" />
              <div className="pointer-events-none absolute -right-[14rem] top-[39%] h-[24rem] w-[24rem] rounded-full bg-light-blue opacity-95 lg:-right-[16rem] lg:top-[37%] lg:h-[26rem] lg:w-[26rem]" aria-hidden="true" />
            </>
          )}
          <div
            className="pointer-events-none absolute right-12 top-32 h-20 w-20 rounded-full border-[4px] border-pink/85 opacity-90 lg:right-24 lg:top-36 lg:h-24 lg:w-24"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-9 bottom-10 h-[4.75rem] w-[4.75rem] rounded-full border-[4px] border-pink/75 opacity-80 lg:-left-12 lg:bottom-8 lg:h-[6rem] lg:w-[6rem]"
            aria-hidden="true"
          />
        </div>
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-balance font-sans text-[2.7rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[4rem] lg:text-[5rem]">
              {site.home.difference.title}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              {site.home.difference.eyebrow}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {differenceCards.map((card) => (
              <article
                key={card.title}
                className="group overflow-hidden rounded-[2rem] border border-line/75 bg-white shadow-[0_14px_34px_rgba(11,30,75,0.09)] transition duration-300 hover:-translate-y-1.5 hover:border-navy/35 hover:shadow-[0_24px_52px_rgba(11,30,75,0.18)]"
              >
                <div className="relative aspect-[4/3] min-h-[240px] overflow-hidden border-b border-line/65 bg-[linear-gradient(165deg,#ffffff_0%,#edf7fe_46%,#d8edf9_100%)] md:min-h-[255px]">
                  {card.existingImage ? (
                    <Image
                      src={card.existingImage}
                      alt={card.imageAlt ?? card.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.05]"
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(255,255,255,0.78),transparent_36%)]" aria-hidden="true" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_84%,rgba(11,30,75,0.2),transparent_48%)]" aria-hidden="true" />
                      <div className="absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-cover bg-center opacity-[0.12]" aria-hidden="true" />
                      <div className="absolute inset-x-6 top-6">
                        <span className="inline-flex rounded-full border border-navy/15 bg-white/78 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-navy backdrop-blur-sm">
                          Photo Placeholder
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-6 h-10 w-10 rounded-full border border-white/75 bg-white/80 shadow-sm backdrop-blur-sm" aria-hidden="true" />
                      <div className="absolute bottom-7 right-6 h-2 w-14 rounded-full bg-navy/20" aria-hidden="true" />
                    </>
                  )}
                </div>

                <div className="space-y-3 p-6 md:p-7">
                  <h3 className="text-[1.45rem] font-semibold leading-tight text-navy">{card.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-ink-muted">{card.summary}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-14">
            <Link href={site.home.difference.ctas.primary.href} className="btn-primary focus-ring w-full gap-2 sm:w-auto">
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s6-5.62 6-10.25A6 6 0 0 0 6 10.75C6 15.38 12 21 12 21Z" />
                <path d="M12 13.25a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              </svg>
              {site.home.difference.ctas.primary.label}
            </Link>
            <Link href={site.home.difference.ctas.secondary.href} className="btn-secondary focus-ring w-full gap-2 sm:w-auto">
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.5 6.75h13a2.75 2.75 0 0 1 2.75 2.75v6a2.75 2.75 0 0 1-2.75 2.75H11l-4.5 3v-3H5.5A2.75 2.75 0 0 1 2.75 15.5v-6A2.75 2.75 0 0 1 5.5 6.75Z" />
                <path d="M7.75 11.75h8.5" />
              </svg>
              {site.home.difference.ctas.secondary.label}
            </Link>
          </div>
        </div>
      </section>

      <HomePoolAreaHighlightsSection />

      <HomeReviewsCarouselSection />

      <HomePoolCareServicesSection />

      <HomeFinalCtaSection />
    </>
  );
}
