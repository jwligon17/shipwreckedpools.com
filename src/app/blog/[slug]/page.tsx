import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { InternalHero } from "@/components/internal-hero";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return site.blogSummaries.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = site.blogSummaries.find((item) => item.slug === params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog summary page was not found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

function formatPostDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = site.blogSummaries.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedArticles = site.blogSummaries.filter((item) => item.slug !== post.slug).slice(0, 3);
  const relatedServices = post.relatedServiceSlugs
    .map((serviceSlug) => site.services.find((service) => service.slug === serviceSlug))
    .filter((service): service is (typeof site.services)[number] => Boolean(service));
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedOn,
    dateModified: post.publishedOn,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: site.brand.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.brand.name,
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    articleSection: "Pool Care",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <InternalHero
        eyebrow="Pool Care Blog"
        title={post.title}
        description={post.excerpt}
        primaryAction={{ label: "Back to Blog", href: "/blog" }}
        secondaryAction={{ label: "Get a Quote", href: "/contact" }}
      />

      <section className="container-page section-shell pt-10 md:pt-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <article className="relative overflow-hidden rounded-[1.8rem] border border-line/85 bg-white p-7 shadow-[0_18px_38px_rgba(11,30,75,0.08)] md:p-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_6%_12%,rgba(169,221,245,0.16),transparent_38%),radial-gradient(circle_at_96%_88%,rgba(230,180,199,0.08),transparent_34%)]"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">Published {formatPostDate(post.publishedOn)}</p>
            <h1 className="mt-4 text-balance font-sans text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-navy">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-[1rem] leading-relaxed text-ink-muted md:text-lg">{post.excerpt}</p>

            <div className="mt-8 rounded-[1.25rem] border border-line/80 bg-[linear-gradient(180deg,#ffffff_0%,#f5faff_100%)] p-5 md:p-6">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-navy">Article</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-muted md:text-base">{post.summaryBody}</p>
              <div className="mt-4 space-y-3">
                {post.bodySections.map((section) => (
                  <p key={section} className="text-[0.98rem] leading-relaxed text-ink-muted md:text-base">
                    {section}
                  </p>
                ))}
              </div>
            </div>

            {relatedServices.length > 0 ? (
              <section className="mt-6 rounded-[1.25rem] border border-line/80 bg-white p-5 md:p-6">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-navy">Related Pool Services</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {relatedServices.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="focus-ring inline-flex rounded-full border border-line bg-light-blue-soft/55 px-3 py-1.5 text-sm font-medium text-navy transition hover:border-navy/25 hover:bg-light-blue-soft"
                    >
                      {service.seoH1 ?? service.name}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/blog" className="btn-secondary focus-ring">
                Back to Blog
              </Link>
              <Link href="/contact" className="btn-primary focus-ring">
                Get a Quote
              </Link>
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 ? (
          <section className="mt-12 md:mt-16">
            <h2 className="text-balance font-sans text-[clamp(1.85rem,4.5vw,3rem)] font-extrabold leading-[0.93] tracking-[-0.028em] text-navy">
              Related Articles
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <article
                  key={related.slug}
                  className="rounded-[1.2rem] border border-line/80 bg-white p-5 shadow-[0_12px_26px_rgba(11,30,75,0.07)]"
                >
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">{formatPostDate(related.publishedOn)}</p>
                  <h3 className="mt-2 text-balance text-[1.2rem] font-semibold leading-tight text-navy">{related.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{related.excerpt}</p>
                  <Link href={`/blog/${related.slug}`} className="link-inline mt-3 inline-flex text-sm focus-ring">
                    Read Article →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </>
  );
}
