import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HomeReviewsCarouselSection } from "@/components/home-reviews-carousel-section";
import { site } from "@/content/site";
import { getLocationBySlug } from "@/lib/site";

type LocationRouteParams = {
  slug: string;
};

const LOCATION_SERVICE_SLUGS = [
  "weekly-services",
  "bi-weekly-services",
  "algae-removal",
  "acid-wash",
  "drain-and-refill",
  "filter-cleaning",
  "pump-repair-and-installation",
  "one-time-cleans",
  "sand-replacement",
] as const;

const LOCAL_STANDARDS_CARDS = [
  {
    title: "Clear Communication",
    body: "We keep you in the loop so you know what was handled and what may need attention.",
  },
  {
    title: "Dependable Route Care",
    body: "Our route planning is built around consistency, service density, and practical scheduling.",
  },
  {
    title: "Long-Term Protection",
    body: "We focus on clean water, balanced chemistry, filter care, and equipment protection over time.",
  },
] as const;

function getExistingPublicImage(imagePath?: string) {
  if (!imagePath || !imagePath.startsWith("/")) {
    return null;
  }

  const absolutePath = path.join(process.cwd(), "public", imagePath.slice(1));
  return existsSync(absolutePath) ? imagePath : null;
}

function getLocationCardImage(locationSlug: string) {
  const location = site.locations.find((entry) => entry.slug === locationSlug);
  const configuredImage = getExistingPublicImage(location?.imagePath ?? "");
  if (configuredImage) {
    return configuredImage;
  }

  const preferredLocationImage = `/images/locations/${locationSlug}.jpg`;
  const preferredImage = getExistingPublicImage(preferredLocationImage);
  if (preferredImage) {
    return preferredImage;
  }

  const legacyAreaImage = `/images/areas-${locationSlug}.png`;
  return getExistingPublicImage(legacyAreaImage);
}

export function generateStaticParams() {
  return site.locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<LocationRouteParams> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found",
      description: "The requested location page was not found.",
    };
  }

  return {
    title: location.seoTitle ?? `Pool Service in ${location.name} | Shipwrecked Pools`,
    description: `Dependable pool care for homeowners in ${location.name} who want clear water, practical communication, and protected equipment.`,
    alternates: {
      canonical: `/locations/${location.slug}`,
    },
  };
}

export default async function LocationDetailPage({ params }: { params: Promise<LocationRouteParams> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const prioritizedServiceSlugs =
    location.servicesOffered.length > 0 ? location.servicesOffered : LOCATION_SERVICE_SLUGS;
  const availableServices = prioritizedServiceSlugs
    .map((serviceSlug) => site.services.find((service) => service.slug === serviceSlug))
    .filter((service): service is (typeof site.services)[number] => Boolean(service));
  const nearbyLocations = location.nearbyLocationSlugs
    .map((nearbySlug) => getLocationBySlug(nearbySlug))
    .filter((nearbyLocation): nearbyLocation is NonNullable<typeof nearbyLocation> => Boolean(nearbyLocation));
  const fallbackNearbyLocations = site.locations.filter((entry) => entry.slug !== location.slug);
  const relatedLocations = (nearbyLocations.length > 0 ? nearbyLocations : fallbackNearbyLocations).slice(0, 6);
  const locationImagePath = location.imagePath ?? `/images/locations/${location.slug}.jpg`;
  const existingLocationImage = getExistingPublicImage(locationImagePath);
  const locationImageAlt = location.imageAlt ?? `Pool service area in ${location.name}`;
  const locationCardImage = getLocationCardImage(location.slug);
  const useCenteredHeroLayout =
    location.slug === "south-abilene" ||
    location.slug === "north-abilene" ||
    location.slug === "baird" ||
    location.slug === "abilene-wylie" ||
    location.slug === "buffalo-gap" ||
    location.slug === "clyde" ||
    location.slug === "hamby" ||
    location.slug === "hawley" ||
    location.slug === "merkel" ||
    location.slug === "potosi" ||
    location.slug === "tuscola" ||
    location.slug === "tye";
  const useCleanedHeroLayout = useCenteredHeroLayout;
  const locationsNavHref = site.navigation.find((item) => item.label === "Locations")?.href ?? "/locations";

  return (
    <>
      <section
        className={`relative -mt-[var(--header-stack-height)] overflow-hidden bg-[linear-gradient(160deg,#071332_0%,#0b1e4b_52%,#12326e_100%)] text-white ${
          useCleanedHeroLayout
            ? "pb-14 pt-[calc(var(--header-stack-height)+4.5rem)] md:pb-20 md:pt-[calc(var(--header-stack-height)+7rem)]"
            : "pb-10 pt-[calc(var(--header-stack-height)+2rem)] md:pb-14 md:pt-[calc(var(--header-stack-height)+3rem)]"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(169,221,245,0.26),transparent_36%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_84%,rgba(230,180,199,0.12),transparent_32%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1150px_auto] bg-center opacity-[0.08]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-20 top-24 hidden h-72 w-72 rounded-full border-[22px] border-light-blue/12 md:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-14 hidden h-52 w-52 rounded-full border-[12px] border-pink/14 md:block"
          aria-hidden="true"
        />
        <div
          className={`container-page relative z-10 ${
            useCleanedHeroLayout
              ? "flex min-h-[14rem] items-center md:min-h-[16rem]"
              : ""
          }`}
        >
          <div
            className={
              useCleanedHeroLayout
                ? "mx-auto w-full max-w-[900px]"
                : "grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
            }
          >
            <div className={useCleanedHeroLayout ? "mx-auto w-full text-center" : undefined}>
              {!useCleanedHeroLayout ? (
                <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-light-blue">
                  Service Area
                </p>
              ) : null}
              <h1
                className={`text-balance font-sans font-extrabold tracking-[-0.03em] ${
                  useCleanedHeroLayout
                    ? "mx-auto max-w-[900px] text-center text-[2.3rem] leading-[0.9] md:text-[3.7rem] lg:text-[4.4rem]"
                    : "mt-4 text-[2.3rem] leading-[0.9] md:text-[3.7rem] lg:text-[4.4rem]"
                }`}
              >
                Pool Service in {location.name}
              </h1>
              <p
                className={`mt-4 text-base text-light-blue md:text-lg ${
                  useCleanedHeroLayout ? "mx-auto max-w-[760px] text-center" : "max-w-3xl"
                }`}
              >
                Dependable pool care for homeowners in {location.name} who want clear water, practical communication, and protected equipment.
              </p>
            </div>

            {!useCleanedHeroLayout ? (
              <div className="relative aspect-[4/3] max-w-[32rem] overflow-hidden rounded-[1.5rem] border border-white/20 bg-navy-deep/70 shadow-[0_18px_45px_rgba(3,10,30,0.5)] lg:justify-self-end">
                {existingLocationImage ? (
                  <Image
                    src={existingLocationImage}
                    alt={locationImageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    priority
                    quality={76}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(150deg,#0f2760_0%,#0a1a45_56%,#1b438f_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(169,221,245,0.24),transparent_34%)]" aria-hidden="true" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_90%,rgba(230,180,199,0.12),transparent_34%)]" aria-hidden="true" />
                    <div className="absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-cover bg-center opacity-[0.2]" aria-hidden="true" />
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,0.08)_0%,rgba(2,8,23,0.24)_52%,rgba(2,8,23,0.58)_100%)]" />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="relative container-page pb-16 pt-8 md:pb-24 md:pt-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] rounded-[2.25rem] bg-[radial-gradient(circle_at_10%_12%,rgba(169,221,245,0.18),transparent_40%),radial-gradient(circle_at_88%_92%,rgba(230,180,199,0.12),transparent_36%)]"
          aria-hidden="true"
        />
        <section>
          <Link href={locationsNavHref} className="link-inline relative z-10 text-sm focus-ring">
            ← Back to Locations
          </Link>
        </section>

        <section className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] md:items-stretch">
            <div>
              <h2 className="font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.02em] text-navy md:text-[2.7rem]">
                Reliable Pool Care in {location.name}
              </h2>
              <div className="mt-4 max-w-4xl space-y-4 text-sm leading-relaxed text-ink-muted md:text-base">
                <p>
                  Shipwrecked Pools serves homeowners in {location.name} with pool care built around consistency, communication, and long-term system health. Whether your pool needs recurring service, green-to-clean recovery, filter care, or practical maintenance support, we keep the process straightforward and local.
                </p>
                <p>
                  Route availability can vary by season and current service density, so the fastest way to confirm service is to text us your address or request a quick quote.
                </p>
              </div>
            </div>
            <div className="relative min-h-[13rem] overflow-hidden rounded-2xl border border-line/70 bg-light-blue/10 md:min-h-[17rem]">
              {locationCardImage ? (
                <Image
                  src={locationCardImage}
                  alt={`Pool service in ${location.name}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 36vw, 100vw"
                  loading="lazy"
                  quality={76}
                />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(150deg,#0f2760_0%,#0a1a45_56%,#1b438f_100%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(169,221,245,0.24),transparent_34%)]" aria-hidden="true" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_90%,rgba(230,180,199,0.12),transparent_34%)]" aria-hidden="true" />
                  <div className="absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-cover bg-center opacity-[0.18]" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="relative mt-8 overflow-hidden rounded-3xl border border-white/16 bg-[linear-gradient(156deg,#09183c_0%,#0b1e4b_58%,#12326e_100%)] p-6 text-white shadow-[0_22px_54px_rgba(6,18,46,0.48)] md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(169,221,245,0.2),transparent_32%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_88%,rgba(230,180,199,0.11),transparent_32%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1000px_auto] bg-center opacity-[0.09]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -bottom-12 right-10 h-32 w-32 rounded-full border-[8px] border-pink/22"
            aria-hidden="true"
          />
          <h2 className="font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.02em] text-white md:text-[2.7rem]">
            Pool Services Available in {location.name}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {availableServices.map((service) => (
              <article
                key={service.slug}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/22 bg-white/8 p-5 backdrop-blur-[1px] transition duration-300 hover:-translate-y-0.5 hover:border-light-blue/55 hover:bg-white/12"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-light-blue/70 to-transparent opacity-85" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                <p className="mt-2 grow text-sm leading-relaxed text-light-blue">{service.summary}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="focus-ring mt-4 inline-flex text-sm font-semibold text-white underline decoration-light-blue decoration-2 underline-offset-4 transition hover:text-light-blue"
                >
                  View {service.seoH1 ?? service.name}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-[78rem] md:mt-16">
          <h2 className="mx-auto max-w-[48rem] text-balance text-center font-sans text-[2.2rem] font-extrabold leading-[0.92] tracking-[-0.02em] text-navy md:text-[3rem]">
            Local Standards, Professional Pool Care
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {LOCAL_STANDARDS_CARDS.map((card) => (
              <article
                key={card.title}
                className="mx-auto flex h-full min-h-[14rem] w-full max-w-[21.75rem] flex-col rounded-[0.7rem] border border-line/75 bg-white p-7"
              >
                <h3 className="text-[1.28rem] font-bold leading-tight text-navy">{card.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
          <h2 className="font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.02em] text-navy md:text-[2.7rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-3">
            {location.faqs.map((faq) => (
              <article key={faq.question} className="rounded-[1.1rem] border border-line/80 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbff_100%)] px-4 py-4 md:px-5">
                <h3 className="font-semibold text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <HomeReviewsCarouselSection
        title="Trusted by Homeowners Near You"
        supportingLine="Rated 5.0 on Google with 35+ reviews from local homeowners."
      />

      <section className="container-page pb-16 pt-8 md:pb-24 md:pt-10">
        <section className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
          <h2 className="font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.02em] text-navy md:text-[2.7rem]">
            Nearby Service Areas
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted md:text-base">
            Explore nearby communities where Shipwrecked Pools provides route-based pool care.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedLocations.map((nearbyLocation) => (
              <Link
                key={nearbyLocation.slug}
                href={`/locations/${nearbyLocation.slug}`}
                className="focus-ring rounded-2xl border border-line bg-light-blue-soft/45 px-4 py-4 text-base font-semibold text-navy transition duration-300 hover:-translate-y-0.5 hover:border-navy/30 hover:bg-light-blue-soft hover:shadow-[0_12px_24px_rgba(11,30,75,0.1)]"
              >
                {nearbyLocation.name}
              </Link>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
