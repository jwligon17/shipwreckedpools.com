import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { InternalHero } from "@/components/internal-hero";
import { site } from "@/content/site";

export const metadata = {
  title: "Get a Pool Service Quote in Abilene, TX | Shipwrecked Pools",
  description:
    "Call or text Shipwrecked Pools for weekly service, green-to-clean help, filter cleaning, and pool care quotes in Abilene.",
};

export default function ContactPage() {
  return (
    <>
      <InternalHero
        title="Get a Pool Service Quote in Abilene, TX"
        description="Share your address, pool condition, and preferred contact method. We respond with practical next steps, and you can call or text us now for faster routing."
        backgroundVideoSrc="/videos/contact-hero.mp4"
        contentClassName="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        titleClassName="text-[clamp(2rem,5vw,4rem)] leading-[0.92] sm:leading-[0.9]"
        descriptionClassName="mt-5 max-w-[43rem] text-[1.01rem] leading-relaxed md:text-lg"
        showDecorativeCircle={false}
      />

      <section className="container-page section-shell pt-8 md:pt-10">
        <section className="mx-auto mb-6 w-full max-w-4xl rounded-[1.25rem] border border-line/80 bg-light-blue-soft/45 px-5 py-4 md:px-6 md:py-5">
          <h2 className="text-[1.15rem] font-semibold text-navy md:text-[1.25rem]">What to Send With Your Quote Request</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-[0.96rem]">
            Include your service address, pool condition, and what help you need most (weekly service, algae cleanup, filter support, or a one-time clean). Shipwrecked Pools serves Abilene and surrounding service areas, responds quickly, and offers call or text support right away.
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-navy">
            <span className="rounded-full border border-line bg-white px-3 py-1">100% Money-Back Guarantee</span>
            <span className="rounded-full border border-line bg-white px-3 py-1">Rated 5.0 on Google</span>
            <span className="rounded-full border border-line bg-white px-3 py-1">Abilene + Surrounding Areas</span>
          </div>
        </section>

        <div className="mx-auto w-full max-w-4xl">
          <ContactForm />
        </div>

        <section className="relative mt-12 overflow-hidden rounded-[1.8rem] border border-white/16 bg-[linear-gradient(160deg,#08163a_0%,#0b1e4b_54%,#12326f_100%)] px-7 py-9 text-white md:mt-16 md:px-9 md:py-11">
          <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1000px_auto] bg-center opacity-[0.1]" aria-hidden="true" />
          <div className="pointer-events-none absolute right-10 top-8 hidden h-20 w-20 rounded-full border-[5px] border-pink/25 md:block" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 hidden h-32 w-32 rounded-full border-[8px] border-light-blue/20 md:block" aria-hidden="true" />
          <div className="relative z-10">
            <h2 className="text-balance font-sans text-[clamp(1.95rem,4.4vw,3.2rem)] font-extrabold leading-[0.93] tracking-[-0.028em]">
              Prefer a quick conversation?
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/88 md:text-base">
              Call or text Shipwrecked Pools directly and we can help you map out the right next step.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={site.ctas.callUs.href} className="btn-hero-primary focus-ring">
                Call Us
              </Link>
              <Link href={site.ctas.textUs.href} className="btn-hero-secondary focus-ring">
                Text Us
              </Link>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
