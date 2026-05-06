import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HomeReviewsCarouselSection } from "@/components/home-reviews-carousel-section";
import { site } from "@/content/site";
import { getLocationBySlug } from "@/lib/site";

type LocationRouteParams = {
  slug: string;
};

const LOCATION_SERVICE_SLUGS = [
  "weekly-services",
  "bi-weekly-services",
  "algae-removal",
  "acid-wash",
  "drain-and-refill",
  "filter-cleaning",
  "pump-repair-and-installation",
  "one-time-cleans",
  "sand-replacement",
] as const;

const LOCAL_STANDARDS_CARDS = [
  {
    title: "Clear Communication",
    body: "We keep you in the loop so you know what was handled and what may need attention.",
  },
  {
    title: "Dependable Route Care",
    body: "Our route planning is built around consistency, service density, and practical scheduling.",
  },
  {
    title: "Long-Term Protection",
    body: "We focus on clean water, balanced chemistry, filter care, and equipment protection over time.",
  },
] as const;

const SOUTH_ABILENE_STANDARDS_CARDS = [
  {
    title: "Predictable Weekly Rhythm",
    body: "Recurring route care keeps chemistry, skimming, brushing, and visual checks from turning into catch-up work.",
  },
  {
    title: "Proactive Owner Communication",
    body: "You get practical updates on what was completed, what we are monitoring, and what we recommend next.",
  },
  {
    title: "Equipment and Filter Longevity",
    body: "We build filter maintenance and system checks into ongoing care so pumps, filters, and surfaces stay protected over time.",
  },
] as const;

const SOUTH_ABILENE_FAQS = [
  {
    question: "Is weekly or bi-weekly better for most South Abilene pools?",
    answer:
      "For most active pools, weekly service is the stronger fit because it keeps chemistry and debris control tighter between visits. Bi-weekly can work in specific cases, but we usually recommend weekly when homeowners want fewer surprises and steadier water quality.",
  },
  {
    question: "How often should filter cleaning be folded into recurring service?",
    answer:
      "Filter cleaning cadence depends on pool load, surrounding debris, and equipment performance. During recurring service, we track pressure and flow patterns, then recommend cleanings at the right intervals instead of waiting for visible water problems.",
  },
  {
    question: "When does a green pool need cleanup instead of normal maintenance?",
    answer:
      "If water has already turned green or visibility is poor, standard recurring visits are usually not enough to recover it quickly. In those cases, we start with algae recovery or a cleanup plan, then transition into ongoing maintenance once the pool is stabilized.",
  },
  {
    question: "How fast can recurring service start in South Abilene?",
    answer:
      "Start timing depends on current route density and the pool's condition at onboarding. Text us your address and a quick pool snapshot, and we will confirm whether we can place you on a weekly or bi-weekly route and what first-step service is needed.",
  },
] as const;

const NORTH_ABILENE_STANDARDS_CARDS = [
  {
    title: "Maintenance Planning That Stays Visible",
    body: "Each visit supports a clear upkeep path so you understand current condition, next actions, and service priorities.",
  },
  {
    title: "Route Consistency You Can Track",
    body: "Our North Abilene route structure is built for dependable recurring support instead of irregular stop-and-start service.",
  },
  {
    title: "Practical Equipment Awareness",
    body: "We watch for pressure, circulation, and wear indicators early so smaller maintenance issues do not become larger repairs.",
  },
] as const;

const NORTH_ABILENE_FAQS = [
  {
    question: "What does route-based pool service look like in North Abilene?",
    answer:
      "Route-based service means your pool is maintained on a scheduled recurring cadence with defined upkeep tasks each visit. The process focuses on dependable execution, service visibility, and clear recommendations so you know exactly what is being managed.",
  },
  {
    question: "How do you spot when filter care is overdue?",
    answer:
      "We look at system performance signals like pressure trends, flow behavior, and water clarity patterns. When those indicators show restriction or declining performance, we recommend filter service before it turns into a larger water-quality or equipment issue.",
  },
  {
    question: "Can you help if upkeep has been inconsistent?",
    answer:
      "Yes. We can assess current pool condition, identify what needs immediate correction, then move you onto a recurring plan designed to stabilize water and routine maintenance. If extra cleanup is needed first, we outline that upfront.",
  },
  {
    question: "How do I get started without overcommitting?",
    answer:
      "Start with a practical route and condition assessment. We will review your address, current pool status, and service goals, then recommend the right first step and recurring cadence so you can begin with a clear plan.",
  },
] as const;

const ABILENE_WYLIE_STANDARDS_CARDS = [
  {
    title: "Recurring Stability First",
    body: "Consistent weekly or bi-weekly service keeps day-to-day maintenance predictable and reduces preventable drift.",
  },
  {
    title: "Cleanup Support When Needed",
    body: "If conditions slip, we can layer in practical recovery work and then return your pool to a stable recurring routine.",
  },
  {
    title: "Simple, Useful Communication",
    body: "You get clear notes on pool condition, completed work, and the next recommended step without unnecessary complexity.",
  },
] as const;

const ABILENE_WYLIE_FAQS = [
  {
    question: "Can recurring service and occasional cleanup work together?",
    answer:
      "Yes. Many homeowners use recurring service as the baseline, then add targeted cleanup support when conditions require extra correction. We structure it so recovery work solves the immediate issue and recurring care keeps the pool from slipping back.",
  },
  {
    question: "What happens if a Wylie pool falls behind for a few weeks?",
    answer:
      "We begin with a condition check to see whether standard recurring care can catch things up or whether a deeper reset is needed first. From there, we recommend the most practical starting path so maintenance is stable again.",
  },
  {
    question: "When should I request green-to-clean instead of normal service?",
    answer:
      "If the water is green, cloudy enough to limit visibility, or showing clear algae progression, green-to-clean is usually the better first step. Normal recurring visits are best once water is stabilized and routine control is restored.",
  },
  {
    question: "What details help you recommend the right starting service?",
    answer:
      "The most helpful details are your address, current water condition, how long upkeep has been inconsistent, and any recent equipment or filter concerns. That lets us point you to the right starting service without guesswork.",
  },
] as const;

const BAIRD_STANDARDS_CARDS = [
  {
    title: "Planned Scheduling Windows",
    body: "Baird service is organized around planned route windows so visits are scheduled with realistic timing from the start.",
  },
  {
    title: "Honest Route Confirmation",
    body: "We confirm address fit against current route density before promising service timing, frequency, or start dates.",
  },
  {
    title: "Practical Service Recommendations",
    body: "After confirming route fit, we recommend the most workable starting option based on pool condition and current capacity.",
  },
] as const;

const BAIRD_FAQS = [
  {
    question: "How do I know if my address is currently on route?",
    answer:
      "The fastest way is to text your address before requesting timing. We check current route coverage and confirm whether your property fits active Baird scheduling windows.",
  },
  {
    question: "Is recurring service or one-time cleanup the better first step in Baird?",
    answer:
      "That depends on current water and system condition. If the pool is stable, recurring service may be the right start. If it has fallen behind, a one-time cleanup or recovery visit may be recommended before recurring care.",
  },
  {
    question: "When do seasonal demand and route density affect timing?",
    answer:
      "Timing can shift during higher-demand periods or when route density changes. We set expectations based on current capacity so you have a realistic start window instead of a vague estimate.",
  },
  {
    question: "What details should I send before requesting service?",
    answer:
      "Send your address, current pool condition, and whether you are looking for recurring care or catch-up help. Those details let us confirm route fit and recommend the best starting path quickly.",
  },
] as const;

const BUFFALO_GAP_STANDARDS_CARDS = [
  {
    title: "Fast Address Confirmation",
    body: "A quick text with your address lets us confirm Buffalo Gap coverage and next steps without a long back-and-forth.",
  },
  {
    title: "Clean, Practical Communication",
    body: "We keep updates simple: current pool condition, recommended starting scope, and what happens after that first step.",
  },
  {
    title: "Right Scope from Day One",
    body: "Service starts with the correct level of care, whether that is recurring maintenance, cleanup support, or both in sequence.",
  },
] as const;

const BUFFALO_GAP_FAQS = [
  {
    question: "Why is texting my address the fastest way to confirm service?",
    answer:
      "Texting gives us the exact location immediately, which lets us verify route fit and respond with practical next-step options faster than a generic request. It is the quickest path to a clear yes/no on coverage and timing direction.",
  },
  {
    question: "Do you recommend recurring care or a one-time cleanup first?",
    answer:
      "That depends on current pool condition. If water and system performance are stable, recurring care is usually the best start. If the pool has fallen behind, we may recommend a one-time cleanup first, then transition into ongoing service.",
  },
  {
    question: "When does filter cleaning become part of the recommendation?",
    answer:
      "Filter care is recommended when pressure, flow, or water clarity signals show reduced performance. We include it when the condition check indicates it will materially improve stability and support recurring upkeep.",
  },
  {
    question: "How fast can a Buffalo Gap quote become a service plan?",
    answer:
      "Once we have your address and condition details, we can usually move from quote conversation to a defined starting plan quickly. The timeline depends on current route openings and whether cleanup is needed before recurring care.",
  },
] as const;

const CLYDE_STANDARDS_CARDS = [
  {
    title: "Recurring Stability Comes First",
    body: "Clyde service performs best when pools are maintained on a dependable recurring cadence instead of sporadic one-off visits.",
  },
  {
    title: "Clear Timing for Specialty Work",
    body: "Specialty services are available when route load allows, and we communicate timing expectations before scheduling those extras.",
  },
  {
    title: "Long-Term Pool Consistency",
    body: "Ongoing care protects water quality and system performance over time, reducing avoidable swings and reactive fixes.",
  },
] as const;

const CLYDE_FAQS = [
  {
    question: "Is Clyde better suited to recurring service than one-off visits?",
    answer:
      "In most cases, yes. Recurring service is typically the most reliable way to keep water and equipment stable in Clyde. One-off visits can help in specific situations, but they are usually less effective as a long-term maintenance approach.",
  },
  {
    question: "How do specialty services fit into the route schedule?",
    answer:
      "We schedule specialty work around current recurring route commitments. After confirming your pool's needs, we provide realistic timing for services like deeper cleanup or targeted corrective work when capacity opens.",
  },
  {
    question: "What happens if a Clyde pool is already behind?",
    answer:
      "We start with a condition assessment and recommend whether catch-up service is needed before routine recurring care begins. Once the pool is stabilized, we transition to an ongoing cadence designed to keep it there.",
  },
  {
    question: "How do I know whether weekly or bi-weekly is realistic?",
    answer:
      "That depends on pool condition, usage patterns, and current route fit. We review your address and pool status, then recommend a cadence that is both workable and consistent for ongoing results.",
  },
] as const;

const HAMBY_STANDARDS_CARDS = [
  {
    title: "Fast Coverage Checks",
    body: "A quick text with your address helps us confirm Hamby coverage promptly and move straight to practical next steps.",
  },
  {
    title: "Scheduled Care Windows",
    body: "Service is organized into clear scheduling windows so start timing and visit expectations are easy to understand.",
  },
  {
    title: "Practical Recommendations After Review",
    body: "Once we review pool condition, we recommend the right starting scope and service sequence without unnecessary complexity.",
  },
] as const;

const HAMBY_FAQS = [
  {
    question: "What should I text to confirm Hamby coverage quickly?",
    answer:
      "Text your address plus a short note on current pool condition. That gives us what we need to verify coverage and respond with realistic scheduling options.",
  },
  {
    question: "Do you offer both recurring care and single-visit help?",
    answer:
      "Yes. We offer recurring maintenance and single-visit support when appropriate. The best starting option depends on current condition and service goals.",
  },
  {
    question: "When do you recommend filter care or cleanup first?",
    answer:
      "If pressure, circulation, or water condition signals show the pool needs correction first, we may recommend filter care or cleanup before routine maintenance. We confirm that during initial review.",
  },
  {
    question: "What happens after you confirm my address?",
    answer:
      "After coverage is confirmed, we review your pool details, recommend the right starting scope, and share the next scheduling window so you know exactly how service begins.",
  },
] as const;

const HAWLEY_STANDARDS_CARDS = [
  {
    title: "Circulation and Filtration Awareness",
    body: "Service includes close attention to flow, filtration performance, and early indicators that water movement is falling off.",
  },
  {
    title: "Problem Prevention Before Escalation",
    body: "We focus on identifying small performance issues early so chemistry drift and cleanup problems are less likely to compound.",
  },
  {
    title: "Long-Term Equipment Protection",
    body: "Regular maintenance decisions are made with pump, filter, and overall system longevity in mind, not short-term appearance alone.",
  },
] as const;

const HAWLEY_FAQS = [
  {
    question: "When does a pool problem need equipment attention, not just cleaning?",
    answer:
      "If the pool repeatedly drifts after normal service, shows weak circulation, or has persistent clarity issues, equipment performance may be part of the problem. In those cases, we evaluate system behavior alongside water condition instead of treating it as a cleaning-only issue.",
  },
  {
    question: "How do you handle pump or circulation concerns during regular service?",
    answer:
      "During regular visits, we watch for practical warning signs such as flow changes, pressure behavior, and circulation consistency. If something looks off, we flag it quickly and recommend the right next maintenance step before it leads to larger problems.",
  },
  {
    question: "Can you diagnose whether a green pool is a chemistry issue or a system issue?",
    answer:
      "Yes. Green water can involve chemistry imbalance, poor circulation, filtration limits, or a combination of those factors. We assess both water condition and system function to recommend the correct recovery path.",
  },
  {
    question: "How is Hawley route timing confirmed?",
    answer:
      "Text your address with a brief note on current pool condition and any equipment concerns. We confirm route fit and respond with practical timing and the most appropriate starting service.",
  },
] as const;

const MERKEL_STANDARDS_CARDS = [
  {
    title: "Stability Over Stop-Start Service",
    body: "Merkel pools generally perform best on a steady recurring cadence rather than occasional reactive visits.",
  },
  {
    title: "Chemistry Consistency",
    body: "Ongoing service supports tighter chemistry control, helping water quality stay more predictable over time.",
  },
  {
    title: "Specialty Work That Supports the Plan",
    body: "Cleanup, drain/refill, or other specialty services are used when needed to strengthen long-term recurring results.",
  },
] as const;

const MERKEL_FAQS = [
  {
    question: "Why are recurring plans the strongest fit in Merkel?",
    answer:
      "Recurring plans reduce maintenance gaps and keep care consistent, which typically leads to steadier water and fewer corrective surprises. For most Merkel homeowners, that ongoing structure is the most reliable long-term path.",
  },
  {
    question: "When do you recommend a cleanup, drain/refill, or specialty service first?",
    answer:
      "If current pool condition is too far off for routine visits to stabilize quickly, we may recommend a cleanup, drain/refill, or other targeted service first. The goal is to reset conditions so recurring care can be effective right away.",
  },
  {
    question: "Can a neglected pool transition into a stable recurring plan?",
    answer:
      "Yes. We assess current condition, complete any necessary corrective starting work, then move into a recurring cadence designed to maintain stability and prevent repeat setbacks.",
  },
  {
    question: "What is the best way to check current route openings?",
    answer:
      "Text your address and current pool condition for the fastest route-opening check. We can then confirm fit and recommend the best onboarding path.",
  },
] as const;

const POTOSI_STANDARDS_CARDS = [
  {
    title: "Fast Diagnosis from Useful Inputs",
    body: "When homeowners share clear initial details, we can assess likely pool needs quickly and reduce back-and-forth.",
  },
  {
    title: "Clear First-Step Recommendations",
    body: "Our first response is built to be actionable: the right starting service path based on current pool condition.",
  },
  {
    title: "Service Level Matched to Condition",
    body: "We align recurring care, cleanup, or recovery support to what the pool actually needs now, not a one-size-fits-all script.",
  },
] as const;

const POTOSI_FAQS = [
  {
    question: "What pool details should I send first?",
    answer:
      "Start with your address, a short description of current water condition, and recent maintenance context. Photos are especially helpful for faster recommendation accuracy.",
  },
  {
    question: "How do you decide between recurring care, cleanup, and recovery?",
    answer:
      "We base that decision on present pool condition and likely correction needs. Stable conditions usually point to recurring care, while visible drift or heavy issues may require cleanup or recovery first.",
  },
  {
    question: "Can you recommend next steps from photos and a short description?",
    answer:
      "Yes. Photos plus a concise condition summary often provide enough context for an initial service recommendation and practical next-step plan.",
  },
  {
    question: "What happens after I text the initial details?",
    answer:
      "After review, we reply with the recommended starting path, what that first service should accomplish, and how to move into the next scheduling step.",
  },
] as const;

const TUSCOLA_STANDARDS_CARDS = [
  {
    title: "Clear First Steps",
    body: "Tuscola service starts with a defined onboarding sequence so homeowners know what happens before regular visits begin.",
  },
  {
    title: "Recurring Stability by Design",
    body: "Weekly or bi-weekly cadence is selected to support consistent maintenance and avoid avoidable stop-start patterns.",
  },
  {
    title: "Cleanup Support Before Onboarding When Needed",
    body: "If condition requires correction first, we handle cleanup support before moving into recurring route care.",
  },
] as const;

const TUSCOLA_FAQS = [
  {
    question: "What happens before a Tuscola pool is added to the route?",
    answer:
      "We confirm service fit, review current pool condition, and define the appropriate starting path. Once those steps are clear, we place the pool into the right onboarding sequence before recurring visits begin.",
  },
  {
    question: "Do you ever recommend cleanup before recurring service begins?",
    answer:
      "Yes. If the pool condition is too far off for routine maintenance to stabilize quickly, we may recommend cleanup or recovery first, then transition into recurring care.",
  },
  {
    question: "How do weekly and bi-weekly options get decided?",
    answer:
      "Cadence is based on current condition, maintenance demands, and practical route fit. We recommend the option that gives the most stable ongoing result.",
  },
  {
    question: "How is onboarding timing confirmed?",
    answer:
      "After initial review, we provide the next available onboarding window and the first-step scope so you know timing and expectations before committing to a cadence.",
  },
] as const;

const TYE_STANDARDS_CARDS = [
  {
    title: "Timing Transparency",
    body: "We communicate current Tye openings and realistic start windows clearly, so scheduling expectations are grounded from the beginning.",
  },
  {
    title: "Right-Fit Service Selection",
    body: "We match service type to present pool condition, whether that points to recurring care, one-time cleanup, or staged support.",
  },
  {
    title: "Quick Next-Step Confirmation",
    body: "After initial review, we provide a fast yes/no fit response and the most practical immediate action to take.",
  },
] as const;

const TYE_FAQS = [
  {
    question: "Are there current route openings in Tye?",
    answer:
      "Openings change as schedules shift, so the quickest way to check is to text your address and pool status. We reply with the most current availability picture and immediate next step.",
  },
  {
    question: "How fast can you confirm whether my pool is a fit for recurring service?",
    answer:
      "After reviewing your basic pool condition and address, we can usually confirm fit direction quickly and outline whether recurring service can start now or needs a different first step.",
  },
  {
    question: "Do you handle one-time cleanups when route openings are limited?",
    answer:
      "When recurring openings are tight, one-time support may still be possible depending on condition and current schedule. We review options and recommend the most workable path.",
  },
  {
    question: "What should I send to get a quick answer?",
    answer:
      "Send your address, a brief condition summary, and photos if available. That gives us enough context to respond quickly with fit and timing guidance.",
  },
] as const;

function getExistingPublicImage(imagePath?: string) {
  if (!imagePath || !imagePath.startsWith("/")) {
    return null;
  }

  const absolutePath = path.join(process.cwd(), "public", imagePath.slice(1));
  return existsSync(absolutePath) ? imagePath : null;
}

function getLocationCardImage(locationSlug: string) {
  const location = site.locations.find((entry) => entry.slug === locationSlug);
  const configuredImage = getExistingPublicImage(location?.imagePath ?? "");
  if (configuredImage) {
    return configuredImage;
  }

  const preferredLocationImage = `/images/locations/${locationSlug}.jpg`;
  const preferredImage = getExistingPublicImage(preferredLocationImage);
  if (preferredImage) {
    return preferredImage;
  }

  const legacyAreaImage = `/images/areas-${locationSlug}.png`;
  return getExistingPublicImage(legacyAreaImage);
}

export function generateStaticParams() {
  return site.locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<LocationRouteParams> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found",
      description: "The requested location page was not found.",
    };
  }

  return {
    title: location.seoTitle ?? `Pool Service in ${location.name} | Shipwrecked Pools`,
    description: `Dependable pool care for homeowners in ${location.name} who want clear water, practical communication, and protected equipment.`,
    alternates: {
      canonical: `/locations/${location.slug}`,
    },
  };
}

export default async function LocationDetailPage({ params }: { params: Promise<LocationRouteParams> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const prioritizedServiceSlugs =
    location.servicesOffered.length > 0 ? location.servicesOffered : LOCATION_SERVICE_SLUGS;
  const availableServices = prioritizedServiceSlugs
    .map((serviceSlug) => site.services.find((service) => service.slug === serviceSlug))
    .filter((service): service is (typeof site.services)[number] => Boolean(service));
  const nearbyLocations = location.nearbyLocationSlugs
    .map((nearbySlug) => getLocationBySlug(nearbySlug))
    .filter((nearbyLocation): nearbyLocation is NonNullable<typeof nearbyLocation> => Boolean(nearbyLocation));
  const fallbackNearbyLocations = site.locations.filter((entry) => entry.slug !== location.slug);
  const relatedLocations = (nearbyLocations.length > 0 ? nearbyLocations : fallbackNearbyLocations).slice(0, 6);
  const locationImagePath = location.imagePath ?? `/images/locations/${location.slug}.jpg`;
  const existingLocationImage = getExistingPublicImage(locationImagePath);
  const locationImageAlt = location.imageAlt ?? `Pool service area in ${location.name}`;
  const locationCardImage = getLocationCardImage(location.slug);
  const useCenteredHeroLayout =
    location.slug === "south-abilene" ||
    location.slug === "north-abilene" ||
    location.slug === "baird" ||
    location.slug === "abilene-wylie" ||
    location.slug === "buffalo-gap" ||
    location.slug === "clyde" ||
    location.slug === "hamby" ||
    location.slug === "hawley" ||
    location.slug === "merkel" ||
    location.slug === "potosi" ||
    location.slug === "tuscola" ||
    location.slug === "tye";
  const useCleanedHeroLayout = useCenteredHeroLayout;
  const locationsNavHref = site.navigation.find((item) => item.label === "Locations")?.href ?? "/locations";
  const isSouthAbilene = location.slug === "south-abilene";
  const isNorthAbilene = location.slug === "north-abilene";
  const isAbileneWylie = location.slug === "abilene-wylie";
  const isBaird = location.slug === "baird";
  const isBuffaloGap = location.slug === "buffalo-gap";
  const isClyde = location.slug === "clyde";
  const isHamby = location.slug === "hamby";
  const isHawley = location.slug === "hawley";
  const isMerkel = location.slug === "merkel";
  const isPotosi = location.slug === "potosi";
  const isTuscola = location.slug === "tuscola";
  const isTye = location.slug === "tye";
  const heroH1 = isAbileneWylie
    ? "Reliable Pool Care for Wylie Homeowners"
    : isBaird
      ? "Reliable Pool Service for Baird Homeowners"
      : isBuffaloGap
        ? "Reliable Pool Service for Buffalo Gap Homeowners"
      : isClyde
        ? "Reliable Pool Service for Clyde Homeowners"
      : isHamby
        ? "Reliable Pool Service for Hamby Homeowners"
      : isHawley
        ? "Reliable Pool Service for Hawley Homeowners"
      : isMerkel
        ? "Reliable Pool Service for Merkel Homeowners"
      : isPotosi
        ? "Reliable Pool Service for Potosi Homeowners"
      : isTuscola
        ? "Reliable Pool Service for Tuscola Homeowners"
      : isTye
        ? "Reliable Pool Service for Tye Homeowners"
      : `Pool Service in ${location.name}`;
  const heroSupportingParagraph = isSouthAbilene
    ? "Recurring pool service in South Abilene for homeowners who want consistent weekly or bi-weekly care, clear updates, and long-term equipment protection."
    : isNorthAbilene
      ? "Route-based pool upkeep in North Abilene for homeowners who want dependable recurring support, clear maintenance planning, and practical next-step guidance."
      : isAbileneWylie
        ? "Pool service in Abilene Wylie built for reliable recurring upkeep plus practical cleanup support when a pool needs help catching up."
        : isBaird
          ? "Route-confirmed pool service in Baird with planned visits, realistic timing, and clear expectations based on season and route density."
          : isBuffaloGap
            ? "Professional pool care in Buffalo Gap with fast text-based timing confirmation and a straightforward start process."
            : isClyde
              ? "Reliable pool service in Clyde centered on recurring maintenance first, with specialty support scheduled when route capacity allows."
              : isHamby
                ? "Pool service in Hamby built around quick coverage checks by text, scheduled care windows, and clear next steps."
                : isHawley
                  ? "Hawley pool service with a system-focused approach: cleaner water, stronger circulation awareness, and long-term equipment protection."
                  : isMerkel
                    ? "Pool service in Merkel with recurring plans prioritized for long-term stability, plus specialty support when it strengthens ongoing care."
                    : isPotosi
                      ? "Pool service in Potosi built for faster first recommendations when you text pool details, photos, and address up front."
                      : isTuscola
                        ? "Pool service in Tuscola with clear onboarding first, then dependable recurring care and cleanup support when needed."
                        : isTye
                          ? "Pool service in Tye focused on current openings, realistic timing, and quick confirmation of your next step."
    : `Dependable pool care for homeowners in ${location.name} who want clear water, practical communication, and protected equipment.`;
  const introParagraphOne = isSouthAbilene
    ? "Shipwrecked Pools supports South Abilene homeowners with route-based recurring care designed to prevent drift, not just react to problems. We combine scheduled service, chemistry consistency, and proactive oversight so your pool stays ready without constant owner follow-up."
    : isNorthAbilene
      ? "Shipwrecked Pools serves North Abilene with structured recurring upkeep centered on planning and visibility. We maintain water and system performance on a dependable route, document what was handled, and clarify what should happen next so ownership decisions stay straightforward."
      : isAbileneWylie
        ? "Wylie homeowners usually want pool service that does two things well: keeps routine care consistent and steps in quickly when a pool needs more than a normal visit. Shipwrecked Pools is built for both. We provide dependable recurring service to keep water clear and equipment protected, and we offer cleanup support when a pool needs extra attention to get back on track."
        : isBaird
          ? "If you live in Baird and need dependable pool care, the first step is simple: send us your address and a quick update on your pool. We’ll confirm service availability, review the pool’s current condition, and recommend the right next step—recurring maintenance, cleanup support, or a more targeted service if needed."
        : isBuffaloGap
            ? "Getting pool service started in Buffalo Gap should be simple. Shipwrecked Pools begins by confirming your address, reviewing your pool’s current condition, and recommending the kind of care that makes the most sense—ongoing maintenance for long-term consistency or targeted cleanup support when the pool needs more than a routine visit."
        : isClyde
              ? "Clyde homeowners usually get the best long-term results from pool care that stays consistent. Shipwrecked Pools provides dependable weekly and bi-weekly service to help keep water clear, equipment protected, and routine upkeep from falling behind. When a pool needs more than standard maintenance, we can also recommend the right next step."
        : isHamby
                ? "Getting pool service started in Hamby should be simple. Shipwrecked Pools begins by confirming your address, reviewing your pool’s current condition, and recommending the kind of care that fits best—ongoing maintenance for dependable results or targeted help when your pool needs more than a routine visit."
        : isHawley
                  ? "Hawley homeowners often need pool service that does more than keep the surface clean. Shipwrecked Pools combines dependable routine care with a closer eye on circulation, filtration, and the equipment that keeps your pool running the way it should. That means service built to support clear water, protected equipment, and stronger long-term performance."
        : isMerkel
                    ? "Merkel homeowners usually get the best long-term results from pool care that starts with consistency. Shipwrecked Pools helps build that consistency with dependable weekly and bi-weekly service designed to keep water clear, protect equipment, and keep routine maintenance from falling behind. When a pool needs more than standard upkeep, we can also recommend the right next step without losing sight of the long-term plan."
        : isPotosi
                      ? "Getting the right pool service in Potosi starts with a clear look at your pool’s current condition. Shipwrecked Pools reviews the water, overall condition, and any signs that routine maintenance is no longer enough. From there, we recommend the kind of help that fits best—recurring service for steady care or more targeted support when the pool needs extra attention."
        : isTuscola
                        ? "Getting pool service started in Tuscola should feel clear and straightforward. Shipwrecked Pools begins by looking at your pool’s current condition and recommending the kind of care that fits best—recurring maintenance for long-term consistency or cleanup support when the pool needs extra help before routine service begins."
        : isTye
                          ? "Tye homeowners usually want clear answers before service begins. Shipwrecked Pools starts by reviewing your address, your pool’s current condition, and whether recurring care or more targeted help makes the most sense. That gives you a realistic idea of timing, available service options, and the right next step from the start."
    : `Shipwrecked Pools serves homeowners in ${location.name} with pool care built around consistency, communication, and long-term system health. Whether your pool needs recurring service, green-to-clean recovery, filter care, or practical maintenance support, we keep the process straightforward and local.`;
  const ctaAvailabilityParagraph = isSouthAbilene
    ? "If you are comparing weekly vs bi-weekly service, text us your address and current pool condition. We will walk through route fit, recommended cadence, and whether to begin with recurring care or a cleanup first."
    : isNorthAbilene
      ? "Text us your address and current pool condition, and we will run a quick planning assessment for route fit, service cadence, and immediate maintenance priorities before you commit."
    : isAbileneWylie
        ? "Tell us what your pool looks like today, and we’ll recommend the right first step—recurring service for ongoing care or targeted cleanup support if the water has already fallen behind."
        : isBaird
          ? "Once we know where you are and what your pool needs, we can give you a realistic idea of timing and help you move forward with a plan that makes sense."
        : isBuffaloGap
            ? "Text us your address and a quick update on what your pool looks like today, and we’ll help you understand the right next step, current availability, and how to get started without guesswork."
        : isClyde
              ? "If you are looking for pool service in Clyde, text us your address and a quick note about your pool’s current condition. We’ll help you understand whether recurring service is the right starting point and which service schedule makes the most sense."
        : isHamby
                ? "Text us your address and a quick update on your pool, and we’ll help you understand the right next step, current availability, and how to get started without guesswork."
        : isHawley
                  ? "Text us your address, a quick update on your pool’s condition, and any equipment concerns you have noticed. We’ll help you understand the right next step—ongoing maintenance for steady care or more targeted support if the system needs extra attention."
        : isMerkel
                    ? "Text us your address and a quick update on your pool’s current condition, and we’ll help you understand whether recurring service is the right place to start, which schedule makes the most sense, and what current availability looks like."
        : isPotosi
                      ? "Text us your address, a quick description of what your pool looks like, and a few photos if you have them. We’ll help you understand the right next step, what current availability looks like, and how to get started without guesswork."
        : isTuscola
                        ? "Text us your address and a quick update on your pool, and we’ll help you understand the right next step, what kind of service makes the most sense, and what current availability looks like before you commit to a weekly or bi-weekly plan."
        : isTye
                          ? "Text us your address and a quick update on your pool, and we’ll help you understand current availability, whether recurring service is the right fit, and how to move forward without guesswork."
    : "Route availability can vary by season and current service density, so the fastest way to confirm service is to text us your address or request a quick quote.";
  const standardsHeading = isSouthAbilene
    ? "Why South Abilene Homeowners Stay on Recurring Service"
    : isNorthAbilene
      ? "How North Abilene Recurring Service Stays on Plan"
      : isAbileneWylie
        ? "How Abilene Wylie Service Stays Practical and Reliable"
        : isBaird
          ? "How Baird Service Is Planned and Confirmed"
          : isBuffaloGap
            ? "How Buffalo Gap Service Starts Clean and Clear"
            : isClyde
              ? "How Clyde Service Stays Steady Over Time"
              : isHamby
                ? "How Hamby Service Stays Simple and Scheduled"
                : isHawley
                  ? "How Hawley Service Protects Pool Systems"
                  : isMerkel
                    ? "How Merkel Service Supports Long-Term Stability"
                    : isPotosi
                      ? "How Potosi Service Recommendations Start Faster"
                      : isTuscola
                        ? "How Tuscola Service Starts with Clear Onboarding"
                        : isTye
                          ? "How Tye Service Keeps Timing and Next Steps Clear"
    : "Local Standards, Professional Pool Care";
  const standardsCards = isSouthAbilene
    ? SOUTH_ABILENE_STANDARDS_CARDS
    : isNorthAbilene
      ? NORTH_ABILENE_STANDARDS_CARDS
      : isAbileneWylie
        ? ABILENE_WYLIE_STANDARDS_CARDS
        : isBaird
          ? BAIRD_STANDARDS_CARDS
          : isBuffaloGap
            ? BUFFALO_GAP_STANDARDS_CARDS
            : isClyde
              ? CLYDE_STANDARDS_CARDS
              : isHamby
                ? HAMBY_STANDARDS_CARDS
                : isHawley
                  ? HAWLEY_STANDARDS_CARDS
                  : isMerkel
                    ? MERKEL_STANDARDS_CARDS
                    : isPotosi
                      ? POTOSI_STANDARDS_CARDS
                      : isTuscola
                        ? TUSCOLA_STANDARDS_CARDS
                        : isTye
                          ? TYE_STANDARDS_CARDS
      : LOCAL_STANDARDS_CARDS;
  const faqs = isSouthAbilene
    ? SOUTH_ABILENE_FAQS
    : isNorthAbilene
      ? NORTH_ABILENE_FAQS
      : isAbileneWylie
        ? ABILENE_WYLIE_FAQS
        : isBaird
          ? BAIRD_FAQS
        : isBuffaloGap
          ? BUFFALO_GAP_FAQS
        : isClyde
          ? CLYDE_FAQS
        : isHamby
          ? HAMBY_FAQS
        : isHawley
          ? HAWLEY_FAQS
        : isMerkel
          ? MERKEL_FAQS
        : isPotosi
          ? POTOSI_FAQS
        : isTuscola
          ? TUSCOLA_FAQS
        : isTye
          ? TYE_FAQS
        : location.faqs;
  const nearbyAreasTransition = isSouthAbilene
    ? "If you are just outside South Abilene, review nearby routes to find the closest ongoing service coverage."
    : isNorthAbilene
      ? "If your address is near North Abilene service boundaries, compare nearby routes so we can plan the best recurring coverage path."
    : isAbileneWylie
      ? "If you are near Abilene Wylie route edges, check nearby service areas and we will help confirm the best recurring or recovery starting point."
      : isBaird
        ? "If your property is near Baird route edges, compare nearby coverage areas so we can confirm the most practical service path."
      : isBuffaloGap
        ? "If you are near Buffalo Gap coverage edges, compare nearby areas and text us so we can confirm the quickest path to service."
      : isClyde
        ? "If you are near Clyde coverage boundaries, check nearby routes and we will confirm the best recurring-service starting path."
      : isHamby
        ? "If you are near Hamby coverage edges, review nearby areas and text us for quick scheduling confirmation."
      : isHawley
        ? "If you are near Hawley coverage edges, compare nearby areas and text pool details so we can confirm the best service path."
      : isMerkel
        ? "If you are near Merkel route edges, review nearby areas and text your address so we can confirm the best recurring onboarding path."
      : isPotosi
        ? "If you are near Potosi service edges, review nearby areas and text details so we can recommend the right starting path quickly."
      : isTuscola
        ? "If you are near Tuscola coverage edges, compare nearby areas and we can confirm your onboarding path before scheduling regular visits."
      : isTye
        ? "If you are near Tye route edges, check nearby areas and text us for a quick openings check and next-step confirmation."
    : "Explore nearby communities where Shipwrecked Pools provides route-based pool care.";

  return (
    <>
      <section
        className={`relative -mt-[var(--header-stack-height)] overflow-hidden bg-[linear-gradient(160deg,#071332_0%,#0b1e4b_52%,#12326e_100%)] text-white ${
          useCleanedHeroLayout
            ? "pb-14 pt-[calc(var(--header-stack-height)+4.5rem)] md:pb-20 md:pt-[calc(var(--header-stack-height)+7rem)]"
            : "pb-10 pt-[calc(var(--header-stack-height)+2rem)] md:pb-14 md:pt-[calc(var(--header-stack-height)+3rem)]"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(169,221,245,0.26),transparent_36%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_84%,rgba(230,180,199,0.12),transparent_32%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1150px_auto] bg-center opacity-[0.08]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-20 top-24 hidden h-72 w-72 rounded-full border-[22px] border-light-blue/12 md:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-14 hidden h-52 w-52 rounded-full border-[12px] border-pink/14 md:block"
          aria-hidden="true"
        />
        <div
          className={`container-page relative z-10 ${
            useCleanedHeroLayout
              ? "flex min-h-[14rem] items-center md:min-h-[16rem]"
              : ""
          }`}
        >
          <div
            className={
              useCleanedHeroLayout
                ? "mx-auto w-full max-w-[900px]"
                : "grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
            }
          >
            <div className={useCleanedHeroLayout ? "mx-auto w-full text-center" : undefined}>
              {!useCleanedHeroLayout ? (
                <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-light-blue">
                  Service Area
                </p>
              ) : null}
              <h1
                className={`text-balance font-sans font-extrabold tracking-[-0.03em] ${
                  useCleanedHeroLayout
                    ? "mx-auto max-w-[900px] text-center text-[2.3rem] leading-[0.9] md:text-[3.7rem] lg:text-[4.4rem]"
                    : "mt-4 text-[2.3rem] leading-[0.9] md:text-[3.7rem] lg:text-[4.4rem]"
                }`}
              >
                {heroH1}
              </h1>
              <p
                className={`mt-4 text-base text-light-blue md:text-lg ${
                  useCleanedHeroLayout ? "mx-auto max-w-[760px] text-center" : "max-w-3xl"
                }`}
              >
                {heroSupportingParagraph}
              </p>
            </div>

            {!useCleanedHeroLayout ? (
              <div className="relative aspect-[4/3] max-w-[32rem] overflow-hidden rounded-[1.5rem] border border-white/20 bg-navy-deep/70 shadow-[0_18px_45px_rgba(3,10,30,0.5)] lg:justify-self-end">
                {existingLocationImage ? (
                  <Image
                    src={existingLocationImage}
                    alt={locationImageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    priority
                    quality={76}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(150deg,#0f2760_0%,#0a1a45_56%,#1b438f_100%)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(169,221,245,0.24),transparent_34%)]" aria-hidden="true" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_90%,rgba(230,180,199,0.12),transparent_34%)]" aria-hidden="true" />
                    <div className="absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-cover bg-center opacity-[0.2]" aria-hidden="true" />
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,23,0.08)_0%,rgba(2,8,23,0.24)_52%,rgba(2,8,23,0.58)_100%)]" />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="relative container-page pb-16 pt-8 md:pb-24 md:pt-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] rounded-[2.25rem] bg-[radial-gradient(circle_at_10%_12%,rgba(169,221,245,0.18),transparent_40%),radial-gradient(circle_at_88%_92%,rgba(230,180,199,0.12),transparent_36%)]"
          aria-hidden="true"
        />
        <section>
          <Link href={locationsNavHref} className="link-inline relative z-10 text-sm focus-ring">
            ← Back to Locations
          </Link>
        </section>

        <section className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] md:items-stretch">
            <div>
              <h2 className="font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.02em] text-navy md:text-[2.7rem]">
                Reliable Pool Care in {location.name}
              </h2>
              <div className="mt-4 max-w-4xl space-y-4 text-sm leading-relaxed text-ink-muted md:text-base">
                <p>{introParagraphOne}</p>
                <p>{ctaAvailabilityParagraph}</p>
              </div>
            </div>
            <div className="relative min-h-[13rem] overflow-hidden rounded-2xl border border-line/70 bg-light-blue/10 md:min-h-[17rem]">
              {locationCardImage ? (
                <Image
                  src={locationCardImage}
                  alt={`Pool service in ${location.name}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 36vw, 100vw"
                  loading="lazy"
                  quality={76}
                />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(150deg,#0f2760_0%,#0a1a45_56%,#1b438f_100%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(169,221,245,0.24),transparent_34%)]" aria-hidden="true" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_90%,rgba(230,180,199,0.12),transparent_34%)]" aria-hidden="true" />
                  <div className="absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-cover bg-center opacity-[0.18]" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="relative mt-8 overflow-hidden rounded-3xl border border-white/16 bg-[linear-gradient(156deg,#09183c_0%,#0b1e4b_58%,#12326e_100%)] p-6 text-white shadow-[0_22px_54px_rgba(6,18,46,0.48)] md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(169,221,245,0.2),transparent_32%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_88%,rgba(230,180,199,0.11),transparent_32%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-[url(/images/wave-pattern.svg)] bg-[length:1000px_auto] bg-center opacity-[0.09]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -bottom-12 right-10 h-32 w-32 rounded-full border-[8px] border-pink/22"
            aria-hidden="true"
          />
          <h2 className="font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.02em] text-white md:text-[2.7rem]">
            Pool Services Available in {location.name}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {availableServices.map((service) => (
              <article
                key={service.slug}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/22 bg-white/8 p-5 backdrop-blur-[1px] transition duration-300 hover:-translate-y-0.5 hover:border-light-blue/55 hover:bg-white/12"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-light-blue/70 to-transparent opacity-85" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                <p className="mt-2 grow text-sm leading-relaxed text-light-blue">{service.summary}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="focus-ring mt-4 inline-flex text-sm font-semibold text-white underline decoration-light-blue decoration-2 underline-offset-4 transition hover:text-light-blue"
                >
                  View {service.seoH1 ?? service.name}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-[78rem] md:mt-16">
          <h2 className="mx-auto max-w-[48rem] text-balance text-center font-sans text-[2.2rem] font-extrabold leading-[0.92] tracking-[-0.02em] text-navy md:text-[3rem]">
            {standardsHeading}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {standardsCards.map((card) => (
              <article
                key={card.title}
                className="mx-auto flex h-full min-h-[14rem] w-full max-w-[21.75rem] flex-col rounded-[0.7rem] border border-line/75 bg-white p-7"
              >
                <h3 className="text-[1.28rem] font-bold leading-tight text-navy">{card.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
          <h2 className="font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.02em] text-navy md:text-[2.7rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-[1.1rem] border border-line/80 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbff_100%)] px-4 py-4 md:px-5">
                <h3 className="font-semibold text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <HomeReviewsCarouselSection
        title="Trusted by Homeowners Near You"
        supportingLine="Rated 5.0 on Google with 35+ reviews from local homeowners."
      />

      <section className="container-page pb-16 pt-8 md:pb-24 md:pt-10">
        <section className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
          <h2 className="font-sans text-[2rem] font-extrabold leading-[0.95] tracking-[-0.02em] text-navy md:text-[2.7rem]">
            Nearby Service Areas
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted md:text-base">
            {nearbyAreasTransition}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedLocations.map((nearbyLocation) => (
              <Link
                key={nearbyLocation.slug}
                href={`/locations/${nearbyLocation.slug}`}
                className="focus-ring rounded-2xl border border-line bg-light-blue-soft/45 px-4 py-4 text-base font-semibold text-navy transition duration-300 hover:-translate-y-0.5 hover:border-navy/30 hover:bg-light-blue-soft hover:shadow-[0_12px_24px_rgba(11,30,75,0.1)]"
              >
                {nearbyLocation.name}
              </Link>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
