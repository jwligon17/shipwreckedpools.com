import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { InternalHero } from "@/components/internal-hero";
import type { Service } from "@/content/site";
import { site } from "@/content/site";

const reviewItems = [
  ["Water chemistry", "A pool chemical check to understand the readings present at the visit."],
  ["Water condition", "Clarity, color, and visible sanitation concerns in the pool water."],
  ["Circulation", "Visible signs of how water is moving through the pool."],
  ["Filtration", "Observable filter condition and performance concerns without equipment disassembly."],
  ["Equipment pad", "The visible condition of accessible pool equipment and connections."],
  ["Visible leaks & wear", "Obvious leaks, deterioration, or wear that can be seen during the review."],
  ["General pool condition", "Visible pool-condition concerns and items worth monitoring."],
] as const;

const usefulScenarios = [
  "You are unsure whether the pool is operating normally.",
  "You are buying a home or inheriting responsibility for a pool.",
  "Chemistry or water clarity problems keep returning.",
  "Equipment sounds or looks different than it used to.",
  "You want a professional second opinion.",
  "You want to understand the pool before considering service or repairs.",
] as const;

const exclusions = [
  "Equipment disassembly",
  "Pressure testing",
  "Electrical diagnosis",
  "Leak detection",
  "Repair labor",
  "Destructive testing",
  "A guaranteed diagnosis of hidden or internal equipment failures",
] as const;

function ReviewCta({ label, placement }: { label: string; placement: string }) {
  return (
    <Link
      href="/contact"
      data-analytics-service-cta="ship-shape-pool-review"
      data-analytics-placement={placement}
      className="btn-hero-primary focus-ring"
    >
      {label}
    </Link>
  );
}

export function ShipShapeReviewPage({ service }: { service: Service }) {
  return (
    <>
      <InternalHero
        eyebrow="Free One-Time Pool Review"
        title={service.seoH1 ?? service.name}
        description="We review your pool, water, and visible equipment condition, then give you a clear summary of what looks good, what deserves attention, and what can wait."
        contentClassName="mx-auto text-center"
        descriptionClassName="mx-auto max-w-[46rem]"
        showDecorativeCircle={false}
      >
        <div className="flex flex-wrap justify-center gap-3.5">
          <ReviewCta label="Schedule My Free Review" placement="ship_shape_hero" />
          <Link href={site.ctas.textUs.href} className="btn-hero-secondary focus-ring">Text Us</Link>
        </div>
      </InternalHero>

      <section className="bg-white py-12 md:py-16">
        <div className="container-page">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Ship-Shape Pool Review" },
            ]}
          />
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
            <div>
              <p className="section-label">A clearer view of your pool</p>
              <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3rem]">
                What is a Ship-Shape Pool Review?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
                It is a completely free, one-time onsite pool health and visible equipment review for any homeowner or property within our service area. You do not need to be a current customer or be considering recurring service.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                The review gives you a practical professional perspective without turning the visit into a repair diagnosis or a hard sales conversation.
              </p>
            </div>
            <article className="rounded-[1.5rem] border border-line/80 bg-light-blue-soft/35 p-6 shadow-[0_16px_34px_rgba(11,30,75,0.08)] md:p-8">
              <h3 className="text-xl font-semibold text-navy">When a review can help</h3>
              <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-ink-muted md:text-base">
                {usefulScenarios.map((item) => (
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
            <p className="section-label justify-center">Onsite observations</p>
            <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3.1rem]">
              What We Look At
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              The review is a visual pool maintenance assessment focused on the conditions we can observe safely during the visit.
            </p>
          </div>
          <div className="mx-auto mt-9 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviewItems.map(([title, description]) => (
              <article key={title} className="rounded-[1.25rem] border border-line/75 bg-white p-5 shadow-[0_12px_26px_rgba(11,30,75,0.07)]">
                <h3 className="text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-18">
        <div className="container-page">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            <article className="rounded-[1.5rem] border border-line/75 bg-white p-6 shadow-[0_16px_34px_rgba(11,30,75,0.08)] md:p-8">
              <p className="section-label">After the visit</p>
              <h2 className="mt-3 text-balance font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.025em] text-navy md:text-[2.6rem]">
                What You Receive
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                If you would like to be present, you can meet the technician onsite for a walkthrough. After the review, you receive a customer summary that includes:
              </p>
              <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-ink-muted md:text-base">
                {["An overall Ship-Shape result", "Item-by-item observations", "Prioritized recommendations and watch items", "Clear notes on what looks good, what deserves attention, and what can wait"].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-navy" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-[1.5rem] border border-line/75 bg-[#071a47] p-6 text-white shadow-[0_18px_38px_rgba(6,18,46,0.18)] md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-light-blue">Clear scope</p>
              <h2 className="mt-3 text-balance font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.025em] md:text-[2.6rem]">
                What It Does Not Include
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/82">
                This is a visible condition review, not invasive testing or repair work. A separate specialist or service visit may be needed to investigate concerns that cannot be confirmed visually.
              </p>
              <ul className="mt-5 grid gap-x-6 gap-y-3 text-sm leading-relaxed text-white/82 sm:grid-cols-2">
                {exclusions.map((item) => (
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
          <div className="mx-auto max-w-5xl text-center">
            <p className="section-label justify-center">Local, professional pool care</p>
            <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3.1rem]">
              Why Shipwrecked Pools
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              Shipwrecked Pools serves Abilene and nearby supported communities with professional pool care, clear communication, and documented observations. Our service culture is built around helping homeowners understand what was seen and what practical next steps may be worth considering.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/services" className="btn-subtle focus-ring">Explore all pool services</Link>
              <Link href="/services/weekly-services" className="btn-subtle focus-ring">Learn about weekly pool service</Link>
              <Link href="/locations" className="btn-subtle focus-ring">Check our service areas</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-18">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="section-label justify-center">Common questions</p>
              <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3.1rem]">
                Ship-Shape Pool Review FAQ
              </h2>
            </div>
            <div className="mt-8 grid gap-4">
              {service.faqs.map((faq) => (
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
          <h2 className="text-balance font-sans text-[2rem] font-extrabold leading-[0.94] tracking-[-0.025em] md:text-[3rem]">
            Schedule My Free Ship-Shape Pool Review
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Tell us your service address and a little about your pool. We will confirm that the property is within our service area and coordinate the onsite review.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ReviewCta label="Schedule My Free Review" placement="ship_shape_final_cta" />
            <Link href={site.ctas.textUs.href} className="btn-hero-secondary focus-ring">Text Us</Link>
          </div>
          <p className="mt-4 text-sm text-white/70">Free once per homeowner and property. No recurring-service commitment required.</p>
        </div>
      </section>
    </>
  );
}
