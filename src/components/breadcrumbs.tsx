import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-7 md:mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-soft">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="focus-ring rounded-sm transition hover:text-navy">
                  {item.label}
                </Link>
              ) : (
                <span className="text-navy/75">{item.label}</span>
              )}
              {!isLast ? <span aria-hidden="true" className="text-pink/90">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
