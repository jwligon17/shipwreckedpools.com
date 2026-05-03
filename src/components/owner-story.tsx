import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export function OwnerStory() {
  const { ownerStory } = site.home;

  return (
    <section className="container-page section-shell">
      <div className="grid gap-6 md:grid-cols-[1fr_0.95fr]">
        <article className="card bg-navy text-white">
          <SectionHeading
            eyebrow="Owner Story"
            title={ownerStory.title}
            description={ownerStory.summary}
            light
          />
          <ul className="mt-6 space-y-3 text-sm text-white/90 md:text-base">
            {ownerStory.points.map((point) => (
              <li key={point} className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3">
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/about" className="btn-subtle focus-ring">
              Learn More About Jason
            </Link>
            <Link href={site.ctas.textUs.href} className="btn-inverse focus-ring">
              {site.ctas.textUs.label}
            </Link>
          </div>
        </article>

        <article className="card overflow-hidden">
          <div className="h-48 rounded-2xl bg-[url(/images/card-grid.svg)] bg-cover bg-center" aria-hidden="true" />
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">Asset Management Angle</p>
            <h3 className="mt-2 font-serif text-3xl text-ink">A pool is one of your home’s major mechanical systems.</h3>
            <p className="mt-3 text-ink-muted">
              Shipwrecked Pools approaches service as long-term system care, not surface-only cleanup.
            </p>
            <div className="mt-4 rounded-2xl border border-dashed border-light-blue bg-light-blue-soft p-4 text-sm text-ink-soft">
              Photography placeholder: replace with owner/team field image before launch.
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
