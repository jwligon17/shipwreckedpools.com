import Link from "next/link";

import { site } from "@/content/site";

export function Footer() {
  const footerExploreLinks = site.navigation.filter((item) => item.label !== "About");

  return (
    <footer className="border-t border-line bg-navy text-white">
      <div className="border-b border-white/15">
        <div className="container-page flex flex-wrap items-center gap-3 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-light-blue">
          <p>100% money-back guarantee</p>
        </div>
      </div>
      <div className="container-page grid gap-10 py-14 md:grid-cols-4 md:py-16">
        <div className="space-y-3 md:col-span-2">
          <p className="font-serif text-4xl leading-none text-white">{site.brand.name}</p>
          <p className="max-w-lg text-sm leading-relaxed text-white/85">{site.brand.description}</p>
          <div className="flex flex-wrap gap-2.5 text-sm">
            <Link href={site.brand.phoneHref} className="btn-inverse focus-ring px-4 py-2">
              {site.ctas.callUs.label}
            </Link>
            <Link href={site.ctas.textUs.href} className="btn-inverse focus-ring px-4 py-2">
              {site.ctas.textUs.label}
            </Link>
            <Link href="/pay-now" className="btn-subtle focus-ring px-4 py-2">
              {site.ctas.payNow.label}
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-light-blue">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {footerExploreLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/88 underline decoration-pink underline-offset-4 hover:text-white hover:decoration-pink focus-ring">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/pay-now" className="text-white/88 underline decoration-pink underline-offset-4 hover:text-white hover:decoration-pink focus-ring">
                {site.ctas.payNow.label}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-light-blue">Trust</p>
          {site.guarantees.map((item) => (
            <p key={item} className="text-sm text-white/85">
              {item}
            </p>
          ))}
          <p className="mt-4 text-sm leading-relaxed text-white/72">Service Area: {site.brand.market}</p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-page py-5 text-xs text-white/65">
          © {new Date().getFullYear()} {site.brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
