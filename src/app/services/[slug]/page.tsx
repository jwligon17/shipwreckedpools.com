import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HomeReviewsCarouselSection } from "@/components/home-reviews-carousel-section";
import { InternalHero } from "@/components/internal-hero";
import { site } from "@/content/site";
import { getServiceBySlug, siteUrl } from "@/lib/site";

type ServiceRouteParams = {
  slug: string;
};

export function generateStaticParams() {
  return site.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<ServiceRouteParams> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested pool service page was not found.",
    };
  }

  return {
    title: service.seoTitle ?? `${service.name} in Abilene, TX`,
    description: service.seoDescription ?? `${service.summary} ${service.supportingParagraph}`,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

function getExistingPublicImage(imagePath?: string) {
  if (!imagePath || !imagePath.startsWith("/")) {
    return null;
  }

  const absolutePath = path.join(process.cwd(), "public", imagePath.slice(1));
  return existsSync(absolutePath) ? imagePath : null;
}

const DEFAULT_PROOF_IMAGES = {
  before: "/images/proof-pool-before-1.jpg",
  after: "/images/proof-pool-after-1.jpg",
} as const;

function resolveProofImage({
  explicitPath,
  slug,
  variant,
}: {
  explicitPath?: string;
  slug: string;
  variant: "before" | "after";
}) {
  const explicitImage = getExistingPublicImage(explicitPath);
  if (explicitImage) {
    return explicitImage;
  }

  const serviceSpecificImage = getExistingPublicImage(`/images/services/${slug}-${variant}.jpg`);
  if (serviceSpecificImage) {
    return serviceSpecificImage;
  }

  return getExistingPublicImage(DEFAULT_PROOF_IMAGES[variant]);
}

function resolveSingleProofImage(explicitPath?: string) {
  return getExistingPublicImage(explicitPath);
}

export default async function ServiceDetailPage({ params }: { params: Promise<ServiceRouteParams> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const proofBeforeImage = resolveProofImage({
    explicitPath: service.proof?.beforeImagePath,
    slug: service.slug,
    variant: "before",
  });
  const proofAfterImage = resolveProofImage({
    explicitPath: service.proof?.afterImagePath,
    slug: service.slug,
    variant: "after",
  });
  const proofSingleImage = resolveSingleProofImage(service.proof?.singleImagePath);
  const isWeeklyServicesPage = slug === "weekly-services";
  const isBiWeeklyServicesPage = slug === "bi-weekly-services";
  const isAlgaeRemovalPage = slug === "algae-removal";
  const isFilterCleaningPage = slug === "filter-cleaning";
  const isAcidWashPage = slug === "acid-wash";
  const isDrainAndRefillPage = slug === "drain-and-refill";
  const isOneTimeCleansPage = slug === "one-time-cleans";
  const isSandReplacementPage = slug === "sand-replacement";
  const isPumpRepairAndInstallationPage = slug === "pump-repair-and-installation";
  const useUpdatedServiceLayout =
    isWeeklyServicesPage ||
    isBiWeeklyServicesPage ||
    isAlgaeRemovalPage ||
    isFilterCleaningPage ||
    isAcidWashPage ||
    isDrainAndRefillPage ||
    isOneTimeCleansPage;
  const showProofSection =
    service.showProofSection ??
    (Boolean(service.proof) && !isWeeklyServicesPage && !isBiWeeklyServicesPage);
  const useCleanedServiceProcessLayout =
    useUpdatedServiceLayout ||
    isSandReplacementPage ||
    isPumpRepairAndInstallationPage;
  const useCleanedServiceHeroLayout =
    useUpdatedServiceLayout ||
    isSandReplacementPage ||
    isPumpRepairAndInstallationPage;
  const useWeeklyServiceSolvesLayout =
    useUpdatedServiceLayout ||
    isSandReplacementPage ||
    isPumpRepairAndInstallationPage;
  const processGridClassName = useCleanedServiceProcessLayout
    ? "mx-auto mt-8 grid auto-rows-fr items-stretch gap-4 md:mt-10 md:grid-cols-2 lg:max-w-[58rem] lg:grid-cols-4"
    : "mx-auto mt-8 grid gap-4 md:mt-10 md:grid-cols-2 lg:max-w-5xl lg:grid-cols-3";
  const serviceSolvesImage = isWeeklyServicesPage
    ? (getExistingPublicImage("/images/services/weekly-services.png") ?? "/images/services/weekly-services-detail.png")
    : isBiWeeklyServicesPage
      ? (getExistingPublicImage("/images/services/bi-weekly-services.png") ?? "/images/services/weekly-services-detail.png")
      : isAlgaeRemovalPage
        ? (getExistingPublicImage("/images/services/algae-removal.png") ?? "/images/services/algae-removal.png")
        : isFilterCleaningPage
          ? (getExistingPublicImage("/images/services/filter-cleaning.png") ?? "/images/services/filter-cleaning.png")
        : isAcidWashPage
          ? (getExistingPublicImage("/images/services/acid-wash.png") ?? "/images/services/acid-wash.png")
        : isDrainAndRefillPage
          ? (getExistingPublicImage("/images/services/drain-and-refill.png") ?? "/images/services/drain-and-refill.png")
        : isOneTimeCleansPage
          ? (getExistingPublicImage("/images/services/one-time-cleans.png") ?? "/images/services/one-time-cleans.png")
        : isSandReplacementPage
          ? (getExistingPublicImage("/images/services/sand-replacement.png") ?? "/images/services/sand-replacement.png")
        : isPumpRepairAndInstallationPage
          ? (getExistingPublicImage("/images/services/pump-repair-installation.png") ??
            "/images/services/pump-repair-installation.png")
          : null;
  const processSteps = useCleanedServiceProcessLayout
    ? service.process.slice(0, 4)
    : service.process.slice(0, 5);
  const algaeProofMediaImage = isAlgaeRemovalPage
    ? getExistingPublicImage("/images/proof-pool-comparison-2.png")
    : null;
  const showBenefitsSection = service.showBenefitsSection ?? true;
  const relatedServices = service.relatedServices
    .map((serviceSlug) => site.services.find((entry) => entry.slug === serviceSlug))
    .filter((entry): entry is (typeof site.services)[number] => Boolean(entry));
  const relatedLocations = site.locations.filter((location) =>
    ["south-abilene", "north-abilene", "abilene-wylie"].includes(location.slug),
  );
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.seoH1 ?? service.name,
    description: service.seoDescription ?? service.summary,
    areaServed: "Abilene, TX",
    provider: {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#organization`,
      name: site.brand.name,
      url: siteUrl,
      telephone: site.brand.phone,
    },
    url: `${siteUrl}/services/${service.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <InternalHero
        eyebrow={useCleanedServiceHeroLayout ? undefined : "Pool Service Detail"}
        title={service.seoH1 ?? service.name}
        description={service.summary}
        primaryAction={
          useCleanedServiceHeroLayout ? undefined : { label: site.ctas.primary.label, href: site.ctas.primary.href }
        }
        secondaryAction={useCleanedServiceHeroLayout ? undefined : { label: site.ctas.textUs.label, href: site.ctas.textUs.href }}
        showDecorativeCircle={!useCleanedServiceHeroLayout}
        contentClassName={useCleanedServiceHeroLayout ? "mx-auto text-center" : undefined}
        descriptionClassName={useCleanedServiceHeroLayout ? "mx-auto mt-4 max-w-[40rem]" : undefined}
      >
        {useCleanedServiceHeroLayout ? null : (
          <p className="max-w-[44rem] text-[0.98rem] leading-relaxed text-white/82 md:text-base">
            {service.supportingParagraph}
          </p>
        )}
      </InternalHero>

      <section className="relative overflow-hidden bg-white py-14 md:py-18">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_5%_9%,rgba(169,221,245,0.24),transparent_36%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_94%_22%,rgba(230,180,199,0.16),transparent_30%)]"
          aria-hidden="true"
        />
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {useWeeklyServiceSolvesLayout ? null : <p className="section-label justify-center">Service Focus</p>}
            <h2 className="text-balance font-sans text-[2.1rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-navy md:text-[3.15rem]">
              What This Service Solves
            </h2>
          </div>

          {useWeeklyServiceSolvesLayout ? (
            <div className="mx-auto mt-8 grid max-w-6xl items-start gap-8 md:mt-10 md:grid-cols-2 md:items-stretch md:gap-10">
              <article className="px-1 md:px-0">
                <div>
                  <h3 className="text-[1.55rem] font-semibold leading-tight text-navy md:text-[1.8rem]">
                    Where homeowners get stuck
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-muted md:text-[1.02rem]">
                    {service.problemStatement}
                  </p>
                </div>
                <div className="my-6 h-px bg-[linear-gradient(90deg,rgba(11,30,75,0.06)_0%,rgba(169,221,245,0.55)_50%,rgba(11,30,75,0.06)_100%)] md:my-7" />
                <div>
                  <h3 className="text-[1.55rem] font-semibold leading-tight text-navy md:text-[1.8rem]">
                    How we approach it
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-muted md:text-[1.02rem]">
                    {service.solutionStatement}
                  </p>
                </div>
              </article>
              <article
                className={
                  isDrainAndRefillPage
                    ? "flex min-h-[17rem] w-full items-center justify-center sm:min-h-[19rem] md:min-h-[21rem]"
                    : undefined
                }
              >
                <div
                  className={
                    isDrainAndRefillPage
                      ? "flex h-[17rem] w-full items-center justify-center rounded-[1rem] sm:h-[19rem] md:h-[21rem]"
                      : "relative h-[17rem] w-full overflow-hidden rounded-[1rem] sm:h-[19rem] md:h-[21rem]"
                  }
                >
                  {serviceSolvesImage ? (
                    isDrainAndRefillPage ? (
                      <Image
                        src={serviceSolvesImage}
                        alt="Drain and refill service process illustration"
                        width={1200}
                        height={900}
                        className="block h-auto w-[clamp(220px,24vw,340px)] max-w-full object-contain"
                        sizes="(min-width: 1024px) 340px, (min-width: 768px) 30vw, 70vw"
                        loading="lazy"
                        quality={76}
                      />
                    ) : (
                      <Image
                        src={serviceSolvesImage}
                        alt={
                          isAlgaeRemovalPage
                            ? "Algae removal and green-to-clean service illustration"
                            : isFilterCleaningPage
                              ? "Filter cleaning and circulation service illustration"
                            : isAcidWashPage
                              ? "Acid wash surface restoration service illustration"
                            : isOneTimeCleansPage
                              ? "One-time pool cleanup and balancing service illustration"
                            : isSandReplacementPage
                              ? "Sand replacement and filter media renewal service illustration"
                            : slug === "pump-repair-and-installation"
                              ? "Pump repair and installation service illustration"
                            : isBiWeeklyServicesPage
                              ? "Bi-weekly pool service maintenance and water care detail"
                              : "Weekly pool service recurring maintenance illustration"
                        }
                        fill
                        className="object-contain"
                        sizes="(min-width: 1024px) 36vw, (min-width: 768px) 48vw, 100vw"
                        loading="lazy"
                        quality={76}
                      />
                    )
                  ) : null}
                </div>
              </article>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-7">
              <article className="relative overflow-hidden rounded-[1.7rem] border border-line bg-white p-6 shadow-[0_16px_34px_rgba(11,30,75,0.08)] md:p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(169,221,245,0.7)_0%,rgba(11,30,75,0.7)_100%)]" aria-hidden="true" />
                <p className="section-label">Problem</p>
                <h3 className="mt-3 text-[1.55rem] font-semibold leading-tight text-navy md:text-[1.8rem]">Where homeowners get stuck</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-muted md:text-[1.02rem]">{service.problemStatement}</p>
              </article>
              <article className="relative overflow-hidden rounded-[1.7rem] border border-line bg-[linear-gradient(170deg,#ffffff_0%,#f0f9ff_100%)] p-6 shadow-[0_16px_34px_rgba(11,30,75,0.08)] md:p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(230,180,199,0.7)_0%,rgba(11,30,75,0.7)_100%)]" aria-hidden="true" />
                <p className="section-label">Solution</p>
                <h3 className="mt-3 text-[1.55rem] font-semibold leading-tight text-navy md:text-[1.8rem]">How we approach it</h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-muted md:text-[1.02rem]">{service.solutionStatement}</p>
              </article>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-light-blue-soft/20 py-10 md:py-12">
        <div className="container-page">
          <div className="mx-auto max-w-4xl rounded-[1.35rem] border border-line/70 bg-white p-6 shadow-[0_12px_28px_rgba(11,30,75,0.08)] md:p-7">
            <h2 className="text-balance font-sans text-[1.55rem] font-extrabold leading-[0.95] tracking-[-0.022em] text-navy md:text-[2rem]">
              Service Overview
            </h2>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-muted md:text-base">{service.supportingParagraph}</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-light-blue-soft/35 py-14 md:py-18">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(169,221,245,0.18),transparent_34%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_84%,rgba(230,180,199,0.14),transparent_32%)]" aria-hidden="true" />
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            {useCleanedServiceProcessLayout ? null : <p className="section-label justify-center">Process</p>}
            <h2 className="text-balance font-sans text-[2.1rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-navy md:text-[3.15rem]">
              How Shipwrecked Handles It
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              Every pool is different, but each service follows a clear process focused on practical decisions and long-term protection.
            </p>
          </div>

          <div className={processGridClassName}>
            {processSteps.map((step, index) => (
              <article
                key={step}
                className={`group relative h-full overflow-hidden rounded-[1.35rem] border border-navy/10 bg-white shadow-[0_14px_30px_rgba(11,30,75,0.07)] transition duration-300 hover:-translate-y-0.5 hover:border-navy/22 hover:shadow-[0_20px_40px_rgba(11,30,75,0.12)] ${
                  useCleanedServiceProcessLayout ? "px-3.5 py-3 md:px-3.5 md:py-3.5" : "p-5"
                }`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(169,221,245,0.65)_0%,rgba(11,30,75,0.7)_100%)]" aria-hidden="true" />
                <div className={useCleanedServiceProcessLayout ? "grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-2.5" : ""}>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy/20 bg-[linear-gradient(160deg,#f5fbff_0%,#e6f4fd_100%)] text-xs font-semibold text-navy shadow-[0_4px_10px_rgba(11,30,75,0.08)]">
                    {index + 1}
                  </span>
                  <p className={`${useCleanedServiceProcessLayout ? "" : "mt-2.5 "}text-sm leading-relaxed text-ink-muted md:text-[0.96rem]`}>
                    {step}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {!showBenefitsSection || isWeeklyServicesPage || isBiWeeklyServicesPage || isAlgaeRemovalPage ? null : (
        <section className="relative overflow-hidden bg-white py-14 md:py-18">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(169,221,245,0.17),transparent_34%)]" aria-hidden="true" />
          <div className="container-page">
            <div className="mx-auto max-w-4xl text-center">
              <p className="section-label justify-center">Benefits</p>
              <h2 className="text-balance font-sans text-[2.1rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-navy md:text-[3.15rem]">
                Benefits You Can Expect
              </h2>
            </div>

            <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:mt-10 md:grid-cols-3">
              {service.outcomes.slice(0, 3).map((outcome) => (
                <article
                  key={outcome}
                  className="relative overflow-hidden rounded-[1.35rem] border border-line bg-white p-5 shadow-[0_14px_30px_rgba(11,30,75,0.08)]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(230,180,199,0.55)_0%,rgba(11,30,75,0.55)_100%)]" aria-hidden="true" />
                  <div
                    className="mb-3 inline-flex h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,#A9DDF5_0%,#0B1E4B_85%)]"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-ink-muted md:text-[0.96rem]">{outcome}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {showProofSection ? (
        <section className="relative overflow-hidden bg-white py-14 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_16%,rgba(169,221,245,0.2),transparent_35%)]"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(11,30,75,0.2)_50%,transparent_100%)]" aria-hidden="true" />
          <div className="container-page relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              {isAlgaeRemovalPage || isPumpRepairAndInstallationPage || isAcidWashPage ? null : (
                <p className="section-label justify-center">Proof</p>
              )}
              <h2 className="text-balance font-sans text-[2.1rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-navy md:text-[3.15rem]">
                The Proof is in the Pool
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
                {service.proof?.body}
              </p>
            </div>

            {isAlgaeRemovalPage ? (
              <div className="mx-auto mt-8 max-w-5xl md:mt-10">
                <div className="mx-auto w-full max-w-[900px]">
                  <div className="relative min-h-[14rem] overflow-hidden rounded-2xl md:min-h-[22rem]">
                    {algaeProofMediaImage ? (
                      <Image
                        src={algaeProofMediaImage}
                        alt={`${service.name} proof image`}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1200px) 1100px, (min-width: 768px) 92vw, 96vw"
                        loading="lazy"
                        quality={78}
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
            ) : isPumpRepairAndInstallationPage ? (
              <div className="mx-auto mt-8 max-w-5xl md:mt-10">
                <div className="mx-auto max-w-4xl">
                  <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[1.35rem]">
                    {proofSingleImage ? (
                      <Image
                        src={proofSingleImage}
                        alt={`${service.name} proof image`}
                        fill
                        className="object-cover object-center"
                        sizes="(min-width: 1200px) 960px, (min-width: 768px) 84vw, 95vw"
                        loading="lazy"
                        quality={78}
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.75),transparent_32%)]" aria-hidden="true" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_84%,rgba(11,30,75,0.24),transparent_48%)]" aria-hidden="true" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : isAcidWashPage ? (
              <div className="mx-auto mt-8 max-w-5xl md:mt-10">
                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                  <article className="overflow-hidden rounded-[1.5rem] border border-line/85 bg-white p-4 shadow-[0_18px_38px_rgba(11,30,75,0.12)]">
                    <div className="relative aspect-square overflow-hidden rounded-[1.2rem] bg-[linear-gradient(145deg,#f8fcff_0%,#eaf6fd_72%,#d9edf9_100%)]">
                      {proofBeforeImage ? (
                        <Image
                          src={proofBeforeImage}
                          alt="Before acid wash pool condition"
                          fill
                          className="object-contain object-center"
                          sizes="(min-width: 768px) 42vw, 92vw"
                          loading="lazy"
                          quality={78}
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.75),transparent_32%)]" aria-hidden="true" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_84%,rgba(11,30,75,0.24),transparent_48%)]" aria-hidden="true" />
                        </>
                      )}
                      <span className="absolute left-4 top-4 inline-flex rounded-[999px] border-[1.5px] border-[#14285a]/20 bg-[rgba(255,255,255,0.92)] px-4 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-[#0b1e4b] shadow-[0_10px_22px_rgba(6,18,46,0.2)] sm:text-[0.78rem]">
                        Before
                      </span>
                    </div>
                  </article>

                  <article className="overflow-hidden rounded-[1.5rem] border border-line/85 bg-white p-4 shadow-[0_18px_38px_rgba(11,30,75,0.12)]">
                    <div className="relative aspect-square overflow-hidden rounded-[1.2rem] bg-[linear-gradient(145deg,#f4fbff_0%,#e2f2fd_70%,#d3eafa_100%)]">
                      {proofAfterImage ? (
                        <Image
                          src={proofAfterImage}
                          alt="After acid wash pool condition"
                          fill
                          className="object-contain object-center"
                          sizes="(min-width: 768px) 42vw, 92vw"
                          loading="lazy"
                          quality={78}
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.75),transparent_32%)]" aria-hidden="true" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_84%,rgba(11,30,75,0.24),transparent_48%)]" aria-hidden="true" />
                        </>
                      )}
                      <span className="absolute left-4 top-4 inline-flex rounded-[999px] border-[1.5px] border-[#14285a]/20 bg-[rgba(255,255,255,0.92)] px-4 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-[#0b1e4b] shadow-[0_10px_22px_rgba(6,18,46,0.2)] sm:text-[0.78rem]">
                        After
                      </span>
                    </div>
                  </article>
                </div>
              </div>
            ) : (
              <article className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-[2rem] border border-line/85 bg-white shadow-[0_28px_62px_rgba(11,30,75,0.16)] md:mt-11">
                <div className="grid gap-0 border-b border-line/80 md:grid-cols-2">
                  <div className="relative min-h-[15rem] border-b border-line/70 bg-[linear-gradient(145deg,#f8fcff_0%,#eaf6fd_72%,#d9edf9_100%)] md:min-h-[20rem] md:border-b-0 md:border-r">
                    {proofBeforeImage ? (
                      <Image
                        src={proofBeforeImage}
                        alt={`${service.name} before service`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                        loading="lazy"
                        quality={78}
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.75),transparent_32%)]" aria-hidden="true" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_84%,rgba(11,30,75,0.24),transparent_48%)]" aria-hidden="true" />
                        <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover bg-center opacity-[0.14]" aria-hidden="true" />
                      </>
                    )}
                    <span className="absolute left-5 top-5 inline-flex rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-navy">
                      Before
                    </span>
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,46,0.06)_0%,rgba(6,18,46,0.22)_100%)]" aria-hidden="true" />
                  </div>

                  <div className="relative min-h-[15rem] bg-[linear-gradient(145deg,#f4fbff_0%,#e2f2fd_70%,#d3eafa_100%)] md:min-h-[20rem]">
                    {proofAfterImage ? (
                      <Image
                        src={proofAfterImage}
                        alt={`${service.name} after service`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                        loading="lazy"
                        quality={78}
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.75),transparent_32%)]" aria-hidden="true" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_84%,rgba(11,30,75,0.24),transparent_48%)]" aria-hidden="true" />
                        <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover bg-center opacity-[0.16]" aria-hidden="true" />
                      </>
                    )}
                    <span className="absolute left-5 top-5 inline-flex rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-navy">
                      After
                    </span>
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,46,0.04)_0%,rgba(6,18,46,0.18)_100%)]" aria-hidden="true" />
                  </div>
                </div>
                <div className="h-2 bg-[linear-gradient(90deg,rgba(169,221,245,0.4)_0%,rgba(11,30,75,0.65)_52%,rgba(230,180,199,0.45)_100%)]" aria-hidden="true" />
              </article>
            )}
          </div>
        </section>
      ) : null}

      <section className="container-page py-12 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[1.35rem] border border-line/75 bg-white p-6 shadow-[0_14px_30px_rgba(11,30,75,0.08)]">
            <h2 className="text-balance font-sans text-[1.7rem] font-extrabold leading-[0.95] tracking-[-0.022em] text-navy md:text-[2.15rem]">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 space-y-3">
              {service.faqs.map((faq) => (
                <article key={faq.question} className="rounded-[1rem] border border-line/75 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbff_100%)] px-4 py-4">
                  <h3 className="text-sm font-semibold text-ink md:text-base">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-[0.96rem]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="rounded-[1.35rem] border border-line/75 bg-white p-6 shadow-[0_14px_30px_rgba(11,30,75,0.08)]">
            <h2 className="text-balance font-sans text-[1.7rem] font-extrabold leading-[0.95] tracking-[-0.022em] text-navy md:text-[2.15rem]">
              Related Services and Areas
            </h2>

            <div className="mt-5">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-ink-soft">Related Services</h3>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {relatedServices.map((relatedService) => (
                  <Link
                    key={relatedService.slug}
                    href={`/services/${relatedService.slug}`}
                    className="focus-ring inline-flex rounded-full border border-line bg-light-blue-soft/55 px-3 py-1.5 text-sm font-medium text-navy transition hover:border-navy/25 hover:bg-light-blue-soft"
                  >
                    {relatedService.seoH1 ?? relatedService.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-ink-soft">Related Service Areas</h3>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {relatedLocations.map((location) => (
                  <Link
                    key={location.slug}
                    href={`/locations/${location.slug}`}
                    className="focus-ring inline-flex rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-navy transition hover:border-navy/25 hover:bg-light-blue-soft/40"
                  >
                    Pool Service in {location.name}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <HomeReviewsCarouselSection />

      <section className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.55rem] border border-[#9bc8df]/35 bg-[#06153a] shadow-[0_30px_62px_rgba(5,18,46,0.3)]">
          <div className="grid gap-0 md:grid-cols-[1.4fr_0.9fr]">
            <div className="relative overflow-hidden px-7 py-10 text-white md:px-10 md:py-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(230,180,199,0.2),transparent_30%),linear-gradient(175deg,#06143a_0%,#071a47_72%,#0d2a63_100%)]" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1050px_auto] bg-center opacity-[0.07]" aria-hidden="true" />
              <div className="relative z-10 max-w-4xl">
                <h2 className="text-balance font-sans text-[2rem] font-extrabold leading-[0.92] tracking-[-0.025em] md:text-[3rem]">
                  {service.ctaTitle}
                </h2>
                <p className="mt-4 max-w-[40rem] text-[0.98rem] leading-relaxed text-white/88 md:text-base">
                  Tell us what your pool is doing now and we can recommend a practical next step.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={site.ctas.primary.href} className="btn-hero-primary focus-ring">
                    {site.ctas.primary.label}
                  </Link>
                  <Link href={site.ctas.textUs.href} className="btn-hero-secondary focus-ring">
                    {site.ctas.textUs.label}
                  </Link>
                </div>
              </div>
            </div>
            <aside className="relative min-h-[220px] overflow-hidden border-t border-white/10 bg-[#0b1e4b] md:min-h-full md:border-l md:border-l-white/12 md:border-t-0">
              <Image
                src="/images/difference-trusted-neighbors.jpg"
                alt="Family enjoying a clean backyard pool"
                fill
                className="object-cover object-center"
                sizes="(min-width: 768px) 38vw, 100vw"
                loading="lazy"
                quality={74}
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(4,17,55,0.42)_0%,rgba(4,17,55,0.2)_34%,rgba(4,17,55,0.08)_70%,rgba(4,17,55,0.28)_100%)]" aria-hidden="true" />
            </aside>
          </div>
          <div className="h-1.5 bg-[linear-gradient(90deg,rgba(169,221,245,0.55)_0%,rgba(11,30,75,0.72)_52%,rgba(230,180,199,0.58)_100%)]" aria-hidden="true" />
        </div>
      </section>
    </>
  );
}
