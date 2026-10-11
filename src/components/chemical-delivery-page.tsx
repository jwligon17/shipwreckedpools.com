import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChemicalDeliveryForm } from "@/components/chemical-delivery-form";
import { InternalHero } from "@/components/internal-hero";
import type { Service } from "@/content/site";
import { site } from "@/content/site";

const products = [
  ["Chlorine Tabs", "25 lb or 50 lb"],
  ["Pool Shock", "25 lb, 50 lb, or 100 lb"],
  ["Liquid Chlorine", "Case — 4 gallons"],
  ["Muriatic Acid", "Case — 4 gallons"],
  ["Sodium Bicarbonate", "30 lb bag"],
  ["Pool Salt", "40 lb bag"],
] as const;

const steps = [
  ["Tell us what you need", "Choose each chemical, package size, and quantity in one request."],
  ["We confirm the details", "We check product availability, price, and expected delivery timing."],
  ["Pay after confirmation", "We send an invoice or payment link after confirming your request."],
  ["We deliver for free", "We bring the confirmed products to the requested location with no delivery fee."],
] as const;

export function ChemicalDeliveryPage({ service }: { service: Service }) {
  return (
    <>
      <InternalHero
        eyebrow="Pool Chemicals Delivered"
        title={service.seoH1 ?? service.name}
        description="You pay for the chemicals. We deliver them for free. Choose what you need, send your request, and we will confirm availability and pricing before fulfillment."
        contentClassName="mx-auto text-center"
        descriptionClassName="mx-auto max-w-[49rem]"
        showDecorativeCircle={false}
      >
        <div className="flex flex-wrap justify-center gap-3.5">
          <Link href="#chemical-delivery-request" className="btn-hero-primary focus-ring">Request Chemical Delivery</Link>
          <Link href={site.ctas.textUs.href} className="btn-hero-secondary focus-ring">Text Us</Link>
        </div>
      </InternalHero>

      <section className="bg-white py-12 md:py-16">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Free Pool Chemical Delivery" }]} />
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-label justify-center">Simple request, confirmed before fulfillment</p>
            <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3.1rem]">How It Works</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, description], index) => (
              <article key={title} className="rounded-[1.3rem] border border-line/75 bg-light-blue-soft/30 p-5 shadow-[0_12px_26px_rgba(11,30,75,0.07)]">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">{index + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light-blue-soft/25 py-14 md:py-18">
        <div className="container-page">
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-label justify-center">Available by request</p>
            <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3.1rem]">Available Pool Chemicals</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">Request one product or several. Pricing is confirmed after we receive your request because product costs and availability can change.</p>
          </div>
          <div className="mx-auto mt-9 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(([name, sizes]) => (
              <article key={name} className="rounded-[1.25rem] border border-line/75 bg-white p-5 shadow-[0_12px_26px_rgba(11,30,75,0.07)]">
                <h3 className="text-lg font-semibold text-navy">{name}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-ink-muted">{sizes}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-18">
        <div className="container-page">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            <article className="rounded-[1.5rem] border border-line/75 bg-[#071a47] p-6 text-white shadow-[0_18px_38px_rgba(6,18,46,0.18)] md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-light-blue">$0 delivery fee</p>
              <h2 className="mt-3 text-balance font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.025em] md:text-[2.6rem]">The chemicals are purchased. Delivery is free.</h2>
              <p className="mt-4 text-base leading-relaxed text-white/82">Free delivery is available to anyone within Shipwrecked Pools&apos; normal service area. You do not need to be an existing pool-service customer, and one-time or repeat requests are welcome.</p>
              <p className="mt-4 text-base leading-relaxed text-white/82">Same-day or next-day delivery is available in many cases, subject to product availability and route scheduling.</p>
            </article>
            <article className="rounded-[1.5rem] border border-line/75 bg-white p-6 shadow-[0_16px_34px_rgba(11,30,75,0.08)] md:p-8">
              <p className="section-label">Helpful placement details</p>
              <h2 className="mt-3 text-balance font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.025em] text-navy md:text-[2.6rem]">Delivery Instructions</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">Use the private request form to tell us where to leave the products and how to access the property. Helpful notes can include:</p>
              <ul className="mt-5 grid grid-cols-2 gap-3 text-sm leading-relaxed text-ink-muted md:text-base">
                {["Side gate", "Equipment pad", "Porch", "Gate or access instructions", "Other placement notes", "Delivery preferences"].map((item) => (
                  <li key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-pink" aria-hidden="true" /><span>{item}</span></li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">Submitted delivery instructions are sent with your request and are not displayed publicly.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-light-blue-soft/25 py-14 md:py-18">
        <div className="container-page">
          <div className="mx-auto max-w-5xl"><ChemicalDeliveryForm /></div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-18">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="section-label justify-center">Common questions</p>
              <h2 className="mt-3 text-balance font-sans text-[2.1rem] font-extrabold leading-[0.94] tracking-[-0.03em] text-navy md:text-[3.1rem]">Pool Chemical Delivery FAQ</h2>
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
          <h2 className="text-balance font-sans text-[2rem] font-extrabold leading-[0.94] tracking-[-0.025em] md:text-[3rem]">Not sure what your pool needs?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">Schedule a free Ship-Shape Pool Review for an onsite look at your pool, water, and visible equipment. A review is helpful when professional guidance is needed, but it is not required to request chemicals.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/services/ship-shape-pool-review" className="btn-hero-primary focus-ring">Schedule a Free Pool Review</Link>
            <Link href="/locations" className="btn-hero-secondary focus-ring">Check Our Service Areas</Link>
          </div>
        </div>
      </section>
    </>
  );
}
