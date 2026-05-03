import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";

type ServiceIconKey = (typeof site.home.poolCareServices.cards)[number]["icon"];

type IconProps = {
  icon: ServiceIconKey;
};

const serviceGraphicByIcon: Record<ServiceIconKey, string> = {
  weekly: "/images/services/weekly-services.png",
  biweekly: "/images/services/bi-weekly-services.png",
  algae: "/images/services/algae-removal.png",
  acidWash: "/images/services/acid-wash.png",
  drainRefill: "/images/services/drain-and-refill.png",
  filter: "/images/services/filter-cleaning.png",
  pump: "/images/services/pump-repair-installation.png",
  oneTime: "/images/services/one-time-cleans.png",
  sand: "/images/services/sand-replacement.png",
};

function ServiceIconGraphic({ icon }: IconProps) {
  const src = serviceGraphicByIcon[icon];

  return (
    <Image
      src={src}
      alt=""
      width={220}
      height={220}
      className="h-auto w-[7.4rem] max-h-[6.3rem] object-contain sm:w-[7.8rem] sm:max-h-[6.8rem] md:w-[8.3rem] md:max-h-[7.2rem] lg:w-[9.2rem] lg:max-h-[7.8rem]"
      sizes="(min-width: 1024px) 9.2rem, (min-width: 768px) 8.3rem, (min-width: 640px) 7.8rem, 7.4rem"
    />
  );
}

type HomePoolCareServicesSectionProps = {
  title?: string;
  supportingLine?: string;
  detailLinksOnly?: boolean;
};

export function HomePoolCareServicesSection({
  title,
  supportingLine,
  detailLinksOnly = false,
}: HomePoolCareServicesSectionProps = {}) {
  const section = site.home.poolCareServices;
  const sectionTitle = title ?? section.title;
  const sectionSupportingLine = supportingLine ?? section.supportingLine;

  return (
    <section className="shipwrecked-home-services-lmh-style relative overflow-hidden bg-light-blue-soft/30 py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_14%,rgba(169,221,245,0.1),transparent_34%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_86%,rgba(169,221,245,0.08),transparent_30%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden="true">
        <Image
          src="/images/decorative-blue-circle.png"
          alt=""
          width={680}
          height={680}
          className="absolute -left-[14rem] top-[54%] w-[23rem] opacity-90 lg:-left-[16rem] lg:top-[50%] lg:w-[25rem]"
          sizes="(min-width: 1024px) 25rem, 23rem"
          aria-hidden="true"
        />
        <Image
          src="/images/decorative-blue-circle.png"
          alt=""
          width={650}
          height={650}
          className="absolute -right-[14rem] top-[40%] w-[23rem] opacity-90 lg:-right-[16rem] lg:top-[36%] lg:w-[25rem]"
          sizes="(min-width: 1024px) 25rem, 23rem"
          aria-hidden="true"
        />
        <div className="absolute right-12 top-16 h-16 w-16 rounded-full border-[3px] border-light-blue/55 opacity-75 lg:right-20 lg:top-20 lg:h-20 lg:w-20" />
      </div>

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance font-sans text-[2.05rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-navy md:text-[3rem] lg:text-[3.8rem]">
            {sectionTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted md:text-base">{sectionSupportingLine}</p>
        </div>

        <div className="mx-auto mt-8 grid w-full max-w-[68rem] grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {section.cards.map((card) => {
            const hasHref = Boolean(card.href?.trim());
            const hasDetailRoute =
              hasHref &&
              card.href?.startsWith("/services/") &&
              site.services.some((service) => `/services/${service.slug}` === card.href);
            const hasLink = detailLinksOnly ? hasDetailRoute : hasHref;
            const href = hasLink && card.href ? card.href : "/services";

            return (
              <Link
                key={card.title}
                href={href}
                aria-label={`View ${card.title} service details`}
                className="shipwrecked-home-services-card service-card group relative flex h-[14.6rem] flex-col items-center justify-start overflow-hidden rounded-sm border border-navy/18 bg-white px-4 pb-7 pt-7 text-center focus-ring sm:h-[14.9rem] sm:px-5 sm:pb-7 sm:pt-7 md:h-[15.2rem] md:px-5 md:pb-8 md:pt-8 lg:h-[15.6rem]"
              >
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-light-blue/65" aria-hidden="true" />
                <div className="pointer-events-none absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-pink/45 opacity-70 transition group-hover:opacity-100" aria-hidden="true" />
                <div className="relative inline-flex w-full items-center justify-center">
                  <ServiceIconGraphic icon={card.icon} />
                </div>
                <h3 className="mt-2 max-w-[19ch] text-[1.02rem] font-semibold leading-snug text-navy md:mt-2.5 md:text-[1.08rem]">{card.title}</h3>
                {hasLink ? (
                  <span
                    className="shipwrecked-home-services-learn-more service-card-button pointer-events-none absolute bottom-6 left-1/2 inline-flex h-6 -translate-x-1/2 items-center rounded-full border border-navy/20 bg-white px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-navy md:bottom-7"
                    aria-hidden="true"
                  >
                    Learn More
                  </span>
                ) : null}
                <p className="sr-only">{card.summary}</p>
              </Link>
            );
          })}
        </div>
      </div>

    </section>
  );
}
