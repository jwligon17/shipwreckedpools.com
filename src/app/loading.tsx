export default function GlobalLoading() {
  return (
    <section className="container-page py-16 md:py-24" aria-live="polite" aria-busy="true">
      <div className="card mx-auto max-w-4xl">
        <div className="h-4 w-28 animate-pulse rounded bg-light-blue" />
        <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-light-blue-soft" />
        <div className="mt-3 h-4 w-full animate-pulse rounded bg-light-blue-soft" />
        <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-light-blue-soft" />
      </div>
    </section>
  );
}
