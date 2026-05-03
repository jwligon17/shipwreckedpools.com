import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

import { InternalHero } from "@/components/internal-hero";

export const metadata = {
  title: "DIY Pool Care Cheat Sheet",
  description:
    "Download the free Shipwrecked Pools DIY pool care cheat sheet and keep your pool healthier between professional visits.",
};

function getExistingPublicImage(imagePath?: string) {
  if (!imagePath || !imagePath.startsWith("/")) {
    return null;
  }

  const absolutePath = path.join(process.cwd(), "public", imagePath.slice(1));
  return existsSync(absolutePath) ? imagePath : null;
}

export default function DiyPoolCarePage() {
  const heroVideo = getExistingPublicImage("/videos/services-hero.mp4");

  return (
    <>
      <InternalHero
        title="DIY Pool Care"
        description="Helpful pool-care guidance for homeowners who want more confidence between professional visits."
        backgroundVideoSrc={heroVideo ?? undefined}
        containerClassName="min-h-[clamp(19.5rem,48vh,25rem)] justify-center pb-6 pt-[calc(var(--header-stack-height)+1.05rem)] md:min-h-[clamp(21rem,45vh,23.5rem)] md:pb-8 md:pt-[calc(var(--header-stack-height)+1.3rem)]"
        contentClassName="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        titleClassName="text-[clamp(2rem,5vw,4rem)] leading-[0.92] sm:leading-[0.9]"
        descriptionClassName="mt-5 max-w-[43rem] text-[1.01rem] leading-relaxed md:text-lg"
        showDecorativeCircle={false}
      />

      <section className="bg-white">
        <div className="container-page section-shell py-14 md:py-20">
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            <article className="overflow-hidden rounded-[1.2rem] border border-line/70 bg-white shadow-[0_16px_34px_rgba(11,30,75,0.08)]">
              <Image
                src="/images/diy-cheat-sheet-side-a.png"
                alt="DIY pool care cheat sheet side A preview"
                width={1800}
                height={2400}
                className="h-auto w-full object-contain"
                priority
              />
            </article>

            <article className="overflow-hidden rounded-[1.2rem] border border-line/70 bg-white shadow-[0_16px_34px_rgba(11,30,75,0.08)]">
              <Image
                src="/images/diy-cheat-sheet-side-b.png"
                alt="DIY pool care cheat sheet side B preview"
                width={1800}
                height={2400}
                className="h-auto w-full object-contain"
              />
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
