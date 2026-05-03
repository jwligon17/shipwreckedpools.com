import Link from "next/link";
import Image from "next/image";

import { InternalHero } from "@/components/internal-hero";
import { site } from "@/content/site";

export const metadata = {
  title: "Careers at Shipwrecked Pools",
  description:
    "Join the Shipwrecked Pools team and learn about current opportunities, benefits, requirements, and how to apply.",
};

export default function CareersPage() {
  const benefitIcons = [
    "/images/careers-benefit-pay.png",
    "/images/careers-benefit-training.png",
    "/images/careers-benefit-equipment.png",
    "/images/careers-benefit-gym.png",
    "/images/careers-benefit-heart.png",
  ] as const;

  return (
    <>
      <InternalHero
        title="Join Our Team"
        description="Shipwrecked Pools is growing and hiring reliable, hardworking people who value clear communication and professional service."
        showDecorativeCircle={false}
        containerClassName="min-h-[clamp(19.5rem,48vh,25rem)] justify-center pb-6 pt-[calc(var(--header-stack-height)+1.2rem)] md:min-h-[clamp(21rem,45vh,23.5rem)] md:pb-8 md:pt-[calc(var(--header-stack-height)+1.45rem)]"
        contentClassName="mx-auto max-w-5xl text-center"
        titleClassName="text-[2.65rem] font-extrabold leading-[0.9] tracking-[-0.035em] text-white md:text-[4rem] lg:text-[5.1rem]"
        descriptionClassName="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg"
      />

      <section className="container-page section-shell pt-10 md:pt-13 lg:pt-15">
        <section>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance font-sans text-[clamp(1.95rem,4.4vw,3.2rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-navy">
              Why Join Shipwrecked Pools
            </h2>
          </div>

          <div className="mx-auto mt-8 max-w-5xl md:mt-10">
            <div className="grid grid-cols-1 gap-8 md:gap-9 lg:grid-cols-[1.2fr_1fr] lg:items-stretch lg:gap-10">
              <div>
                <div className="border-t border-line/65">
                  {site.careers.benefits.map((benefit, index) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-3.5 border-b border-line/65 py-4.5 md:gap-4 md:py-5"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-light-blue/55 bg-light-blue-soft/35">
                        <Image
                          src={benefitIcons[index]}
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="text-[1.01rem] font-semibold leading-snug text-navy md:text-[1.08rem]">
                        {benefit}
                      </h3>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-ink-muted md:text-[0.98rem]">
                  Applicants must have their own truck and represent Shipwrecked Pools with consistency and professionalism.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[1.35rem] border border-line/70 bg-white shadow-[0_16px_40px_-24px_rgba(11,30,75,0.45)] min-h-[420px] md:min-h-[460px]">
                <Image
                  src="/images/careers/careers.png"
                  alt="Shipwrecked Pools team member skimming and servicing a swimming pool"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1280px) 34rem, (min-width: 1024px) 40vw, (min-width: 768px) 78vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-14 w-full max-w-[72rem] overflow-hidden rounded-[1.8rem] border border-white/16 bg-[linear-gradient(160deg,#08163a_0%,#0b1e4b_54%,#12326f_100%)] px-6 py-9 text-white md:mt-18 md:px-9 md:py-11 lg:mt-20 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1000px_auto] bg-center opacity-[0.1]" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 hidden h-32 w-32 rounded-full border-[8px] border-light-blue/20 md:block" aria-hidden="true" />
          <div className="pointer-events-none absolute right-10 top-8 hidden h-20 w-20 rounded-full border-[5px] border-pink/25 md:block" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="max-w-3xl text-balance font-sans text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[0.93] tracking-[-0.028em]">
              Ready to learn about current opportunities?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              Text us your resume and regular availability. 325-513-7949
            </p>
            <div className="mt-6 flex">
              <Link href={site.brand.textHref} className="btn-hero-secondary focus-ring">
                Text Us
              </Link>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
