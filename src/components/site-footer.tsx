import Link from "next/link";

import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-navy text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="space-y-3">
          <p className="font-serif text-2xl text-white">{site.brand.name}</p>
          <p className="text-sm text-white/80">{site.brand.market}</p>
          <p className="text-sm text-white/80">Call or Text: {site.brand.phone}</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-light-blue">Explore</p>
          <ul className="space-y-2">
            {site.navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/88 underline decoration-pink underline-offset-4 hover:text-white hover:decoration-pink focus-ring">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="https://shipwreckedpools.mypoolportal.com/auth/sign-in" className="text-sm text-white/88 underline decoration-pink underline-offset-4 hover:text-white hover:decoration-pink focus-ring">
                Pay Now
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-light-blue">Guarantee</p>
          {site.guarantees.map((item) => (
            <p key={item} className="text-sm text-white/85">{item}</p>
          ))}
          <p className="mt-4 text-xs text-white/65">
            © {new Date().getFullYear()} Shipwrecked Pools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
