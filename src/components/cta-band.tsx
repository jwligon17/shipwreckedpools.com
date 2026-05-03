import Link from "next/link";

import { site } from "@/content/site";

export function CtaBand() {
  return (
    <section className="rounded-3xl bg-navy px-6 py-10 text-white md:px-10 md:py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink">Ready to hand off pool care?</p>
      <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
          Keep your weekends. We will handle the chemistry, cleaning, and system health.
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={site.ctas.primary.href} className="btn-primary focus-ring">
            {site.ctas.primary.label}
          </Link>
          <Link href={site.ctas.payNow.href} target="_blank" rel="noreferrer" className="btn-inverse focus-ring">
            {site.ctas.payNow.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
