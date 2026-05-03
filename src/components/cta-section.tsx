import Link from "next/link";

import { site } from "@/content/site";

export function CTASection() {
  return (
    <section className="container-page pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-[linear-gradient(145deg,var(--color-navy-deep)_0%,var(--color-navy)_72%)] px-6 py-10 text-white md:px-10 md:py-14">
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(closest-side,rgba(169,221,245,0.34),transparent)]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(230,180,199,0.2),transparent_30%)]" aria-hidden="true" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-pink">{site.home.finalCta.eyebrow}</p>
        <div className="relative mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl font-serif text-3xl leading-tight md:text-5xl">
            {site.home.finalCta.title}
          </h2>
          <div className="flex flex-wrap gap-2.5 md:justify-end">
            <Link href={site.ctas.primary.href} className="btn-primary focus-ring">
              {site.ctas.primary.label}
            </Link>
            <Link href={site.ctas.textUs.href} className="btn-inverse focus-ring">
              {site.ctas.textUs.label}
            </Link>
            <Link href="/pay-now" className="btn-inverse focus-ring">
              {site.ctas.payNow.label}
            </Link>
          </div>
        </div>
        <p className="relative mt-4 max-w-3xl text-sm leading-relaxed text-white/82 md:text-base">{site.home.finalCta.summary}</p>
      </div>
    </section>
  );
}
