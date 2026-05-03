import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 focus-ring">
          <Image src="/images/logo-mark.svg" alt="Shipwrecked Pools" width={36} height={36} />
          <div>
            <p className="font-serif text-xl leading-none text-navy">Shipwrecked Pools</p>
            <p className="text-xs tracking-[0.15em] text-ink-soft uppercase">Abilene, TX</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {site.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-ink-muted transition hover:text-navy focus-ring">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={site.ctas.textUs.href} className="btn-secondary hidden px-4 py-2 md:inline-flex focus-ring">
            Text Us
          </Link>
          <Link href={site.ctas.primary.href} className="btn-primary px-4 py-2 focus-ring">
            {site.ctas.primary.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
