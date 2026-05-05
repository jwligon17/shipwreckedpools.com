"use client";

import { type MouseEvent, type PointerEvent, useMemo, useRef } from "react";

import { site } from "@/content/site";

const STAR_ROW = ["★", "★", "★", "★", "★"];

type ReviewItem = (typeof site.reviewsData.reviews)[number];

function GoogleMark() {
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-navy/20 bg-white text-[0.72rem] font-black text-navy shadow-[0_2px_8px_rgba(11,30,75,0.08)]"
      aria-hidden="true"
    >
      G
    </span>
  );
}

function ReviewCard({
  review,
  googleReviewsUrl,
  starSeed,
  className,
}: {
  review: ReviewItem;
  googleReviewsUrl: string;
  starSeed: number;
  className: string;
}) {
  return (
    <article className={className} data-review-name={review.reviewerName ?? ""}>
      <div className="space-y-2.5">
        {review.reviewerName ? (
          <p className="text-2xl font-extrabold leading-tight text-navy md:text-[1.95rem]">{review.reviewerName}</p>
        ) : null}
        <div className="flex items-center gap-2.5">
          <GoogleMark />
          <span
            className="inline-flex items-center gap-[0.14rem] text-[1.08rem] leading-none text-[#c9a854] md:text-[1.15rem]"
            aria-label="5 star review"
          >
            {STAR_ROW.map((star, starIndex) => (
              <span key={`card-star-${starSeed}-${starIndex}`}>{star}</span>
            ))}
          </span>
        </div>
      </div>

      <blockquote className="mt-4 text-sm leading-relaxed text-ink md:text-[0.98rem]">
        <span className="inline [display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:5]">
          &quot;{review.quote}&quot;
        </span>
      </blockquote>

      <div className="mt-auto pt-4 text-sm text-ink-muted">
        <a
          href={review.readOnGoogleUrl ?? googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-1.5 font-semibold text-navy underline decoration-light-blue underline-offset-4 transition hover:text-navy-deep"
        >
          Read on Google
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </article>
  );
}

export function HomeReviewsCarouselSection({
  title,
  supportingLine,
}: {
  title?: string;
  supportingLine?: string;
} = {}) {
  const section = site.home.reviewsSection;
  const resolvedTitle = title ?? section.title;
  const resolvedSupportingLine = supportingLine ?? section.supportingLine;
  const { rating, displayReviewCount, googleReviewsUrl, reviews } = site.reviewsData;
  const reviewsCount = reviews.length;
  const hasReviews = reviewsCount > 0;
  const visibleReviews = useMemo(() => reviews, [reviews]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pointerDownRef = useRef(false);
  const dragMovedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  const isInteractiveElement = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
      return false;
    }
    return Boolean(target.closest("a, button, input, textarea, select, label"));
  };

  const handleTrackPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || isInteractiveElement(event.target)) {
      return;
    }
    const track = trackRef.current;
    if (!track) {
      return;
    }
    pointerDownRef.current = true;
    dragMovedRef.current = false;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = track.scrollLeft;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleTrackPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerDownRef.current || event.pointerType !== "mouse") {
      return;
    }
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const delta = event.clientX - startXRef.current;
    if (Math.abs(delta) > 3) {
      dragMovedRef.current = true;
    }
    track.scrollLeft = startScrollLeftRef.current - delta;
    if (dragMovedRef.current) {
      event.preventDefault();
    }
  };

  const handleTrackPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerDownRef.current) {
      return;
    }
    pointerDownRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    window.setTimeout(() => {
      dragMovedRef.current = false;
    }, 0);
  };

  const handleTrackClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!dragMovedRef.current) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const cardBaseClass =
    "flex min-h-[16.75rem] w-[84vw] max-w-[44rem] shrink-0 snap-start flex-col rounded-[1.6rem] border border-line bg-white p-6 shadow-[0_16px_36px_rgba(11,30,75,0.1)] md:min-h-[17.25rem] md:w-[80vw] md:p-7 lg:w-[42rem]";

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_10%_12%,rgba(169,221,245,0.2),transparent_32%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_86%_88%,rgba(230,180,199,0.16),transparent_28%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(11,30,75,0.2)_50%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-balance font-sans text-[2.7rem] font-extrabold leading-[0.88] tracking-[-0.036em] text-navy md:text-[4.45rem] lg:text-[5.35rem]">
            {resolvedTitle}
          </h2>
          <div
            className="mx-auto mt-3 h-[2px] w-20 rounded-full bg-[linear-gradient(90deg,rgba(169,221,245,0.4)_0%,rgba(11,30,75,0.65)_50%,rgba(230,180,199,0.5)_100%)]"
            aria-hidden="true"
          />
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">{resolvedSupportingLine}</p>

          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read Shipwrecked Pools Google reviews"
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-[0_10px_22px_rgba(11,30,75,0.08)] transition hover:-translate-y-0.5 hover:border-light-blue"
          >
            <GoogleMark />
            <span>Google</span>
            <span className="inline-flex items-center gap-[0.12rem] text-[#c9a854]" aria-hidden="true">
              {STAR_ROW.map((star, index) => (
                <span key={`trust-star-${index}`}>{star}</span>
              ))}
            </span>
            <span>{rating.toFixed(1)}</span>
            <span aria-hidden="true">·</span>
            <span>{displayReviewCount} Reviews</span>
          </a>
        </div>

        {hasReviews ? (
          <div className="mt-8 md:mt-10">
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-x-[10%] top-12 z-0 h-40 rounded-[2.25rem] bg-[linear-gradient(145deg,rgba(169,221,245,0.22),rgba(230,180,199,0.12))] blur-2xl"
                aria-hidden="true"
              />

              <div
                role="region"
                aria-label="Google reviews carousel"
                data-carousel-component="home-reviews-carousel-section"
                data-carousel-mode="native-loop-scroll"
                className="relative z-[1]"
              >
                <div
                  ref={trackRef}
                  tabIndex={0}
                  onPointerDown={handleTrackPointerDown}
                  onPointerMove={handleTrackPointerMove}
                  onPointerUp={handleTrackPointerUp}
                  onPointerCancel={handleTrackPointerUp}
                  onClickCapture={handleTrackClickCapture}
                  className="scrollbar-none focus-ring relative mx-auto flex max-w-[96rem] snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2 pt-1 [touch-action:pan-x] md:gap-6"
                >
                  {visibleReviews.map((review, index) => (
                    <ReviewCard
                      key={`review-card-${review.reviewerName ?? "review"}-${index}`}
                      review={review}
                      googleReviewsUrl={googleReviewsUrl}
                      starSeed={index}
                      className={cardBaseClass}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-11 max-w-3xl md:mt-14">
            <article className="rounded-[2rem] border border-line bg-white p-8 text-center shadow-[0_20px_42px_rgba(11,30,75,0.1)] md:p-10">
              <div className="flex items-center justify-center gap-2 text-navy">
                <GoogleMark />
                <p className="text-base font-semibold">Google</p>
                <span className="inline-flex items-center gap-[0.12rem] text-[#c9a854]" aria-hidden="true">
                  {STAR_ROW.map((star, index) => (
                    <span key={`fallback-star-${index}`}>{star}</span>
                  ))}
                </span>
              </div>

              <p className="mt-5 text-[2.2rem] font-black leading-none text-navy md:text-[2.8rem]">{rating.toFixed(1)} rating</p>
              <p className="mt-2 text-lg font-semibold text-ink">{displayReviewCount} Google Reviews</p>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
                See what local homeowners are saying about Shipwrecked Pools.
              </p>

              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary focus-ring mt-7 inline-flex"
              >
                Read Our Google Reviews
              </a>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
