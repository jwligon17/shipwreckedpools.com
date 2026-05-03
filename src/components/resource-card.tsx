import Link from "next/link";

import type { ResourcePreview } from "@/content/site";

type ResourceCardProps = {
  resource: ResourcePreview;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="card card-hover relative flex h-full flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-light-blue-soft to-transparent" aria-hidden="true" />
      <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-navy">Resource</p>
      <h3 className="relative mt-2 font-serif text-2xl text-ink">{resource.title}</h3>
      <p className="relative mt-3 flex-1 text-ink-muted">{resource.summary}</p>
      <Link href={resource.href} className="link-inline relative mt-5 inline-flex text-sm focus-ring">
        {resource.ctaLabel} →
      </Link>
    </article>
  );
}
