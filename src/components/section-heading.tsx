import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered,
  light,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4 md:space-y-5", centered && "text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.15em]",
            centered && "justify-center",
            light
              ? "border-white/35 bg-white/[0.06] text-light-blue"
              : "border-navy/15 bg-[linear-gradient(140deg,rgba(169,221,245,0.22),rgba(230,180,199,0.12))] text-navy",
          )}
        >
          <span className="h-2 w-2 rounded-full bg-pink" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-balance font-sans text-[clamp(2.05rem,5.1vw,3.9rem)] font-extrabold leading-[0.9] tracking-[-0.032em]",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-3xl text-[1rem] leading-relaxed md:text-[1.08rem]",
            centered && "mx-auto",
            light ? "text-white/85" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
