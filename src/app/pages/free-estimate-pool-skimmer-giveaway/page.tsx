import Image from "next/image";
import type { Metadata } from "next";
import { GiveawayEstimateForm } from "@/components/giveaway-estimate-form";

export const metadata: Metadata = {
  title: "Free Estimate & Pool Skimmer Giveaway",
  description:
    "Enter for a chance to win an Aiper EcoSurfer P1 robotic skimmer and opt in for a personalized Shipwrecked Pools quote.",
  alternates: {
    canonical: "/pages/free-estimate-pool-skimmer-giveaway",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function FreeEstimatePoolSkimmerGiveawayPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-deep pb-10 pt-[calc(var(--header-stack-height)+1.3rem)] text-white md:pb-14 md:pt-[calc(var(--header-stack-height)+2.65rem)]">
        <Image
          src="/images/giveaway/giveaway-hero.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="pointer-events-none object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(3,11,29,0.78)_0%,rgba(7,20,52,0.68)_45%,rgba(10,30,75,0.74)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(169,221,245,0.18),transparent_42%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(5,18,46,0.9)_100%)]"
          aria-hidden="true"
        />

        <div className="container-page relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-balance font-sans text-[clamp(2.45rem,6.2vw,5.4rem)] font-black leading-[0.88] tracking-[-0.035em] text-white">
              Free Estimate &amp; Pool Skimmer Giveaway
            </h1>
            <p className="mx-auto mt-6 max-w-[42rem] text-pretty text-[1.02rem] leading-relaxed text-white/90 md:mt-7 md:text-[1.16rem]">
              Enter for a chance to win an Aiper EcoSurfer P1 robotic skimmer, and opt in for a
              personalized quote to keep your pool looking Ship-Shape.
            </p>

          </div>
        </div>

      </section>

      <section className="relative bg-white py-14 md:py-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(169,221,245,0.16)_0%,transparent_100%)]"
          aria-hidden="true"
        />
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-line/80 bg-[linear-gradient(180deg,#ffffff_0%,#f5faff_100%)] p-7 shadow-[0_20px_46px_rgba(11,30,75,0.09)] md:p-10">
            <h2 className="text-center font-sans text-[1.6rem] font-bold leading-tight text-navy md:text-[1.95rem]">
              Win a FREE Aiper Skimmer
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink-soft md:text-base">
              Complete the form for a chance to win a FREE Aiper EcoSurfer P1 Skimmer. Winner
              will be chosen and contacted May 15th.
            </p>
            <GiveawayEstimateForm />
          </div>
        </div>
      </section>
    </>
  );
}
