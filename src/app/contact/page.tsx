import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { InternalHero } from "@/components/internal-hero";
import { site } from "@/content/site";

export const metadata = {
  title: "Contact Shipwrecked Pools",
  description:
    "Request a quote, text, or call Shipwrecked Pools for professional pool service in Abilene and surrounding areas.",
};

export default function ContactPage() {
  return (
    <>
      <InternalHero
        title="Contact Us"
        description="Tell us what your pool needs and we’ll help you find the right next step."
        backgroundVideoSrc="/videos/contact-hero.mp4"
        contentClassName="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        titleClassName="text-[clamp(2rem,5vw,4rem)] leading-[0.92] sm:leading-[0.9]"
        descriptionClassName="mt-5 max-w-[43rem] text-[1.01rem] leading-relaxed md:text-lg"
        showDecorativeCircle={false}
      />

      <section className="container-page section-shell pt-8 md:pt-10">
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
