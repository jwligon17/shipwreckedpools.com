import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { site } from "@/content/site";

function getExistingPublicImage(imagePath: string) {
  if (!imagePath.startsWith("/")) {
    return null;
  }

  // Drop final area photos into public/images using the paths above.
  const absolutePath = path.join(process.cwd(), "public", imagePath.slice(1));
  return existsSync(absolutePath) ? imagePath : null;
}

export function HomePoolAreaHighlightsSection() {
  const section = site.home.poolAreaHighlights;
  const cards = section.cards.map((card) => ({
    ...card,
    existingImage: getExistingPublicImage(card.imagePath),
  }));

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(160deg,#071332_0%,#0b1e4b_52%,#12326e_100%)] py-16 text-white md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(169,221,245,0.28),transparent_36%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_84%,rgba(230,180,199,0.13),transparent_32%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1150px_auto] bg-center opacity-[0.08]" aria-hidden="true" />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-balance font-sans text-[2.65rem] font-extrabold leading-[0.9] tracking-[-0.035em] text-white md:text-[4rem] lg:text-[5.1rem]">
            {section.title}
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-20 rounded-full bg-gradient-to-r from-light-blue/70 via-white/85 to-pink/70" aria-hidden="true" />
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-light-blue md:text-lg">{section.supportingLine}</p>
        </div>

        <div className="mt-11 grid gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const cardContent = (
              <article className="group relative aspect-[4/3] overflow-hidden rounded-[1.8rem] border border-white/18 bg-navy-deep/60 shadow-[0_18px_50px_rgba(3,10,30,0.55)] transition duration-300 hover:-translate-y-0.5 hover:border-light-blue/60 hover:shadow-[0_26px_64px_rgba(3,10,30,0.66)] focus-within:border-light-blue/60">
                <div className="absolute inset-0">
                  {card.existingImage ? (
                    <Image
                      src={card.existingImage}
                      alt={card.imageAlt}
                      fill
                      className="object-cover saturate-[0.94] transition duration-500 group-hover:scale-[1.06] group-focus-within:scale-[1.06]"
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
                      loading="lazy"
                      quality={76}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(150deg,#0f2760_0%,#0a1a45_56%,#1b438f_100%)] transition duration-500 group-hover:scale-[1.04] group-focus-within:scale-[1.04]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(169,221,245,0.24),transparent_34%)]" aria-hidden="true" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_90%,rgba(230,180,199,0.12),transparent_34%)]" aria-hidden="true" />
                      <div className="absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-cover bg-center opacity-[0.18]" aria-hidden="true" />
                      <div className="absolute -bottom-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full border border-light-blue/25 bg-light-blue/10 blur-[1px]" aria-hidden="true" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/22 bg-white/10 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white/86 backdrop-blur-sm">
                        {card.placeholderLabel ?? "Area Photo"}
                      </div>
                    </div>
                  )}
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,0.06)_0%,rgba(3,10,29,0.58)_54%,rgba(2,8,23,0.9)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(2,8,23,0.02)_0%,rgba(3,10,29,0.5)_52%,rgba(2,8,23,0.86)_100%)] group-focus-within:bg-[linear-gradient(180deg,rgba(2,8,23,0.02)_0%,rgba(3,10,29,0.5)_52%,rgba(2,8,23,0.86)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-pink/70 to-transparent opacity-70" aria-hidden="true" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-center font-serif text-[1.55rem] leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.52)] md:text-[1.9rem]">{card.title}</p>
                </div>
              </article>
            );

            if (!card.href) {
              return (
                <div key={card.title}>
                  {cardContent}
                </div>
              );
            }

            return (
              <Link key={card.title} href={card.href} aria-label={card.ariaLabel} className="focus-ring block rounded-[1.8rem]">
                {cardContent}
              </Link>
            );
          })}
        </div>

        <p className="mx-auto mt-10 flex w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-light-blue md:mt-12">
          {section.trailingText}
        </p>
      </div>
    </section>
  );
}
