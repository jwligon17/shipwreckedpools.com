import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { InternalHero } from "@/components/internal-hero";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Pool Service Reports & Picture Proof | Shipwrecked Pools Abilene" },
  description:
    "See how Shipwrecked Pools documents weekly pool service with photos, water readings, chemical details, service notes, and equipment observations in Abilene.",
  alternates: { canonical: "/pool-service-reports" },
};

const reportDetails = [
  {
    title: "Service Photos",
    body: "Visual documentation from the visit where photos are applicable and captured.",
  },
  {
    title: "Water Readings",
    body: "Recorded chemistry readings that help explain the water condition found during service.",
  },
  {
    title: "Chemicals Added",
    body: "Chemical additions can be documented so you have clearer context about the visit.",
  },
  {
    title: "Work Completed",
    body: "Service tasks can be recorded instead of leaving you with an unexplained visit.",
  },
  {
    title: "Equipment Observations",
    body: "Visible issues or concerns noticed by the technician can be called to your attention.",
  },
  {
    title: "Service Notes",
    body: "Useful technician notes can add context about pool condition and practical next steps.",
  },
  {
    title: "Arrival Time",
    body: "The recorded arrival time helps establish when the documented service visit began.",
  },
  {
    title: "Departure Time",
    body: "The recorded departure time helps show when the documented service visit was completed.",
  },
] as const;

const questionsWithoutDocumentation = [
  "What did the water test at?",
  "Were any chemicals added?",
  "What work was completed?",
  "Did the technician notice an equipment concern?",
  "What did the pool look like after service?",
] as const;

const communicationBenefits = [
  ["Unusual water conditions", "Recorded readings and notes help explain what the technician found during the visit."],
  ["Equipment concerns", "Visible issues can be communicated early so you can understand the concern and discuss an appropriate next step."],
  ["Chemical usage", "Documented chemical additions provide context for the service performed without turning the report into a sales pitch."],
  ["Developing maintenance needs", "Consistent observations can make changes easier to discuss before they become a bigger surprise."],
  ["Homeowner questions", "Photos and written details give you a clearer starting point when you want to ask about the pool."],
] as const;

const faqs = [
  {
    question: "What is included in a pool service report?",
    answer:
      "An After Service Pool Report can include completed service tasks, chemistry readings, chemical additions, service photos, equipment observations, and technician notes. The details shown depend on what was recorded during that visit.",
  },
  {
    question: "Do you take photos during pool service?",
    answer:
      "Service photos can be included when they are applicable and captured during the visit. They provide visual context about the pool condition and completed service.",
  },
  {
    question: "Can I see what chemicals were added?",
    answer:
      "When chemical additions are recorded during service, those details can appear in the report alongside the visit's chemistry readings and notes.",
  },
  {
    question: "Will you let me know if you notice an equipment problem?",
    answer:
      "Shipwrecked communicates visible equipment issues or concerns noticed during service and explains practical next steps. A service observation is not a substitute for specialized diagnosis when further investigation is needed.",
  },
  {
    question: "Do I need to be home when my pool is serviced?",
    answer:
      "You generally do not need to be home as long as safe pool access has been arranged. The after-service report helps you understand the visit when you are away.",
  },
  {
    question: "How do service reports help if I'm away from home?",
    answer:
      "The report gives you written and visual context about the visit so you are not left wondering what was completed, what the technician observed, or what may need attention.",
  },
  {
    question: "Are service reports included with weekly service?",
    answer:
      "Yes. Weekly-service customers receive an After Service Pool Report after each visit as part of Shipwrecked Pools' recurring service communication.",
  },
] as const;

export default function PoolServiceReportsPage() {
  const pageUrl = `${siteUrl}/pool-service-reports`;
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    name: "Pool Service Reports & Picture Proof",
    description: metadata.description,
    url: pageUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Pool Service Reports & Picture Proof", item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <InternalHero
        eyebrow="See What Happened at Your Pool"
        title="Pool Service Reports & Picture Proof"
        description="Professional pool service should not leave you wondering whether someone came, what they found, or what was added to your water. You should know what happened at your pool after we leave."
        contentClassName="mx-auto text-center"
        descriptionClassName="mx-auto max-w-[50rem]"
        showDecorativeCircle={false}
      >
        <div className="flex flex-wrap justify-center gap-3.5">
          <Link
            href="/contact"
            data-analytics-service-cta="weekly-services"
            data-analytics-placement="service_reports_hero"
            className="btn-hero-primary focus-ring"
          >
            Get a Weekly Service Quote
          </Link>
          <Link
            href="/services/weekly-services"
            data-analytics-service-cta="weekly-services"
            data-analytics-placement="service_reports_hero"
            className="btn-hero-secondary focus-ring"
          >
            See Weekly Pool Service
          </Link>
        </div>
      </InternalHero>

      <section className="bg-white py-12 md:py-16">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pool Service Reports" }]} />
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-12">
            <div>
              <p className="section-label">Clear communication after service</p>
              <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3rem]">
                You Shouldn&apos;t Have to Guess
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
                Pool service often happens while the homeowner is at work, traveling, or handling the rest of the day. Without useful documentation, it can be difficult to know what happened in the backyard.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                Shipwrecked uses after-service reporting to give weekly-service customers a clearer view of the visit, the pool&apos;s condition, and observations worth knowing about.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                That record is useful for homeowners, remote owners, and property managers who need practical service communication without being onsite for every visit.
              </p>
            </div>
            <article className="rounded-[1.5rem] border border-line/80 bg-light-blue-soft/35 p-6 shadow-[0_16px_34px_rgba(11,30,75,0.08)] md:p-8">
              <h3 className="text-xl font-semibold text-navy">Questions a service report helps answer</h3>
              <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-ink-muted md:text-base">
                {questionsWithoutDocumentation.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-light-blue-soft/25 py-14 md:py-18">
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-label justify-center">Useful details from the visit</p>
            <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3.1rem]">
              What Your Service Report Can Show
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              Report details reflect what is applicable and recorded during that service visit. The goal is practical visibility, not a technical dashboard.
            </p>
          </div>
          <div className="mx-auto mt-9 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reportDetails.map((detail, index) => (
              <article key={detail.title} className="relative overflow-hidden rounded-[1.3rem] border border-line/75 bg-white p-5 shadow-[0_12px_26px_rgba(11,30,75,0.07)]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">{index + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-navy">{detail.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{detail.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-18">
        <div className="container-page">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            <article className="rounded-[1.5rem] border border-line/75 bg-[#071a47] p-6 text-white shadow-[0_18px_38px_rgba(6,18,46,0.18)] md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-light-blue">Visual context when applicable</p>
              <h2 className="mt-3 text-balance font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.025em] md:text-[2.6rem]">Picture Proof</h2>
              <p className="mt-4 text-base leading-relaxed text-white/82">
                Service photos can show the visible pool condition during or after a visit. That context is especially useful when you are away from home or when a concern is easier to explain with an image than with a short message.
              </p>
              <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-white/82 md:text-base">
                {["A visual point of reference from the visit", "More visibility while you are away", "Clearer follow-up when a concern appears", "Better context for homeowner questions"].map((item) => (
                  <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink" aria-hidden="true" /><span>{item}</span></li>
                ))}
              </ul>
            </article>
            <article className="rounded-[1.5rem] border border-line/75 bg-white p-6 shadow-[0_16px_34px_rgba(11,30,75,0.08)] md:p-8">
              <p className="section-label">We want you informed</p>
              <h2 className="mt-3 text-balance font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.025em] text-navy md:text-[2.6rem]">Better Communication, Fewer Surprises</h2>
              <div className="mt-5 grid gap-4">
                {communicationBenefits.map(([title, body]) => (
                  <div key={title} className="border-l-2 border-light-blue pl-4">
                    <h3 className="font-semibold text-navy">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-line/75 pt-5 text-sm leading-relaxed text-ink-muted md:text-base">
                These reports document routine service and visible observations. They are not regulatory or code-compliance inspections, engineering reports, repair diagnoses, or a guarantee that every developing issue will be detected.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-light-blue-soft/25 py-14 md:py-18">
        <div className="container-page">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.6rem] border border-line/75 bg-white p-7 text-center shadow-[0_18px_38px_rgba(11,30,75,0.09)] md:p-10">
            <p className="section-label justify-center">Part of recurring professional care</p>
            <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3rem]">What This Means for Weekly Service</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              Weekly service is more than a cleaned pool. It also gives you visibility into what was completed, what the water showed, and what your technician noticed. Weekly-service customers receive an After Service Pool Report after each visit.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact" data-analytics-service-cta="weekly-services" data-analytics-placement="service_reports_weekly_cta" className="btn-primary focus-ring">Get a Weekly Service Quote</Link>
              <Link href="/services/weekly-services" data-analytics-service-cta="weekly-services" data-analytics-placement="service_reports_weekly_cta" className="btn-subtle focus-ring">Explore Weekly Pool Service</Link>
              <Link href="/services/short-term-rental-pool-hot-tub-cleaning" className="btn-subtle focus-ring">Short-Term Rental Service</Link>
              <Link href="/services/hotel-apartment-pool-cleaning" className="btn-subtle focus-ring">Hotel & Apartment Service</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-18">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="section-label justify-center">Common questions</p>
              <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3.1rem]">Pool Service Report FAQ</h2>
            </div>
            <div className="mt-8 grid gap-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-[1.15rem] border border-line/75 bg-white px-5 py-5 shadow-[0_10px_24px_rgba(11,30,75,0.06)]">
                  <h3 className="text-base font-semibold text-navy md:text-lg">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.6rem] border border-[#9bc8df]/35 bg-[#06153a] px-7 py-10 text-center text-white shadow-[0_30px_62px_rgba(5,18,46,0.3)] md:px-12 md:py-14">
          <h2 className="text-balance font-sans text-[2rem] font-extrabold leading-[0.94] tracking-[-0.025em] md:text-[3rem]">Pool care with clear follow-through</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">Request a weekly-service quote and tell us about your pool, service address, and current concerns.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/contact" data-analytics-service-cta="weekly-services" data-analytics-placement="service_reports_final_cta" className="btn-hero-primary focus-ring">Get a Weekly Service Quote</Link>
            <Link href={site.ctas.textUs.href} className="btn-hero-secondary focus-ring">Text Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
