"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { site } from "@/content/site";

export function MobileStickyCta() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-2">
        <Link href={site.ctas.textUs.href} className="btn-secondary focus-ring px-2 py-2 text-xs">
          {site.ctas.textUs.label}
        </Link>
        <Link href="https://shipwreckedpools.mypoolportal.com/auth/sign-in" className="btn-subtle focus-ring px-2 py-2 text-xs">
          {site.ctas.payNow.label}
        </Link>
        <Link href={site.ctas.primary.href} className="btn-primary focus-ring px-2 py-2 text-xs">
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
