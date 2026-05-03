import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="card mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">404</p>
        <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">Page not found</h1>
        <p className="mt-4 text-ink-muted">
          The page you requested is unavailable. Use the links below to keep exploring Shipwrecked Pools.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary focus-ring">
            Back Home
          </Link>
          <Link href="/services" className="btn-secondary focus-ring">
            Browse Services
          </Link>
          <Link href="/contact" className="btn-subtle focus-ring">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
