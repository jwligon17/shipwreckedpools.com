import Image from "next/image";

import { HomeReviewsCarouselSection } from "@/components/home-reviews-carousel-section";
import { site } from "@/content/site";
import aboutShipwreckedPoolsCollageV3 from "../../../public/images/about-shipwrecked-pools-collage.png";

export const metadata = {
  title: "About Shipwrecked Pools",
  description:
    "Learn about Jason Ligon and Shipwrecked Pools' asset-management approach to professional pool service in Abilene.",
};

export default function AboutPage() {
  const aboutContent = site.about;

  return (
    <div className="bg-[#ffffff]">
      <section className="relative overflow-hidden bg-hero-deep text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(3,11,29,0.96)_0%,rgba(7,20,52,0.86)_43%,rgba(10,30,75,0.9)_100%)]"
          aria-hidden="true"
        />
        <div className="hero-water-overlay" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-[length:160%_auto] bg-center opacity-[0.12] mix-blend-soft-light"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(169,221,245,0.26),transparent_42%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(169,221,245,0.17),transparent_38%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-16 h-72 w-72 rounded-full border border-light-blue/10 bg-light-blue/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(5,18,46,0.92)_100%)]"
          aria-hidden="true"
        />

        <div className="container-page relative z-10 flex min-h-[clamp(19.5rem,48vh,25rem)] items-center justify-center pb-6 pt-[calc(var(--header-stack-height)+1.2rem)] md:min-h-[clamp(21rem,45vh,23.5rem)] md:pb-8 md:pt-[calc(var(--header-stack-height)+1.45rem)]">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <h1 className="text-balance font-sans text-[clamp(2rem,5vw,4rem)] font-black leading-[0.92] tracking-[-0.026em] sm:leading-[0.9]">
              <span className="block text-white">Local Pool Care</span>
              <span className="mt-1.5 block text-light-blue">Built Around Trust.</span>
            </h1>
            <p className="mt-5 max-w-[43rem] text-[1.01rem] leading-relaxed text-white/90 md:text-lg">
              Owner-led pool service for Abilene homeowners who want clear communication, dependable standards, and
              long-term protection for their pool.
            </p>
          </div>
        </div>
        <div className="wave-divider-dark h-8 md:h-10" aria-hidden="true" />
      </section>

      <section className="relative overflow-hidden bg-[#ffffff] py-14 md:py-20">
        <div
          className="pointer-events-none absolute -left-24 top-16 hidden h-[14rem] w-[14rem] rounded-full bg-light-blue/40 blur-3xl md:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-[8%] top-20 z-20 hidden h-24 w-24 rounded-full border-[4px] border-pink/55 md:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-8 left-[12%] hidden h-14 w-14 rounded-full border-[3px] border-pink/35 lg:block"
          aria-hidden="true"
        />
        <div className="container-page relative z-10">
          <section className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] md:gap-12 lg:gap-16">
            <article className="relative max-w-[36rem]">
              <h2 className="text-balance font-sans text-[clamp(2.6rem,6vw,4.45rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-navy">
                {aboutContent.aboutUs.heading}
              </h2>
              <div className="mt-6 max-w-[34rem] space-y-4 text-base leading-relaxed text-ink-muted md:text-[1.08rem]">
                {aboutContent.aboutUs.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-7 inline-flex rounded-full bg-[linear-gradient(135deg,rgba(169,221,245,0.34),rgba(230,180,199,0.2))] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy/80">
                {aboutContent.aboutUs.supportingLine}
              </p>
            </article>

            <article className="relative min-h-[21rem] overflow-hidden rounded-[1.25rem] md:min-h-[27rem] lg:min-h-[30rem]">
              <Image
                src={aboutShipwreckedPoolsCollageV3}
                alt={aboutContent.aboutUs.imageAlt}
                fill
                className="object-contain object-center"
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 46vw, 100vw"
              />
            </article>
          </section>

          <section className="mx-auto mt-12 max-w-4xl text-center md:mt-16">
            <div
              className="pointer-events-none mx-auto h-[2px] w-28 rounded-full bg-[linear-gradient(90deg,rgba(169,221,245,0.35)_0%,rgba(11,30,75,0.65)_50%,rgba(230,180,199,0.45)_100%)]"
              aria-hidden="true"
            />
            <h2 className="mt-6 text-balance font-sans text-[2.25rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-navy md:text-[3.45rem]">
              {aboutContent.mission.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              {aboutContent.mission.statement}
            </p>
            {aboutContent.mission.supportingLine ? (
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
                {aboutContent.mission.supportingLine}
              </p>
            ) : null}
          </section>

          <section className="mt-12 bg-white md:mt-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance font-sans text-[2.25rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-navy md:text-[3.45rem]">
                {aboutContent.coreValues.heading}
              </h2>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-7 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
              {aboutContent.coreValues.values.map((value) => (
                <article key={value.title} className="relative border-b border-line/70 pb-5 pl-6">
                  <span
                    className="absolute left-0 top-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-light-blue/70"
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-pink/90" />
                  </span>
                  <h3 className="text-[1.26rem] font-semibold leading-tight text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-[0.95rem]">{value.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <HomeReviewsCarouselSection />
    </div>
  );
}
