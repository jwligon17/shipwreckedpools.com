import Link from "next/link";

import { site } from "@/content/site";

type InternalCtaProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export function InternalCta({
  title,
  description,
  primaryLabel = site.ctas.primary.label,
  primaryHref = site.ctas.primary.href,
}: InternalCtaProps) {
  return (
    <section className="relative mt-12 overflow-hidden rounded-[1.8rem] border border-white/16 bg-[linear-gradient(160deg,#08163a_0%,#0b1e4b_54%,#12326f_100%)] px-6 py-9 text-white md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1000px_auto] bg-center opacity-[0.1]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-10 top-8 hidden h-20 w-20 rounded-full border-[5px] border-pink/25 md:block" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 hidden h-36 w-36 rounded-full border-[10px] border-light-blue/16 md:block" aria-hidden="true" />
      <h2 className="relative z-10 text-balance font-sans text-[clamp(1.9rem,4vw,3.15rem)] font-extrabold leading-[0.93] tracking-[-0.026em]">
        {title}
      </h2>
      <p className="relative z-10 mt-3 max-w-3xl text-sm leading-relaxed text-white/88 md:text-base">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={primaryHref} className="btn-hero-primary focus-ring">
          {primaryLabel}
        </Link>
        <Link href={site.ctas.textUs.href} className="btn-hero-secondary focus-ring">
          {site.ctas.textUs.label}
        </Link>
        <Link href="https://shipwreckedpools.mypoolportal.com/auth/sign-in" className="btn-hero-secondary focus-ring">
          {site.ctas.payNow.label}
        </Link>
      </div>
    </section>
  );
}
