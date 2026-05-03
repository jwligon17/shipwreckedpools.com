import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { site, type Location } from "@/content/site";

export const metadata = {
  title: "Service Areas",
  description:
    "Browse Shipwrecked Pools service areas in Abilene and nearby towns. Find your town and request professional pool service.",
};

function getExistingPublicImage(imagePath: string) {
  if (!imagePath.startsWith("/")) {
    return null;
  }

  const absolutePath = path.join(process.cwd(), "public", imagePath.slice(1));
  return existsSync(absolutePath) ? imagePath : null;
}

function getLocationImage(location: Location) {
  const configuredImage = getExistingPublicImage(location.imagePath ?? "");
  if (configuredImage) {
    return configuredImage;
  }

  const locationSlug = location.slug;
  const preferredLocationImage = `/images/locations/${locationSlug}.jpg`;
  const preferredImage = getExistingPublicImage(preferredLocationImage);

  if (preferredImage) {
    return preferredImage;
  }

  const legacyAreaImage = `/images/areas-${locationSlug}.png`;
  return getExistingPublicImage(legacyAreaImage);
}

export default function LocationsPage() {
  const locationCards = site.locations.map((location) => ({
    ...location,
    href: `/locations/${location.slug}`,
    imagePath: getLocationImage(location),
  }));

  return (
    <div className="bg-white">
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
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-balance font-sans text-[2.65rem] font-extrabold leading-[0.9] tracking-[-0.035em] text-white md:text-[4rem] lg:text-[5.1rem]">
              Your Pool is our Pool
            </h1>
            <div className="mx-auto mt-4 h-[2px] w-20 rounded-full bg-gradient-to-r from-light-blue/85 via-white/80 to-pink/75" aria-hidden="true" />
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
              Proudly serving Abilene neighborhoods and nearby communities with pool care that feels personal, local, and dependable.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-white/80 md:text-[0.95rem]">
              Choose your service area to learn how Shipwrecked Pools supports homeowners near you.
            </p>
          </div>
        </div>
        <div className="wave-divider-dark h-8 md:h-10" aria-hidden="true" />
      </section>

      <section className="relative overflow-hidden bg-white py-10 md:py-14">
        <div className="container-page relative z-10">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {locationCards.map((location) => (
              <Link
                key={location.slug}
                href={location.href}
                aria-label={`View pool service details for ${location.name}`}
                className="focus-ring block rounded-[1.8rem]"
              >
                <article className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.8rem] border border-line bg-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-light-blue/70 hover:shadow-[0_22px_44px_rgba(11,30,75,0.16)] focus-within:border-light-blue/70">
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-light-blue/90 to-transparent opacity-90" aria-hidden="true" />
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {location.imagePath ? (
                      <Image
                        src={location.imagePath}
                        alt={`Pool service area in ${location.name}`}
                        fill
                        className="object-cover saturate-[0.94] transition duration-500 group-hover:scale-[1.06] group-focus-within:scale-[1.06]"
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[linear-gradient(150deg,#0f2760_0%,#0a1a45_56%,#1b438f_100%)] transition duration-500 group-hover:scale-[1.04] group-focus-within:scale-[1.04]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(169,221,245,0.24),transparent_34%)]" aria-hidden="true" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_90%,rgba(230,180,199,0.12),transparent_34%)]" aria-hidden="true" />
                        <div className="absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-cover bg-center opacity-[0.18]" aria-hidden="true" />
                        <div className="absolute -bottom-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full border border-light-blue/25 bg-light-blue/10 blur-[1px]" aria-hidden="true" />
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,0.02)_0%,rgba(2,8,23,0.14)_56%,rgba(2,8,23,0.28)_100%)]" />
                  </div>

                  <div className="relative z-20 flex grow flex-col px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
                    <h2 className="text-[1.45rem] font-bold leading-tight text-navy md:text-[1.68rem]">{location.name}</h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink">{location.summary}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{location.routeNotes}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-navy">
                      Explore service in {location.name}
                      <span aria-hidden="true" className="ml-2 transition-transform duration-300 group-hover:translate-x-1 text-ink-muted">
                        →
                      </span>
                    </span>
                  </div>
                  <div
                    className="pointer-events-none absolute -right-6 top-[58%] h-16 w-16 rounded-full border border-pink/40 opacity-80"
                    aria-hidden="true"
                  />
                </article>
              </Link>
            ))}
          </div>

          <section className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-[1.8rem] border border-navy/15 bg-light-blue/10 px-6 py-6 md:mt-16 md:px-10 md:py-7">
            <div
              className="pointer-events-none absolute -left-24 -top-24 h-44 w-44 rounded-full border-[10px] border-light-blue/20"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -right-20 h-40 w-40 rounded-full border-[8px] border-pink/20"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-xl md:max-w-2xl">
              <h2 className="text-balance font-serif text-3xl leading-tight text-navy md:text-4xl">Not sure if you are on our route?</h2>
              <p className="mt-2.5 text-base leading-relaxed text-slate-700">
                Text us your address and we can confirm current route availability.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link href={site.ctas.primary.href} className="btn-hero-primary focus-ring">
                  Get a Quote
                </Link>
                <Link href={site.ctas.textUs.href} className="btn-hero-secondary focus-ring">
                  Text Us
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
