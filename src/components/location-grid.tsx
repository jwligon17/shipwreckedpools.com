import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export function LocationGrid() {
  return (
    <section className="container-page section-shell">
      <SectionHeading
        eyebrow="Service Areas"
        title="Abilene routes with dependable local coverage"
        description={site.home.locationsIntro}
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {site.locations.map((location) => (
          <Link
            key={location.slug}
            href={`/locations/${location.slug}`}
            className="card card-hover rounded-2xl border-light-blue p-4 text-sm font-semibold text-ink hover:border-pink hover:text-navy focus-ring"
          >
            <span className="block">{location.name}</span>
            <span className="mt-1 block text-xs font-normal text-ink-soft">{location.routeNotes}</span>
          </Link>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/locations" className="btn-secondary focus-ring">
          View Full Service Area
        </Link>
        <Link href={site.ctas.textUs.href} className="btn-subtle focus-ring">
          {site.ctas.textUs.label}
        </Link>
      </div>
    </section>
  );
}
