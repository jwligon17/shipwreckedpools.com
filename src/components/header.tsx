"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

function UtilitySocialIcon({ id }: { id: "google" | "facebook" | "tiktok" | "instagram" }) {
  if (id === "google") {
    return (
      <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" aria-hidden="true">
        <path
          d="M21.6 12.23c0-.7-.06-1.37-.17-2.02H12v3.83h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.97-4.35 2.97-7.33Z"
          fill="currentColor"
        />
        <path
          d="M12 22c2.7 0 4.96-.9 6.61-2.44l-3.24-2.5c-.9.6-2.05.97-3.37.97-2.59 0-4.78-1.75-5.57-4.1H3.08v2.58A9.98 9.98 0 0 0 12 22Z"
          fill="currentColor"
        />
        <path
          d="M6.43 13.93A6 6 0 0 1 6.1 12c0-.67.12-1.3.33-1.93V7.49H3.08A10 10 0 0 0 2 12c0 1.62.39 3.15 1.08 4.51l3.35-2.58Z"
          fill="currentColor"
        />
        <path
          d="M12 5.97c1.47 0 2.78.5 3.81 1.5l2.86-2.86A9.98 9.98 0 0 0 12 2a10 10 0 0 0-8.92 5.49l3.35 2.58c.79-2.35 2.98-4.1 5.57-4.1Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.76 22v-8.87h2.98l.45-3.45h-3.43V7.47c0-1 .28-1.68 1.71-1.68h1.83V2.7a24.8 24.8 0 0 0-2.66-.13c-2.63 0-4.44 1.61-4.44 4.56v2.55H7.22v3.45h2.98V22h3.56Z"
        />
      </svg>
    );
  }

  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 7.05A4.95 4.95 0 1 0 12 16.95 4.95 4.95 0 1 0 12 7.05Zm0 8.18A3.23 3.23 0 1 1 12 8.77a3.23 3.23 0 0 1 0 6.46Z"
        />
        <path
          fill="currentColor"
          d="M18.3 6.95a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z"
        />
        <path
          fill="currentColor"
          d="M12 2c-2.72 0-3.06.01-4.12.06-1.05.05-1.76.22-2.39.47a4.8 4.8 0 0 0-1.74 1.13A4.8 4.8 0 0 0 2.62 5.4c-.25.63-.42 1.34-.47 2.39C2.1 8.84 2.09 9.18 2.09 11.9s.01 3.06.06 4.12c.05 1.05.22 1.76.47 2.39.25.64.6 1.18 1.13 1.74a4.8 4.8 0 0 0 1.74 1.13c.63.25 1.34.42 2.39.47 1.06.05 1.4.06 4.12.06s3.06-.01 4.12-.06c1.05-.05 1.76-.22 2.39-.47a4.8 4.8 0 0 0 1.74-1.13 4.8 4.8 0 0 0 1.13-1.74c.25-.63.42-1.34.47-2.39.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.05-.22-1.76-.47-2.39a4.8 4.8 0 0 0-1.13-1.74 4.8 4.8 0 0 0-1.74-1.13c-.63-.25-1.34-.42-2.39-.47C15.06 2.01 14.72 2 12 2Zm0 1.72c2.68 0 3 .01 4.04.06.97.04 1.5.2 1.85.34.47.18.81.4 1.16.75.35.35.57.69.75 1.16.14.35.3.88.34 1.85.05 1.04.06 1.36.06 4.04s-.01 3-.06 4.04c-.04.97-.2 1.5-.34 1.85-.18.47-.4.81-.75 1.16-.35.35-.69.57-1.16.75-.35.14-.88.3-1.85.34-1.04.05-1.36.06-4.04.06s-3-.01-4.04-.06c-.97-.04-1.5-.2-1.85-.34a3.09 3.09 0 0 1-1.16-.75 3.09 3.09 0 0 1-.75-1.16c-.14-.35-.3-.88-.34-1.85-.05-1.04-.06-1.36-.06-4.04s.01-3 .06-4.04c.04-.97.2-1.5.34-1.85.18-.47.4-.81.75-1.16.35-.35.69-.57 1.16-.75.35-.14.88-.3 1.85-.34 1.04-.05 1.36-.06 4.04-.06Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.8 3.5c.58 1.22 1.53 2.2 2.74 2.8.9.45 1.87.7 2.86.72v3.08a8.6 8.6 0 0 1-2.84-.48v5.4a6.03 6.03 0 1 1-6.03-6.03c.18 0 .35 0 .52.03v3.1a2.97 2.97 0 1 0 2.75 2.95V3.5h0Z"
      />
    </svg>
  );
}

const DESIGNED_PUBLIC_ROUTE_PREFIXES = ["/services/", "/locations/", "/blog/"];
const DESIGNED_PUBLIC_ROUTES = new Set([
  "/",
  "/about",
  "/services",
  "/locations",
  "/diy-pool-care",
  "/blog",
  "/careers",
  "/contact",
  "/pages/free-estimate-pool-skimmer-giveaway",
]);

function isDesignedPublicRoute(pathname: string | null) {
  if (!pathname) {
    return false;
  }

  const normalizedPath = pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
  if (DESIGNED_PUBLIC_ROUTES.has(normalizedPath)) {
    return true;
  }

  return DESIGNED_PUBLIC_ROUTE_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix));
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const utilitySocialLinks = site.socialLinks.filter((link) => link.enabled);
  const usesOverlayNav = useMemo(() => isDesignedPublicRoute(pathname), [pathname]);
  const [navIsSolid, setNavIsSolid] = useState(!usesOverlayNav);
  const rafRef = useRef<number | null>(null);
  const navSolidRef = useRef(navIsSolid);

  useEffect(() => {
    setNavIsSolid((current) => {
      const next = !usesOverlayNav || window.scrollY > 160;
      navSolidRef.current = next;
      return current === next ? current : next;
    });
  }, [usesOverlayNav]);

  useEffect(() => {
    function updateNavState() {
      if (rafRef.current !== null) {
        return;
      }
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const next = !usesOverlayNav || window.scrollY > 160;
        if (navSolidRef.current === next) {
          return;
        }
        navSolidRef.current = next;
        setNavIsSolid(next);
      });
    }

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateNavState);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [usesOverlayNav]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname?.startsWith(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[70]" data-header-stack="fixed">
      <div className="border-b border-navy/10 bg-white text-navy">
        <div className="container-page flex h-[var(--utility-bar-height)] flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[0.62rem] md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-3 md:text-[0.7rem]">
          <p className="font-medium text-navy/90 md:justify-self-start">{site.home.utilityMessage}</p>
          <div className="hidden items-center justify-center gap-2 md:flex" aria-label="Social media links">
            {utilitySocialLinks.map((socialLink) => (
              <Link
                key={socialLink.id}
                href={socialLink.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socialLink.ariaLabel}
                className="focus-ring inline-flex h-7 w-7 items-center justify-center rounded-full text-navy transition hover:text-pink active:text-navy-deep focus-visible:text-pink"
              >
                <UtilitySocialIcon id={socialLink.id} />
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 text-navy md:justify-self-end">
            <Link
              href={site.brand.phoneHref}
              className="focus-ring rounded-sm text-navy underline decoration-navy/45 underline-offset-4 transition hover:text-navy-deep hover:decoration-pink focus-visible:text-navy-deep focus-visible:decoration-pink"
            >
              Call {site.brand.phone}
            </Link>
            <span className="h-1 w-1 rounded-full bg-navy/55" aria-hidden="true" />
            <Link
              href={site.brand.textHref}
              className="focus-ring rounded-sm text-navy underline decoration-navy/45 underline-offset-4 transition hover:text-navy-deep hover:decoration-pink focus-visible:text-navy-deep focus-visible:decoration-pink"
            >
              {site.ctas.textUs.label}
            </Link>
          </div>
        </div>
      </div>

      <div
        data-scroll-state={navIsSolid ? "solid" : "overlay"}
        data-nav-state-source={usesOverlayNav ? "js-scroll-state" : "static"}
        className={cn(
          "border-none backdrop-blur-0",
          navIsSolid ? "solid-nav" : "home-scroll-nav",
        )}
      >
        <div className="container-page flex h-[var(--main-nav-height)] items-center gap-2 py-2.5 md:gap-3 md:py-2.5 lg:gap-4">
          <Link
            href="/"
            className="focus-ring flex shrink-0 items-center rounded-xl border border-transparent px-1.5 py-1 transition hover:border-white/20 hover:bg-white/[0.1] md:px-2 md:py-1.5 [--tw-ring-offset-color:var(--color-navy)]"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/images/logo.png?v=2"
              alt="Shipwrecked Pools"
              width={1200}
              height={450}
              priority
              unoptimized
              sizes="(max-width: 639px) 218px, (max-width: 1023px) 268px, 306px"
              className="block h-[3.15rem] w-auto object-contain sm:h-[3.35rem] md:h-[3.95rem] lg:h-[3.95rem] xl:h-[4.1rem]"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-2.5 lg:ml-auto lg:flex xl:gap-3">
            {site.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring group relative rounded-full border border-transparent px-2.5 py-1 text-[0.84rem] font-semibold text-white/[0.95] transition hover:border-light-blue/45 hover:bg-white/[0.12] hover:text-white [--tw-ring-offset-color:var(--color-navy)]",
                  isActive(item.href) && "border-light-blue/45 bg-white/[0.13] text-white",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 rounded-full bg-pink transition-all duration-300 group-hover:w-full group-hover:opacity-80",
                    isActive(item.href) ? "w-full bg-light-blue opacity-100" : "w-0 opacity-0",
                  )}
                  aria-hidden="true"
                />
              </Link>
            ))}
            <Link
              href="https://shipwreckedpools.mypoolportal.com/auth/sign-in"
              className={cn(
                "focus-ring group relative rounded-full border border-transparent px-2.5 py-1 text-[0.84rem] font-semibold text-white/[0.95] transition hover:border-light-blue/45 hover:bg-white/[0.12] hover:text-white [--tw-ring-offset-color:var(--color-navy)]",
                isActive("/pay-now") && "border-light-blue/45 bg-white/[0.13] text-white",
              )}
            >
              {site.ctas.payNow.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 rounded-full bg-pink transition-all duration-300 group-hover:w-full group-hover:opacity-80",
                  isActive("/pay-now") ? "w-full bg-light-blue opacity-100" : "w-0 opacity-0",
                )}
                aria-hidden="true"
              />
            </Link>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href={site.ctas.textUs.href}
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-white/65 bg-white/[0.08] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/90 hover:bg-white/[0.16] [--tw-ring-offset-color:var(--color-navy)]"
            >
              {site.ctas.textUs.label}
            </Link>
            <Link
              href={site.ctas.primary.href}
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-white bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-[0_10px_22px_rgba(6,20,51,0.3)] transition hover:-translate-y-0.5 hover:bg-light-blue-soft [--tw-ring-offset-color:var(--color-navy)]"
            >
              {site.ctas.primary.label}
            </Link>
          </div>

          <button
            type="button"
            className="focus-ring ml-auto inline-flex min-h-10 items-center justify-center rounded-full border border-light-blue/60 bg-light-blue/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-light-blue hover:bg-light-blue/20 [--tw-ring-offset-color:var(--color-navy)] lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            Menu
          </button>
        </div>

        {isOpen ? (
          <div id="mobile-menu" className="border-t border-light-blue/25 bg-navy-deep p-4 shadow-[0_12px_28px_rgba(8,22,58,0.4)] lg:hidden">
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {site.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "focus-ring rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-white/[0.95] hover:border-light-blue/40 hover:bg-white/10 hover:text-light-blue [--tw-ring-offset-color:var(--color-navy-deep)]",
                    isActive(item.href) && "border-light-blue/40 bg-white/10 text-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="https://shipwreckedpools.mypoolportal.com/auth/sign-in"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "focus-ring rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-white/[0.95] hover:border-light-blue/40 hover:bg-white/10 hover:text-light-blue [--tw-ring-offset-color:var(--color-navy-deep)]",
                  isActive("/pay-now") && "border-light-blue/40 bg-white/10 text-white",
                )}
              >
                {site.ctas.payNow.label}
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
