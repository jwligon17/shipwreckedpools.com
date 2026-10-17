import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

import { InternalHero } from "@/components/internal-hero";
import { diyGuideGroups, diyGuides } from "@/content/diy-guides";

export const metadata = {
  title: "DIY Pool Care Cheat Sheet",
  alternates: { canonical: "/diy-pool-care" },
  description:
    "Download the free Shipwrecked Pools DIY pool care cheat sheet and keep your pool healthier between professional visits.",
};

function getExistingPublicImage(imagePath?: string) {
  if (!imagePath || !imagePath.startsWith("/")) {
    return null;
  }

  const absolutePath = path.join(process.cwd(), "public", imagePath.slice(1));
  return existsSync(absolutePath) ? imagePath : null;
}

export default function DiyPoolCarePage() {
  const heroVideo = getExistingPublicImage("/videos/services-hero.mp4");

  return (
    <>
      <InternalHero
        title="DIY Pool Care"
        description="Helpful pool-care guidance for homeowners who want more confidence between professional visits."
        backgroundVideoSrc={heroVideo ?? undefined}
        containerClassName="min-h-[clamp(19.5rem,48vh,25rem)] justify-center pb-6 pt-[calc(var(--header-stack-height)+1.05rem)] md:min-h-[clamp(21rem,45vh,23.5rem)] md:pb-8 md:pt-[calc(var(--header-stack-height)+1.3rem)]"
        contentClassName="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        titleClassName="text-[clamp(2rem,5vw,4rem)] leading-[0.92] sm:leading-[0.9]"
        descriptionClassName="mt-5 max-w-[43rem] text-[1.01rem] leading-relaxed md:text-lg"
        showDecorativeCircle={false}
      />

      <section className="border-b border-line/60 bg-light-blue-soft/25 py-12 md:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-label justify-center">Practical homeowner education</p>
            <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3.1rem]">
              Pool care guides organized by the decision in front of you
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              Start with routine care, water chemistry, condition recovery, equipment, surfaces, spa care, or property planning. These guides explain observations and safe decision boundaries; service pages remain the place to request professional help.
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {diyGuideGroups.map((group) => {
              const guides = group.slugs
                .map((slug) => diyGuides.find((guide) => guide.slug === slug))
                .filter((guide): guide is (typeof diyGuides)[number] => Boolean(guide));

              return (
                <section key={group.title} className="rounded-[1.4rem] border border-line/75 bg-white p-6 shadow-[0_14px_30px_rgba(11,30,75,0.08)]">
                  <p className="section-label">{group.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{group.description}</p>
                  <div className="mt-5 grid gap-3">
                    {guides.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/diy-pool-care/${guide.slug}`}
                        className="focus-ring group rounded-[1rem] border border-line/75 bg-light-blue-soft/25 p-4 transition hover:border-navy/25 hover:bg-light-blue-soft/55"
                      >
                        <h3 className="font-semibold leading-snug text-navy">{guide.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{guide.description}</p>
                        <span className="link-inline mt-3 inline-flex text-sm">Read guide →</span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page section-shell py-14 md:py-20">
          <div className="mx-auto mb-8 max-w-4xl text-center md:mb-10">
            <p className="section-label justify-center">Printable reference</p>
            <h2 className="mt-3 text-balance font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.028em] text-navy md:text-[3rem]">
              DIY Pool Care Cheat Sheet
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              Keep the existing two-sided reference handy for quick reminders between deeper guide reviews or professional visits.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            <article className="overflow-hidden rounded-[1.2rem] border border-line/70 bg-white shadow-[0_16px_34px_rgba(11,30,75,0.08)]">
              <Image
                src="/images/diy-cheat-sheet-side-a.png"
                alt="DIY pool care cheat sheet side A preview"
                width={1800}
                height={2400}
                className="h-auto w-full object-contain"
                priority
              />
            </article>

            <article className="overflow-hidden rounded-[1.2rem] border border-line/70 bg-white shadow-[0_16px_34px_rgba(11,30,75,0.08)]">
              <Image
                src="/images/diy-cheat-sheet-side-b.png"
                alt="DIY pool care cheat sheet side B preview"
                width={1800}
                height={2400}
                className="h-auto w-full object-contain"
              />
            </article>
          </div>

        </div>
      </section>
    </>
  );
}
