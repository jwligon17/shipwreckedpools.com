import Link from "next/link";

import { InternalHero } from "@/components/internal-hero";
import { site } from "@/content/site";

export const metadata = {
  title: "Pool Care Blog",
  description:
    "Read Shipwrecked Pools blog summaries covering filter care, chemistry balance, algae response, and pool maintenance guidance.",
};

function formatPostDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <InternalHero
        title="Pool Care Blog"
        description="Straightforward pool-care guidance for homeowners who want cleaner water and fewer surprises."
        showDecorativeCircle={false}
        containerClassName="min-h-[clamp(19.5rem,48vh,25rem)] justify-center pb-6 pt-[calc(var(--header-stack-height)+1.2rem)] md:min-h-[clamp(21rem,45vh,23.5rem)] md:pb-8 md:pt-[calc(var(--header-stack-height)+1.45rem)]"
        contentClassName="mx-auto max-w-5xl text-center"
        titleClassName="text-[2.65rem] font-extrabold leading-[0.9] tracking-[-0.035em] text-white md:text-[4rem] lg:text-[5.1rem]"
        descriptionClassName="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg"
      />

      <section className="container-page section-shell pt-10 md:pt-14">
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {site.blogSummaries.map((post) => (
            <article
              key={post.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-line/80 bg-white p-6 shadow-[0_16px_34px_rgba(11,30,75,0.08)] transition duration-300 hover:-translate-y-1 hover:border-navy/30 hover:shadow-[0_22px_46px_rgba(11,30,75,0.13)] md:p-7"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(169,221,245,0.65)_0%,rgba(11,30,75,0.7)_55%,rgba(230,180,199,0.5)_100%)]"
                aria-hidden="true"
              />
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">{formatPostDate(post.publishedOn)}</p>
              <h2 className="mt-3 text-balance font-sans text-[1.65rem] font-bold leading-[0.95] tracking-[-0.022em] text-navy md:text-[2rem]">
                {post.title}
              </h2>
              <p className="mt-4 grow text-[0.98rem] leading-relaxed text-ink-muted md:text-base">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="link-inline mt-5 inline-flex text-sm focus-ring">
                Read Article →
              </Link>
            </article>
          ))}
        </section>
      </section>
    </>
  );
}
