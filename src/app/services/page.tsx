import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";

import { HomeFinalCtaSection } from "@/components/home-final-cta-section";
import { HomePoolCareServicesSection } from "@/components/home-pool-care-services-section";
import { HomeReviewsCarouselSection } from "@/components/home-reviews-carousel-section";
import { InternalHero } from "@/components/internal-hero";
import { site } from "@/content/site";

export const metadata = {
  title: "Pool Services in Abilene, TX",
  description:
    "Explore Shipwrecked Pools services in Abilene, including recurring maintenance, algae recovery, equipment support, and practical next steps for clear water.",
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
  const heroVideo = getExistingPublicImage("/videos/services-hero.mp4");
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
        backgroundVideoSrc={heroVideo ?? undefined}
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
