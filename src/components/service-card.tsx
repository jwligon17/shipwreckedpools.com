import Link from "next/link";

import type { Service } from "@/content/site";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="card card-hover flex h-full flex-col">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">Service</p>
      <h3 className="mt-2 font-serif text-2xl text-ink">{service.name}</h3>
      <p className="mt-3 text-sm text-ink-muted">{service.summary}</p>
      <p className="mt-3 rounded-2xl border border-light-blue bg-light-blue-soft px-3 py-2 text-xs font-medium text-ink-muted">{service.idealFor}</p>
      <ul className="mt-4 space-y-1 text-sm text-ink-soft">
        {service.bullets.slice(0, 2).map((bullet) => (
          <li key={bullet}>• {bullet}</li>
        ))}
      </ul>
      <Link href={`/services/${service.slug}`} className="link-inline mt-5 inline-flex text-sm focus-ring">
        View service details →
      </Link>
    </article>
  );
}
