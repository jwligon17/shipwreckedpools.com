import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { HomeFinalCtaSection } from "@/components/home-final-cta-section";
import { HomePoolCareServicesSection } from "@/components/home-pool-care-services-section";
import { HomeReviewsCarouselSection } from "@/components/home-reviews-carousel-section";
import { InternalHero } from "@/components/internal-hero";
import { site } from "@/content/site";

export const metadata = {
  title: "Pool Services in Abilene, TX",
  alternates: { canonical: "/services" },
  description:
    "Weekly service, algae cleanup, filter cleaning, drain and refill, acid wash, pump repair, and more for Abilene pool owners.",
};

function getExistingPublicImage(imagePath?: string) {
  if (!imagePath || !imagePath.startsWith("/")) {
    return null;
  }

  const absolutePath = path.join(process.cwd(), "public", imagePath.slice(1));
  return existsSync(absolutePath) ? imagePath : null;
}

export default function ServicesPage() {
  const servicesPage = site.servicesPage;
  const proofComparisonImage = getExistingPublicImage("/images/proof-pool-comparison-2.png");

  return (
    <>
      <InternalHero
        eyebrow=""
        title={servicesPage.hero.titleLines[0]}
        accentTitle={servicesPage.hero.titleLines[1]}
        description={servicesPage.hero.description}
        primaryAction={{ label: servicesPage.hero.primaryCta.label, href: servicesPage.hero.primaryCta.href }}
        secondaryAction={{ label: servicesPage.hero.secondaryCta.label, href: servicesPage.hero.secondaryCta.href }}
        containerClassName="min-h-[clamp(19.5rem,48vh,25rem)] justify-center pb-6 pt-[calc(var(--header-stack-height)+1.05rem)] md:min-h-[clamp(21rem,45vh,23.5rem)] md:pb-8 md:pt-[calc(var(--header-stack-height)+1.3rem)]"
        contentClassName="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        titleClassName="text-[clamp(2rem,5vw,4rem)] leading-[0.92] sm:leading-[0.9]"
        descriptionClassName="mt-5 max-w-[43rem] text-[1.01rem] leading-relaxed md:text-lg"
        actionsClassName="hidden"
        showDecorativeCircle={false}
      />

      <HomePoolCareServicesSection
        title={servicesPage.servicesGrid.title}
        supportingLine={servicesPage.servicesGrid.supportingLine}
        detailLinksOnly
      />

      <section className="border-b border-line/60 bg-white pb-12 md:pb-16">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-[1.4rem] border border-line/75 bg-light-blue-soft/35 p-6 shadow-[0_14px_30px_rgba(11,30,75,0.08)] md:p-8">
            <div className="max-w-3xl">
              <p className="section-label">Not sure what your pool needs?</p>
              <h2 className="mt-2 text-balance text-2xl font-extrabold leading-tight text-navy md:text-3xl">
                Start with a free Ship-Shape Pool Review
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                Get an onsite review of your pool, water, and visible equipment condition, followed by a clear summary and prioritized observations.
              </p>
            </div>
            <Link
              href="/services/ship-shape-pool-review"
              data-analytics-service-cta="ship-shape-pool-review"
              data-analytics-placement="services_hub_feature"
              className="btn-primary focus-ring shrink-0"
            >
              View the Free Review
            </Link>
          </div>
          <div className="flex flex-col gap-5 rounded-[1.4rem] border border-line/75 bg-light-blue-soft/35 p-6 shadow-[0_14px_30px_rgba(11,30,75,0.08)] md:p-8">
            <div className="max-w-3xl">
              <p className="section-label">Need pool chemicals?</p>
              <h2 className="mt-2 text-balance text-2xl font-extrabold leading-tight text-navy md:text-3xl">Get pool chemicals delivered free</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">Request chlorine, shock, acid, bicarb, or salt. You pay for the products; delivery is free within our normal service area.</p>
            </div>
            <Link href="/services/free-pool-chemical-delivery" data-analytics-service-cta="free-pool-chemical-delivery" data-analytics-placement="services_hub_feature" className="btn-primary focus-ring mt-auto self-start">
              Request Chemical Delivery
            </Link>
          </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(169,221,245,0.16),transparent_34%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_84%,rgba(230,180,199,0.14),transparent_28%)]"
          aria-hidden="true"
        />
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-balance font-sans text-[2.1rem] font-extrabold leading-[0.9] tracking-[-0.032em] text-navy md:text-[3.15rem]">
              {servicesPage.proof.title}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              {servicesPage.proof.supportingLine}
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-5xl md:mt-10">
            <div className="mx-auto w-full max-w-[900px]">
              <div className="relative min-h-[14rem] overflow-hidden rounded-2xl md:min-h-[22rem]">
                {proofComparisonImage ? (
                  <Image
                    src={proofComparisonImage}
                    alt="Before and after pool care comparison for Shipwrecked Pools"
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1200px) 1100px, (min-width: 768px) 92vw, 96vw"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,#f7fbff_0%,#e8f3fa_100%)]" aria-hidden="true" />
                    <div className="absolute inset-0 grid place-items-center px-6 text-center">
                      <span className="inline-flex rounded-full border border-white/80 bg-white/85 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-navy">
                        Proof image coming soon
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeReviewsCarouselSection />

      <HomeFinalCtaSection
        title={servicesPage.finalCta.title}
        summary={servicesPage.finalCta.summary}
        primaryCta={servicesPage.finalCta.primaryCta}
        secondaryCta={servicesPage.finalCta.secondaryCta}
      />
    </>
  );
}
