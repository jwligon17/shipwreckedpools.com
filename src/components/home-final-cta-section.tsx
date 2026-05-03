import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";

// Drop final CTA image into public/images/final-cta-pool-service.png
const FINAL_CTA_IMAGE_PATH = "/images/final-cta-pool-service.png";

function getExistingPublicImage(imagePath: string) {
  if (!imagePath.startsWith("/")) {
    return null;
  }

  const absolutePath = path.join(process.cwd(), "public", imagePath.slice(1));
  return existsSync(absolutePath) ? imagePath : null;
}

type HomeFinalCtaSectionProps = {
  title?: string;
  summary?: string;
  primaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
};

export function HomeFinalCtaSection({
  title,
  summary,
  primaryCta,
  secondaryCta,
}: HomeFinalCtaSectionProps = {}) {
  const finalCtaImage = getExistingPublicImage(FINAL_CTA_IMAGE_PATH);
  const ctaTitle = title ?? site.home.finalCta.title;
  const ctaSummary = summary;
  const primaryAction = primaryCta ?? site.ctas.primary;
  const secondaryAction = secondaryCta ?? site.ctas.textUs;

  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-[#9bc8df]/40 bg-[#06153a] shadow-[0_30px_64px_rgba(5,18,46,0.32)]">
        <div className="grid min-h-[500px] md:grid-cols-[1.3fr_1fr] lg:grid-cols-[1.65fr_1fr]">
          <article className="relative flex flex-col justify-center overflow-hidden border-b border-white/10 px-7 py-10 text-white md:border-b-0 md:border-r md:border-r-white/12 md:px-10 md:py-12 lg:px-14 lg:py-14">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(230,180,199,0.2),transparent_30%),linear-gradient(175deg,#06143a_0%,#071a47_72%,#0d2a63_100%)]"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1050px_auto] bg-center opacity-[0.06]" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="max-w-[14ch] text-balance font-sans text-[2.25rem] font-extrabold leading-[0.9] tracking-[-0.028em] md:text-[3rem] lg:text-[3.45rem]">
                {ctaTitle}
              </h2>
              {ctaSummary ? (
                <p className="mt-4 max-w-[35ch] text-[0.98rem] leading-relaxed text-white/90 md:text-base">{ctaSummary}</p>
              ) : null}

              <div className="mt-7">
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3.5">
                  <Link
                    href={primaryAction.href}
                    className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-white bg-white px-5 py-3 text-sm font-semibold text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-light-blue-soft"
                  >
                    {primaryAction.label}
                  </Link>

                  <Link
                    href={secondaryAction.href}
                    className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-white/70 bg-transparent px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/12"
                  >
                    {secondaryAction.label}
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <aside className="relative min-h-[300px] overflow-hidden bg-[linear-gradient(165deg,#041137_0%,#0b1e4b_55%,#1a579f_100%)] md:min-h-full">
            {finalCtaImage ? (
              <Image
                src={finalCtaImage}
                alt="Pool brush cleaning a Shipwrecked Pools service pool"
                fill
                className="object-cover brightness-[1.1] contrast-[1.04]"
                sizes="(min-width: 1024px) 35vw, (min-width: 768px) 43vw, 100vw"
                loading="lazy"
                quality={78}
              />
            ) : (
              <>
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(255,255,255,0.2),transparent_34%),radial-gradient(circle_at_82%_74%,rgba(169,221,245,0.33),transparent_50%),linear-gradient(170deg,rgba(169,221,245,0.15)_0%,rgba(7,22,59,0.45)_100%)]"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1100px_auto] bg-center opacity-[0.2] mix-blend-screen" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(3,16,48,0.2)_0%,rgba(3,16,48,0.56)_100%)]" aria-hidden="true" />
              </>
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,16,48,0.24)_0%,rgba(3,16,48,0.12)_26%,rgba(3,16,48,0.05)_56%,rgba(3,16,48,0.02)_100%)]"
              aria-hidden="true"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
