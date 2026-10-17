import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { InternalHero } from "@/components/internal-hero";
import { diyGuides, getDiyGuideBySlug } from "@/content/diy-guides";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";

type DiyGuideRouteParams = {
  slug: string;
};

export function generateStaticParams() {
  return diyGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<DiyGuideRouteParams> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getDiyGuideBySlug(slug);

  if (!guide) {
    return {
      title: "DIY Pool Care Guide Not Found",
      description: "The requested DIY pool care guide was not found.",
    };
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/diy-pool-care/${guide.slug}` },
  };
}

function sectionId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function DiyGuidePage({ params }: { params: Promise<DiyGuideRouteParams> }) {
  const { slug } = await params;
  const guide = getDiyGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const route = `/diy-pool-care/${guide.slug}`;
  const pageUrl = `${siteUrl}${route}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedOn,
    dateModified: guide.publishedOn,
    mainEntityOfPage: pageUrl,
    articleSection: "DIY Pool Care",
    author: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.brand.name,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.brand.name,
      url: siteUrl,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "DIY Pool Care", item: `${siteUrl}/diy-pool-care` },
      { "@type": "ListItem", position: 3, name: guide.title, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <InternalHero
        eyebrow="DIY Pool Care Guide"
        title={guide.title}
        description={guide.description}
        primaryAction={{ label: "Browse DIY Pool Care", href: "/diy-pool-care" }}
        secondaryAction={{ label: guide.cta.label, href: guide.cta.href }}
        contentClassName="mx-auto text-center"
        descriptionClassName="mx-auto max-w-[52rem]"
        showDecorativeCircle={false}
      />

      <main>
        <section className="bg-white py-10 md:py-14">
          <div className="container-page">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "DIY Pool Care", href: "/diy-pool-care" },
                { label: guide.title },
              ]}
            />

            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
              <article className="rounded-[1.55rem] border border-line/80 bg-white p-6 shadow-[0_16px_36px_rgba(11,30,75,0.08)] md:p-8">
                <p className="section-label">Guide overview</p>
                <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-lg">{guide.summary}</p>
              </article>

              <aside className="rounded-[1.35rem] border border-line/75 bg-light-blue-soft/35 p-5 shadow-[0_12px_28px_rgba(11,30,75,0.07)]">
                <h2 className="text-lg font-semibold text-navy">In this guide</h2>
                <nav aria-label="Guide sections" className="mt-3">
                  <ul className="grid gap-2.5 text-sm leading-snug">
                    {guide.sections.map((section) => (
                      <li key={section.heading}>
                        <a href={`#${sectionId(section.heading)}`} className="focus-ring text-ink-muted underline decoration-navy/25 underline-offset-4 hover:text-navy hover:decoration-navy">
                          {section.heading}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href="#safety-boundaries" className="focus-ring text-ink-muted underline decoration-navy/25 underline-offset-4 hover:text-navy hover:decoration-navy">
                        {guide.safetyTitle}
                      </a>
                    </li>
                  </ul>
                </nav>
              </aside>
            </div>
          </div>
        </section>

        <article>
          {guide.sections.map((section, sectionIndex) => {
            const List = section.ordered ? "ol" : "ul";

            return (
              <section
                id={sectionId(section.heading)}
                key={section.heading}
                className={`scroll-mt-32 py-12 md:py-16 ${sectionIndex % 2 === 0 ? "bg-light-blue-soft/25" : "bg-white"}`}
              >
                <div className="container-page">
                  <div className="mx-auto max-w-5xl">
                    <p className="section-label">{section.ordered ? "Decision sequence" : "What to consider"}</p>
                    <h2 className="mt-3 text-balance font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.028em] text-navy md:text-[3rem]">
                      {section.heading}
                    </h2>
                    <p className="mt-4 max-w-4xl text-base leading-relaxed text-ink-muted md:text-lg">{section.intro}</p>

                    <List className="mt-7 grid gap-4 md:grid-cols-2">
                      {section.points.map((point, pointIndex) => (
                        <li key={point.title} className="relative rounded-[1.25rem] border border-line/75 bg-white p-5 shadow-[0_12px_28px_rgba(11,30,75,0.07)] md:p-6">
                          {section.ordered ? (
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white" aria-hidden="true">
                              {pointIndex + 1}
                            </span>
                          ) : (
                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-pink" aria-hidden="true" />
                          )}
                          <h3 className={`${section.ordered ? "mt-4" : "mt-3"} text-lg font-semibold leading-tight text-navy`}>
                            {point.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">{point.body}</p>
                        </li>
                      ))}
                    </List>
                  </div>
                </div>
              </section>
            );
          })}
        </article>

        <section id="safety-boundaries" className="scroll-mt-32 bg-white py-12 md:py-16">
          <div className="container-page">
            <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-pink/35 bg-[linear-gradient(145deg,#fffafd_0%,#f7fbff_100%)] p-6 shadow-[0_16px_34px_rgba(11,30,75,0.08)] md:p-8">
              <p className="section-label">Important boundaries</p>
              <h2 className="mt-3 text-balance font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.025em] text-navy md:text-[2.65rem]">
                {guide.safetyTitle}
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-relaxed text-ink-muted md:text-lg">{guide.safetyBody}</p>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {guide.safetyPoints.map((point) => (
                  <li key={point} className="flex gap-3 rounded-[1rem] border border-line/65 bg-white px-4 py-4 text-sm leading-relaxed text-ink-muted md:text-base">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-light-blue-soft/25 py-12 md:py-16">
          <div className="container-page">
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
              <article className="rounded-[1.35rem] border border-line/75 bg-white p-6 shadow-[0_14px_30px_rgba(11,30,75,0.08)]">
                <h2 className="text-balance text-2xl font-extrabold text-navy">Related DIY guides</h2>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {guide.relatedGuideLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="focus-ring inline-flex rounded-full border border-line bg-light-blue-soft/55 px-3 py-2 text-sm font-medium text-navy transition hover:border-navy/25 hover:bg-light-blue-soft">
                      {link.label}
                    </Link>
                  ))}
                </div>
                <Link href="/diy-pool-care" className="link-inline mt-5 inline-flex text-sm focus-ring">
                  Browse all DIY Pool Care resources →
                </Link>
              </article>

              <article className="rounded-[1.35rem] border border-line/75 bg-white p-6 shadow-[0_14px_30px_rgba(11,30,75,0.08)]">
                <h2 className="text-balance text-2xl font-extrabold text-navy">Related professional services</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">Use these hiring-intent pages when the condition is beyond safe routine DIY care.</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {guide.serviceLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="focus-ring inline-flex rounded-full border border-line bg-white px-3 py-2 text-sm font-medium text-navy transition hover:border-navy/25 hover:bg-light-blue-soft/40">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="container-page py-14 md:py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.6rem] border border-[#9bc8df]/35 bg-[#06153a] px-7 py-10 text-center text-white shadow-[0_30px_62px_rgba(5,18,46,0.3)] md:px-12 md:py-14">
            <h2 className="text-balance font-sans text-[2rem] font-extrabold leading-[0.94] tracking-[-0.025em] md:text-[3rem]">{guide.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">{guide.cta.body}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href={guide.cta.href} className="btn-hero-primary focus-ring">{guide.cta.label}</Link>
              <Link href="/contact" className="btn-hero-secondary focus-ring">Request a Quote</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
