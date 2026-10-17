import assert from "node:assert/strict";
import { before, test } from "node:test";

// Run against `next start` built with NEXT_PUBLIC_SITE_URL=https://www.shipwreckedpools.com
// and NEXT_PUBLIC_SITE_LIVE=true (process-only settings; do not change environment files):
// SEO_TEST_BASE_URL=http://127.0.0.1:3126 node --test tests/sos-126/seo-rendered.test.mjs
// Only local GET responses are read. No scripts, assets, forms or redirect destinations execute.
const base = new URL(process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:3126");
assert.ok(["http:", "https:"].includes(base.protocol), "Use a local HTTP(S) server");
assert.ok(["127.0.0.1", "localhost", "[::1]"].includes(base.hostname), "Remote test targets are forbidden");
assert.ok(!base.username && !base.password && base.pathname === "/" && !base.search && !base.hash,
  "SEO_TEST_BASE_URL must be a local origin without credentials, path, query or fragment");

const origin = "https://www.shipwreckedpools.com";
const brand = "Shipwrecked Pools";
const organizationId = `${origin}/#organization`;
const portal = "https://shipwreckedpools.mypoolportal.com/auth/sign-in";
const homeTitle = "Pool Cleaning & Weekly Pool Service in Abilene, TX | Shipwrecked Pools";
const branded = (subject) => `${subject} | ${brand}`;

// Explicit SOS-126 content baseline, independent of metadata implementation.
// Update this inventory only when intentionally adding/removing routes or changing approved copy.
const hubs = [
  ["/about", "About Shipwrecked Pools"],
  ["/services", branded("Pool Cleaning, Repair & Remodeling in Abilene, TX")],
  ["/locations", branded("Service Areas")],
  ["/diy-pool-care", branded("DIY Pool Care Cheat Sheet")],
  ["/blog", branded("Pool Care Blog")],
  ["/careers", "Careers at Shipwrecked Pools"],
  ["/contact", branded("Get a Pool Service Quote in Abilene, TX")],
  ["/pool-service-reports", "Pool Service Reports & Picture Proof | Shipwrecked Pools Abilene"],
];
const services = [
  ["weekly-services", "Weekly Pool Service", "Weekly Services"],
  ["algae-removal", "Green-to-Clean Pool Cleanup", "Algae Removal"],
  ["acid-wash", "Pool Acid Wash", "Acid Wash"],
  ["drain-and-refill", "Pool Drain & Refill", "Drain & Refill"],
  ["filter-cleaning", "Pool Filter Cleaning", "Filter Cleaning"],
  ["sand-replacement", "Pool Filter Sand Replacement", "Sand Replacement"],
  ["pump-repair-and-installation", "Pool Pump Repair & Installation", "Pump Repair and Installation"],
  ["one-time-cleans", "One-Time Pool Cleaning", "One Time Cleans"],
  ["ship-shape-pool-review", "Free Ship-Shape Pool Review", "Ship-Shape Pool Review"],
  ["free-pool-chemical-delivery", "Free Pool Chemical Delivery", "Free Pool Chemical Delivery"],
  ["pool-equipment-repair", "Pool Equipment Repair & Replacement", "Pool Equipment Repair & Replacement"],
  ["filter-repair-replacement", "Pool Filter Repair & Replacement", "Pool Filter Repair & Replacement"],
  ["pool-plumbing-repair", "Pool Plumbing & Valve Repair", "Pool Plumbing & Valve Repair"],
  ["pool-liner-repair", "Pool Liner Repair", "Pool Liner Repair"],
  ["pool-remodeling", "Pool Remodeling & Renovation", "Pool Remodeling & Renovation"],
  ["pool-resurfacing-replastering", "Pool Resurfacing & Replastering", "Pool Resurfacing & Replastering"],
  ["pool-deck-resurfacing-repair", "Pool Deck Resurfacing & Repair", "Pool Deck Resurfacing & Repair"],
  ["pool-tile-coping-repair", "Pool Tile & Coping Repair", "Pool Tile & Coping Repair & Replacement"],
  ["pool-tile-cleaning", "Pool Tile Cleaning & Bead Blasting", "Pool Tile Cleaning & Bead Blasting"],
  ["hot-tub-cleaning", "Hot Tub & Spa Cleaning", "Hot Tub & Spa Cleaning"],
  [
    "short-term-rental-pool-hot-tub-cleaning",
    "Airbnb & Short-Term Rental Pool and Hot Tub Cleaning",
    "Short-Term Rental Pool & Hot Tub Cleaning",
    "Pool & Hot Tub Cleaning for Airbnb and Short-Term Rentals",
    "Airbnb & Short-Term Rental Pool and Hot Tub Cleaning in Abilene, TX | Shipwrecked Pools",
  ],
  ["hotel-apartment-pool-cleaning", "Hotel & Apartment Pool Cleaning", "Hotel & Apartment Pool Cleaning"],
];
const legacyService = ["bi-weekly-services", "Bi-Weekly Pool Service", "Bi-Weekly Services"];
const locations = [
  ["south-abilene", "South Abilene", true],
  ["north-abilene", "North Abilene", true],
  ["abilene-wylie", "Abilene Wylie", true],
  ["baird", "Baird"], ["buffalo-gap", "Buffalo Gap"], ["clyde", "Clyde"],
  ["hamby", "Hamby"], ["hawley", "Hawley"], ["merkel", "Merkel"],
  ["potosi", "Potosi"], ["tuscola", "Tuscola"], ["tye", "Tye"],
];
const articles = [
  ["pool-care-after-freeze-power-outage", "Pool Care After a Freeze or Power Outage", "2026-10-16",
    "After a freeze or power outage, the first decision is whether the equipment area appears safe—not how quickly the system can be restarted. Visible damage, leakage, ice, electrical concerns, interrupted circulation, debris, and changing water condition should be documented before normal operation resumes.",
    ["pool-equipment-repair", "pump-repair-and-installation", "pool-plumbing-repair", "one-time-cleans", "weekly-services"]],
  ["west-texas-heat-dust-pollen-pool-care", "Pool Care During West Texas Heat, Dust & Pollen", "2026-10-16",
    "West Texas heat, wind, dust, and pollen can increase water loss, debris, filter load, use, and chemistry demand without the dramatic signs of a storm. A practical seasonal routine follows actual conditions instead of assuming one fixed calendar works throughout the year.",
    ["weekly-services", "one-time-cleans", "filter-cleaning"]],
  ["pool-care-after-parties-vacations-heavy-use", "Pool Care After Parties, Vacations & Heavy Use", "2026-10-16",
    "Parties, guest stays, heavy use, and long absences can change debris, water level, chemistry demand, clarity, filter loading, and equipment observations. The right response depends on whether the pool is preparing for use, recovering afterward, or being checked after time without direct owner observation.",
    ["weekly-services", "one-time-cleans", "algae-removal", "short-term-rental-pool-hot-tub-cleaning", "hot-tub-cleaning", "pool-equipment-repair"]],
  ["how-to-clean-cartridge-filters", "How to Clean Cartridge Filters", "2025-11-26",
    "Cartridge filter performance depends on consistent intervals, proper rinsing technique, and replacing media before severe restriction impacts circulation.",
    ["filter-cleaning", "weekly-services"]],
  ["low-calcium-pool-corrosion-risk", "Low Calcium: Pool Corrosion Risk", "2025-11-19",
    "Low calcium can make water aggressive, increasing wear risk on surfaces and components. LSI-balanced chemistry is the safer long-term target.",
    ["weekly-services", "drain-and-refill"]],
  ["fiberglass-pool-maintenance-tips", "Fiberglass Pool Maintenance Tips", "2025-11-12",
    "Fiberglass pools still need disciplined chemistry and filtration routines. Consistency is what keeps maintenance easy over time.",
    ["weekly-services", "filter-cleaning"]],
  ["which-pool-cleaner-is-right", "Which Pool Cleaner is Right?", "2025-11-05",
    "Cleaner selection should account for debris load, pool shape, and owner preferences. A practical match improves day-to-day maintenance outcomes.",
    ["filter-cleaning", "pump-repair-and-installation"]],
  ["black-algae-the-pool-owners-nightmare", "Black Algae: The Pool Owner’s Nightmare", "2025-10-29",
    "Black algae can anchor deep in surface imperfections, requiring a staged corrective process rather than one-time shock treatment.",
    ["algae-removal", "weekly-services"]],
  ["salt-pool-maintenance-checklist", "Salt Pool Maintenance Checklist", "2025-10-22",
    "Salt pools still depend on full chemistry management, filtration discipline, and periodic system checks to avoid gradual performance drift.",
    ["weekly-services", "filter-cleaning"]],
];
const diyGuides = [
  [
    "weekly-pool-care-guide",
    "Weekly Pool Care & Maintenance Guide",
    "A practical weekly pool-care guide covering cleaning, circulation observations, water testing, weather, service frequency, and signs routine maintenance is not enough.",
  ],
  [
    "pool-chemistry-troubleshooting",
    "Pool Chemistry Troubleshooting Guide",
    "Understand common chlorine, pH, alkalinity, calcium, stabilizer, salt, scale, and water-balance relationships before making pool-chemistry changes.",
  ],
  [
    "pool-chemical-dosing-safety",
    "Pool Chemical Dosing & Safety Guide",
    "A conservative pool-chemical decision process covering testing, pool volume, product concentration, label directions, safe addition, circulation, retesting, and storage.",
  ],
  [
    "green-cloudy-pool-recovery",
    "Green & Cloudy Pool Recovery Guide",
    "A decision framework for green or cloudy pool water, algae concerns, debris, chlorine demand, circulation, filter load, weather effects, and staged recovery.",
  ],
  [
    "west-texas-storm-pool-care",
    "Pool Care After West Texas Storms & Heavy Rain",
    "A West Texas storm-pool-care guide covering debris, dust, heavy rain, water testing, filter load, circulation, power interruptions, and professional cleanup decisions.",
  ],
  [
    "pool-equipment-troubleshooting",
    "Pool Equipment Troubleshooting Guide",
    "A homeowner-safe pool equipment troubleshooting guide for pump, filter, plumbing, valve, flow, leak, noise, and circulation symptoms before requesting service.",
  ],
  [
    "pool-cleaner-robot-troubleshooting",
    "Pool Cleaner & Robot Troubleshooting Guide",
    "Troubleshoot robotic, suction-side, and pressure-side pool cleaner symptoms with safe observations for movement, pickup, climbing, cables, hoses, and flow.",
  ],
  [
    "pool-surface-remodeling-guide",
    "Pool Surface & Remodeling Problem Guide",
    "Compare visible pool finish, tile, coping, scale, liner, and deck concerns to cleaning, repair, resurfacing, replastering, or remodeling project categories.",
  ],
  [
    "hot-tub-spa-water-care",
    "Hot Tub & Spa Water Care Guide",
    "A practical hot tub and spa water-care guide covering routine cleaning, testing, sanitizer systems, filter care, heavy use, water symptoms, and service records.",
  ],
  [
    "short-term-rental-pool-hot-tub-care",
    "Short-Term Rental Pool & Hot Tub Care Checklist",
    "A pool and hot tub care checklist for short-term rental hosts, remote owners, and property managers covering service planning, guest-use conditions, reporting, weather, and escalation.",
  ],
  [
    "commercial-pool-service-checklist",
    "Commercial Pool Service Checklist for Property Managers",
    "A commercial pool-service planning checklist for hotel, apartment, multifamily, facilities, and property-management teams covering scope, access, reporting, equipment, and escalation.",
  ],
];
const routes = ["/", ...hubs.map(([route]) => route),
  ...services.map(([slug]) => `/services/${slug}`),
  `/services/${legacyService[0]}`,
  ...locations.map(([slug]) => `/locations/${slug}`),
  ...articles.map(([slug]) => `/blog/${slug}`),
  ...diyGuides.map(([slug]) => `/diy-pool-care/${slug}`)];
const indexableRoutes = routes.filter((route) => route !== `/services/${legacyService[0]}`);
const allowedRequests = new Set([...routes, "/sitemap.xml", "/pay-now"]);
const canonical = (route) => route === "/" ? origin : `${origin}${route}`;

// These extract only the known server-rendered tags, not arbitrary HTML or React flight payloads.
function decode(value) {
  const entities = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, key) =>
    key.startsWith("#") ? String.fromCodePoint(Number.parseInt(key.slice(key[1].toLowerCase() === "x" ? 2 : 1),
      key[1].toLowerCase() === "x" ? 16 : 10)) : entities[key.toLowerCase()] ?? entity);
}
const stripScripts = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const text = (html) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*(["'])(.*?)\2/gs)]
  .map(([, key, , value]) => [key.toLowerCase(), decode(value)]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))]
  .map(([tag]) => attributes(tag));
const contents = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}>`, "gi"))]
  .map(([, value]) => text(value));
const entitiesOfType = (nodes, type) => nodes.filter((node) => [node["@type"]].flat().includes(type));

function jsonLd(html) {
  const nodes = [];
  for (const [, opening, body] of html.matchAll(/(<script\b[^>]*>)([\s\S]*?)<\/script>/gi)) {
    if (attributes(opening).type !== "application/ld+json") continue;
    const parsed = JSON.parse(body);
    for (const node of [parsed].flat()) nodes.push(...(node["@graph"] ?? [node]));
  }
  return nodes;
}

function assertAddressFree(value) {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    assert.ok(!["address", "streetAddress", "geo", "latitude", "longitude", "aggregateRating", "review", "ratingValue"].includes(key),
      `Unexpected address, coordinates or self-serving review property: ${key}`);
    assertAddressFree(child);
  }
}

async function get(route) {
  assert.ok(allowedRequests.has(route), `GET outside the SEO route allowlist: ${route}`);
  const response = await fetch(new URL(route, base), {
    method: "GET", redirect: "manual", signal: AbortSignal.timeout(15_000),
    headers: { accept: "text/html, application/xml" },
  });
  return { status: response.status, headers: response.headers, html: await response.text() };
}

let sitemapUrls;
before(async () => {
  const sitemap = await get("/sitemap.xml"); // An unavailable server is a failure, never a skipped check.
  assert.equal(sitemap.status, 200, "Local production sitemap must return 200");
  sitemapUrls = [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => decode(url));
});

test("sitemap preserves every intended canonical and excludes the payment redirect", () => {
  assert.deepEqual([...sitemapUrls].sort(), indexableRoutes.map(canonical).sort());
  assert.ok(!sitemapUrls.includes(canonical(`/services/${legacyService[0]}`)));
  assert.ok(!sitemapUrls.includes(`${origin}/pay-now`));
});

async function page(route, expectedTitle) {
  const response = await get(route);
  assert.equal(response.status, 200, `${route} must remain indexable without a redirect`);
  const html = stripScripts(response.html);
  assert.deepEqual(contents(html, "title"), [expectedTitle], `${route} title`);
  assert.equal(expectedTitle.split(brand).length - 1, 1, "Expected exactly one brand occurrence");
  const canonicals = tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href);
  assert.deepEqual(canonicals, [canonical(route)], `${route} canonical`);
  assert.ok(sitemapUrls.includes(canonical(route)), `${route} must be in the sitemap`);
  const robots = tags(html, "meta").filter((tag) => ["robots", "googlebot"].includes(tag.name));
  assert.equal(robots.length, 2, `${route} must retain general and Googlebot indexability metadata`);
  for (const tag of robots) {
    assert.match(tag.content, /\bindex\b/);
    assert.match(tag.content, /\bfollow\b/);
    assert.doesNotMatch(tag.content, /\bnoindex\b|\bnofollow\b/);
  }
  assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /\bnoindex\b|\bnofollow\b/i);
  const nodes = jsonLd(response.html);
  assertAddressFree(nodes);
  const organizations = entitiesOfType(nodes, "Organization");
  assert.equal(organizations.length, 1, `${route} must identify one shared Organization`);
  assert.equal(organizations[0]["@id"], organizationId);
  assert.equal(organizations[0].name, brand);
  assert.equal(organizations[0].url, origin);
  assert.ok(!Object.hasOwn(organizations[0], "serviceType"), "serviceType belongs on Service");
  assert.equal(entitiesOfType(nodes, "LocalBusiness").length, 0);
  return { html, nodes };
}

test("homepage keeps its exact approved title and shared Organization", async () => {
  await page("/", homeTitle);
});
for (const [route, title] of hubs) {
  test(`hub ${route}: 200, self-canonical, sitemap, title and Organization`, async () => {
    await page(route, title);
  });
}
for (const [slug, subject, serviceType, pageName = `${subject} in Abilene, TX`, pageTitle = branded(pageName)] of services) {
  test(`service ${slug}: canonical, title and page-specific Service`, async () => {
    const route = `/services/${slug}`;
    const { nodes } = await page(route, pageTitle);
    const serviceEntities = entitiesOfType(nodes, "Service");
    assert.equal(serviceEntities.length, 1);
    const service = serviceEntities[0];
    assert.equal(service["@id"], `${canonical(route)}#service`);
    assert.equal(service.name, pageName);
    assert.equal(service.serviceType, serviceType);
    assert.equal(service.areaServed, "Abilene, TX");
    assert.equal(service.url, canonical(route));
    assert.equal(service.provider["@id"], organizationId);
    assert.ok(!service.provider["@type"] || service.provider["@type"] === "Organization");
  });
}
test("Batch 2 service pages preserve distinct audiences, supported scope, limitations and conversion paths", async () => {
  const expectations = {
    "hot-tub-cleaning": {
      h1: "Hot Tub & Spa Cleaning in Abilene, TX",
      required: [
        "hot tub cleaning", "spa cleaning", "Debris removal", "Water testing",
        "circulation observation", "visual look at accessible equipment",
        "What should I send with a hot tub or spa cleaning quote request?",
      ],
      forbidden: [
        "sanitation guarantee", "health guarantee", "fixed price", "fixed service interval",
        "fixed completion time", "equipment warranty", "automatic cover cleaning",
      ],
      links: ["/services/short-term-rental-pool-hot-tub-cleaning"],
    },
    "short-term-rental-pool-hot-tub-cleaning": {
      h1: "Pool & Hot Tub Cleaning for Airbnb and Short-Term Rentals",
      required: [
        "Airbnb hosts", "short-term-rental", "designated contact",
        "documentation", "agree on service frequency and scope",
        "What should I send with a short-term-rental service quote request?",
      ],
      forbidden: [
        "Shipwrecked Pools is affiliated with Airbnb", "Shipwrecked Pools is endorsed by Airbnb",
        "We provide property management", "guaranteed guest satisfaction",
        "guaranteed turnover readiness", "guaranteed guest-ready",
      ],
      links: [
        "/services/hot-tub-cleaning", "/services/weekly-services",
        "/services/pool-equipment-repair", "/pool-service-reports",
      ],
    },
    "hotel-apartment-pool-cleaning": {
      h1: "Hotel & Apartment Pool Cleaning in Abilene, TX",
      required: [
        "hotels, apartment communities, and multifamily properties",
        "property managers", "recurring commercial pool-cleaning plan",
        "owner or operator retains regulatory", "custom scope and quote",
        "What should I send with a hotel or apartment pool-cleaning quote request?",
      ],
      forbidden: [
        "guaranteed compliance", "lifeguard services", "pool management",
        "24/7 emergency", "fixed commercial pricing", "engineering services",
      ],
      links: [
        "/services/pool-equipment-repair", "/services/filter-cleaning",
        "/services/free-pool-chemical-delivery", "/pool-service-reports",
      ],
    },
  };

  for (const [slug, checks] of Object.entries(expectations)) {
    const route = `/services/${slug}`;
    const response = await get(route);
    assert.equal(response.status, 200, `${route} must resolve`);
    const html = stripScripts(response.html);
    const visibleText = text(html);
    assert.deepEqual(contents(html, "h1"), [checks.h1], `${route} intended H1`);
    assert.deepEqual(tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href),
      [canonical(route)], `${route} canonical`);
    assert.ok(sitemapUrls.includes(canonical(route)), `${route} sitemap inclusion`);
    assert.equal(entitiesOfType(jsonLd(response.html), "Service").length, 1, `${route} Service schema`);
    assert.ok(tags(html, "meta").some((tag) => tag.name === "description" && tag.content),
      `${route} useful meta description`);
    for (const phrase of checks.required) {
      assert.ok(visibleText.toLowerCase().includes(phrase.toLowerCase()), `${route} must explain: ${phrase}`);
    }
    for (const phrase of checks.forbidden) {
      assert.ok(!visibleText.toLowerCase().includes(phrase.toLowerCase()), `${route} must not claim: ${phrase}`);
    }
    const links = tags(html, "a").map((tag) => tag.href);
    assert.ok(links.includes("/contact"), `${route} quote path`);
    assert.ok(!links.includes("/services/bi-weekly-services"), `${route} must not rediscover biweekly service`);
    for (const href of checks.links) assert.ok(links.includes(href), `${route} must link to ${href}`);
  }
});
test("service expansion pages preserve distinct intent, conservative scope, quote paths and hierarchy", async () => {
  const expectations = {
    "pool-equipment-repair": {
      h1: "Pool Equipment Repair & Replacement in Abilene, TX",
      required: [
        "repair or replacement path based on what the equipment and requested scope require",
        "What should I send with an equipment-service quote request?",
      ],
      links: [
        "/services/pump-repair-and-installation",
        "/services/filter-repair-replacement",
        "/services/pool-plumbing-repair",
        "/services/filter-cleaning",
        "/services/weekly-services",
      ],
    },
    "filter-repair-replacement": {
      h1: "Pool Filter Repair & Replacement in Abilene, TX",
      required: [
        "damaged, worn, leaking, failed, or otherwise unsuitable filter equipment",
        "Filter Cleaning removes accumulated material as routine or condition-based maintenance.",
      ],
      links: [
        "/services/filter-cleaning",
        "/services/pool-equipment-repair",
        "/services/weekly-services",
      ],
    },
    "pool-plumbing-repair": {
      h1: "Pool Plumbing & Valve Repair in Abilene, TX",
      required: [
        "visible, accessible pool-system plumbing, fittings, valves, and equipment-pad connections",
        "What should I send with a pool-plumbing quote request?",
      ],
      links: ["/services/pool-equipment-repair", "/services/pump-repair-and-installation"],
    },
    "pool-remodeling": {
      h1: "Pool Remodeling & Renovation in Abilene, TX",
      required: [
        "manage the customer-facing quote and project process",
        "What should I send with a pool-remodeling quote request?",
      ],
      links: [
        "/services/pool-resurfacing-replastering",
        "/services/pool-tile-coping-repair",
      ],
    },
    "pool-resurfacing-replastering": {
      h1: "Pool Resurfacing & Replastering in Abilene, TX",
      required: [
        "An acid wash is a condition-based surface treatment and cleaning service; it does not replace the finish.",
        "What should I send with a resurfacing quote request?",
      ],
      links: [
        "/services/pool-remodeling",
        "/services/pool-tile-coping-repair",
        "/services/acid-wash",
        "/services/weekly-services",
      ],
    },
    "pool-tile-coping-repair": {
      h1: "Pool Tile & Coping Repair in Abilene, TX",
      required: [
        "repair or replacement fits the observed condition and project goals",
        "Pool Tile Cleaning addresses mineral scale and buildup on suitable tile.",
      ],
      links: [
        "/services/pool-remodeling",
        "/services/pool-resurfacing-replastering",
        "/services/pool-tile-cleaning",
      ],
    },
    "pool-tile-cleaning": {
      h1: "Pool Tile Cleaning & Bead Blasting in Abilene, TX",
      required: [
        "Bead blasting is one professional cleaning method",
        "Damaged or deteriorated tile may need a separate repair or replacement assessment",
      ],
      links: [
        "/services/pool-tile-coping-repair",
        "/services/acid-wash",
        "/services/weekly-services",
      ],
    },
  };
  const descriptions = new Set();

  for (const [slug, checks] of Object.entries(expectations)) {
    const route = `/services/${slug}`;
    const response = await get(route);
    assert.equal(response.status, 200, `${route} must resolve`);
    const html = stripScripts(response.html);
    const visibleText = text(html);
    assert.deepEqual(contents(html, "h1"), [checks.h1], `${route} intended H1`);
    const description = tags(html, "meta").find((tag) => tag.name === "description")?.content;
    assert.ok(description, `${route} must have a meta description`);
    assert.ok(!descriptions.has(description), `${route} must have a distinct meta description`);
    descriptions.add(description);
    for (const phrase of checks.required) {
      assert.ok(visibleText.includes(phrase), `${route} must explain: ${phrase}`);
    }
    const links = tags(html, "a").map((tag) => tag.href);
    assert.ok(links.includes("/contact"), `${route} must retain the quote path`);
    assert.ok(!links.includes("/services/bi-weekly-services"), `${route} must not rediscover biweekly service`);
    for (const href of checks.links) assert.ok(links.includes(href), `${route} must link to ${href}`);
    for (const forbidden of [
      "fixed price", "price range", "markup", "warranty", "guaranteed completion",
      "licensed plumber", "licensed electrician", "leak detection", "heater repair",
      "automation repair", "control repair", "lighting repair", "water-feature repair",
    ]) {
      assert.ok(!visibleText.toLowerCase().includes(forbidden), `${route} must not claim: ${forbidden}`);
    }
  }
});
test("final service expansion keeps liner and pool-deck intent distinct and conservatively scoped", async () => {
  const expectations = {
    "pool-liner-repair": {
      h1: "Pool Liner Repair in Abilene, TX",
      description:
        "Pool liner condition assessment in Abilene for visible damage, deterioration, displacement, and repair-or-replacement concerns.",
      required: [
        "visible liner condition and project details",
        "A liner concern can have more than one cause",
        "professional leak detection is not included",
        "dimensions when known",
        "Can every damaged pool liner be repaired?",
        "quote the agreed project scope individually",
      ],
      forbidden: [
        "liner material compatibility", "life expectancy", "structural repair",
        "fixed price", "fixed timeline", "warranty", "guaranteed repair",
        "we find leaks", "we locate leaks",
      ],
      links: ["/services/pool-remodeling"],
    },
    "pool-deck-resurfacing-repair": {
      h1: "Pool Deck Resurfacing & Repair in Abilene, TX",
      description:
        "Pool deck resurfacing and repair assessment in Abilene for worn or deteriorated walking surfaces surrounding an existing pool.",
      required: [
        "walking surface outside the pool, not the interior pool finish",
        "standalone project or coordinated renovation scope",
        "coordinate appropriate specialty trade work when required",
        "Is pool deck resurfacing the same as pool resurfacing?",
        "quote for the agreed project",
      ],
      forbidden: [
        "structural engineering", "foundation repair", "slip-resistance guarantee",
        "lifetime", "warranty", "fixed price", "fixed timeline",
        "epoxy coating", "acrylic coating", "spray deck",
      ],
      links: [
        "/services/pool-remodeling",
        "/services/pool-resurfacing-replastering",
        "/services/pool-tile-coping-repair",
      ],
    },
  };

  for (const [slug, checks] of Object.entries(expectations)) {
    const route = `/services/${slug}`;
    const response = await get(route);
    assert.equal(response.status, 200, `${route} must resolve`);
    const html = stripScripts(response.html);
    const visibleText = text(html);
    assert.deepEqual(contents(html, "h1"), [checks.h1], `${route} intended H1`);
    assert.deepEqual(contents(html, "title"), [branded(checks.h1)], `${route} unique title`);
    assert.deepEqual(tags(html, "meta").filter((tag) => tag.name === "description").map((tag) => tag.content),
      [checks.description], `${route} unique description`);
    assert.deepEqual(tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href),
      [canonical(route)], `${route} canonical`);
    assert.ok(sitemapUrls.includes(canonical(route)), `${route} sitemap inclusion`);
    assert.equal(entitiesOfType(jsonLd(response.html), "Service").length, 1, `${route} Service schema`);
    for (const phrase of checks.required) {
      assert.ok(visibleText.toLowerCase().includes(phrase.toLowerCase()), `${route} must explain: ${phrase}`);
    }
    for (const phrase of checks.forbidden) {
      assert.ok(!visibleText.toLowerCase().includes(phrase.toLowerCase()), `${route} must not claim: ${phrase}`);
    }
    for (const phrase of ["heater repair", "automation repair", "lighting repair", "water-feature repair"]) {
      assert.ok(!visibleText.toLowerCase().includes(phrase), `${route} must not introduce Wave 3: ${phrase}`);
    }
    const links = tags(html, "a").map((tag) => tag.href);
    assert.ok(links.includes("/contact"), `${route} quote path`);
    for (const href of checks.links) assert.ok(links.includes(href), `${route} must link to ${href}`);
  }
});
test("services hub discovers the expansion without changing homepage service priority", async () => {
  const expansionRoutes = [
    "/services/hot-tub-cleaning",
    "/services/short-term-rental-pool-hot-tub-cleaning",
    "/services/hotel-apartment-pool-cleaning",
    "/services/pool-equipment-repair",
    "/services/filter-repair-replacement",
    "/services/pool-plumbing-repair",
    "/services/pool-liner-repair",
    "/services/pool-remodeling",
    "/services/pool-resurfacing-replastering",
    "/services/pool-deck-resurfacing-repair",
    "/services/pool-tile-coping-repair",
    "/services/pool-tile-cleaning",
  ];
  const hub = stripScripts((await get("/services")).html);
  assert.deepEqual(contents(hub, "h1"), ["Pool Cleaning, Repair & Remodeling in Abilene, TX"]);
  const hubLinks = tags(hub, "a");
  for (const href of expansionRoutes) {
    const link = hubLinks.find((tag) => tag.href === href);
    assert.ok(link, `/services must discover ${href}`);
    assert.equal(link["data-analytics-placement"], "services_hub_expansion");
  }
  for (const href of [
    "/services/ship-shape-pool-review",
    "/services/free-pool-chemical-delivery",
    "/pool-service-reports",
  ]) {
    assert.ok(hubLinks.some((tag) => tag.href === href),
      `/services must preserve PR #7 discovery for ${href}`);
  }
  assert.ok(!hubLinks.some((tag) => tag.href === "/services/pool-repair"),
    "/services must not introduce a duplicative generic pool-repair route");
  assert.ok(!hubLinks.some((tag) => tag.href === "/services/bi-weekly-services"));

  const homeLinks = tags(stripScripts((await get("/")).html), "a").map((tag) => tag.href);
  for (const href of expansionRoutes) {
    assert.ok(!homeLinks.includes(href), `homepage must not elevate expansion route ${href}`);
  }
  for (const href of [
    "/services/weekly-services", "/services/algae-removal", "/services/acid-wash",
    "/services/drain-and-refill", "/services/filter-cleaning",
    "/services/pump-repair-and-installation", "/services/one-time-cleans",
    "/services/sand-replacement",
  ]) assert.ok(homeLinks.includes(href), `homepage must preserve core service ${href}`);
});
test("Package 06 specialty pages preserve intent, scope, limitations, quote paths and weekly links", async () => {
  const expectations = {
    "algae-removal": {
      required: [
        "Corrective Green-to-Clean service",
        "Recovery is handled as separate corrective work before routine weekly care",
        "We do not promise that every algae condition will clear in one visit or within a fixed timeframe.",
        "What should I send with a Green-to-Clean quote request?",
      ],
      forbidden: ["guaranteed recovery", "guaranteed timeframe"],
    },
    "filter-cleaning": {
      required: [
        "Professional cleaning for cartridge, DE, and sand pool filters",
        "damaged or worn equipment may need separate repair or replacement work",
        "What should I send with a filter-cleaning quote request?",
      ],
      forbidden: ["every 6 months", "PSI threshold", "fixed price"],
    },
    "pump-repair-and-installation": {
      required: [
        "Pool pump assessment, repair, and replacement or installation support",
        "Assessment does not guarantee that every pump can or should be repaired.",
        "What should I send with a pump-service quote request?",
      ],
      forbidden: ["licensed electrician", "manufacturer-authorized", "warranty"],
    },
  };

  for (const [slug, checks] of Object.entries(expectations)) {
    const route = `/services/${slug}`;
    const response = await get(route);
    assert.equal(response.status, 200, `${route} must remain HTTP 200`);
    const html = stripScripts(response.html);
    const visibleText = text(html);
    assert.equal(contents(html, "h1").length, 1, `${route} must retain one H1`);
    assert.deepEqual(tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href),
      [canonical(route)], `${route} canonical`);
    for (const phrase of checks.required) {
      assert.ok(visibleText.includes(phrase), `${route} must explain: ${phrase}`);
    }
    for (const phrase of checks.forbidden) {
      assert.ok(!visibleText.toLowerCase().includes(phrase.toLowerCase()), `${route} must not claim: ${phrase}`);
    }
    const links = tags(html, "a").map((tag) => tag.href);
    assert.ok(links.includes("/contact"), `${route} must retain the quote CTA`);
    assert.ok(links.includes("/services/weekly-services"), `${route} must link to weekly pool service`);
    assert.ok(!links.includes("/services/bi-weekly-services"), `${route} must not rediscover legacy biweekly service`);
  }
});
test("Package 07 remaining service pages preserve intent, limitations, quote paths and next steps", async () => {
  const expectations = {
    "one-time-cleans": {
      required: [
        "without requiring immediate enrollment in weekly service",
        "may need separate Green-to-Clean recovery instead",
        "What should I send with a one-time-clean quote request?",
      ],
      forbidden: ["one visit will", "guaranteed recovery", "fixed price"],
    },
    "acid-wash": {
      required: [
        "Condition-based acid-wash service",
        "it does not guarantee removal of every stain",
        "What should I send with an acid-wash quote request?",
      ],
      forbidden: ["like new", "resurfacing service", "repairs cracks", "repairs leaks"],
    },
    "drain-and-refill": {
      required: [
        "Managed water replacement for persistent chemistry conditions",
        "it is not leak, liner, structural, or resurfacing work",
        "What should I send with a drain-and-refill quote request?",
      ],
      forbidden: ["fixes every chemistry", "guaranteed water condition", "fixed refill time"],
    },
    "sand-replacement": {
      required: [
        "Sand-filter media replacement",
        "There is no universal interval that applies to every sand filter.",
        "What should I send with a sand-replacement quote request?",
      ],
      forbidden: ["PSI threshold", "manufacturer warranty", "fixed price"],
    },
  };

  for (const [slug, checks] of Object.entries(expectations)) {
    const route = `/services/${slug}`;
    const response = await get(route);
    assert.equal(response.status, 200, `${route} must remain HTTP 200`);
    const html = stripScripts(response.html);
    const visibleText = text(html);
    assert.equal(contents(html, "h1").length, 1, `${route} must retain one H1`);
    assert.deepEqual(tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href),
      [canonical(route)], `${route} canonical`);
    for (const phrase of checks.required) {
      assert.ok(visibleText.includes(phrase), `${route} must explain: ${phrase}`);
    }
    for (const phrase of checks.forbidden) {
      assert.ok(!visibleText.toLowerCase().includes(phrase.toLowerCase()), `${route} must not claim: ${phrase}`);
    }
    const links = tags(html, "a").map((tag) => tag.href);
    assert.ok(links.includes("/contact"), `${route} must retain the quote CTA`);
    assert.ok(!links.includes("/services/bi-weekly-services"), `${route} must not rediscover legacy biweekly service`);
  }
});
test("Ship-Shape review page preserves the free offer, scope, limitations and intake path", async () => {
  const route = "/services/ship-shape-pool-review";
  const response = await get(route);
  assert.equal(response.status, 200);
  const html = stripScripts(response.html);
  const visibleText = text(html);
  assert.deepEqual(contents(html, "h1"), ["Free Ship-Shape Pool Review in Abilene, TX"]);
  assert.deepEqual(contents(html, "title"), [branded("Free Ship-Shape Pool Review in Abilene, TX")]);
  assert.deepEqual(tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href),
    [canonical(route)]);
  assert.ok(sitemapUrls.includes(canonical(route)));
  assert.deepEqual(tags(html, "meta").filter((tag) => tag.name === "description").map((tag) => tag.content), [
    "Schedule a free, one-time Ship-Shape Pool Review in Abilene for an onsite pool, water, and visible equipment check with a clear summary.",
  ]);
  for (const phrase of [
    "completely free",
    "one time per homeowner and property",
    "You do not need to be a current customer",
    "What We Look At",
    "What You Receive",
    "What It Does Not Include",
    "Equipment disassembly",
    "Leak detection",
    "No recurring-service commitment required",
  ]) assert.ok(visibleText.includes(phrase), `Ship-Shape page must explain: ${phrase}`);
  const links = tags(html, "a").map((tag) => tag.href);
  for (const href of ["/contact", "/services", "/services/weekly-services", "/locations"]) {
    assert.ok(links.includes(href), `Ship-Shape page must link to ${href}`);
  }
  assert.ok(contents(html, "h2").includes("Ship-Shape Pool Review FAQ"));
  assert.equal(contents(html, "h3").filter((heading) => heading === "Is the Ship-Shape Pool Review really free?").length, 1);
});
test("chemical delivery page preserves the free-delivery offer, product sizes, request flow and cross-links", async () => {
  const route = "/services/free-pool-chemical-delivery";
  const response = await get(route);
  assert.equal(response.status, 200);
  const html = stripScripts(response.html);
  const visibleText = text(html);
  assert.deepEqual(contents(html, "h1"), ["Free Pool Chemical Delivery in Abilene, TX"]);
  assert.deepEqual(contents(html, "title"), [branded("Free Pool Chemical Delivery in Abilene, TX")]);
  assert.deepEqual(tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href),
    [canonical(route)]);
  assert.ok(sitemapUrls.includes(canonical(route)));
  assert.deepEqual(tags(html, "meta").filter((tag) => tag.name === "description").map((tag) => tag.content), [
    "Get pool chlorine, tabs, shock, acid, bicarb, and salt delivered in the Abilene area. You pay for the chemicals; Shipwrecked Pools delivers them free.",
  ]);
  for (const phrase of [
    "You pay for the chemicals. We deliver them for free.",
    "Chlorine Tabs", "25 lb or 50 lb", "Shock", "25 lb, 50 lb, or 100 lb", "Liquid Chlorine",
    "4-gallon case", "Muriatic Acid", "Sodium Bicarbonate", "30 lb", "Pool Salt", "40 lb",
    "Same-day or next-day delivery is available in many cases, subject to product availability and route scheduling.",
    "No checkout or payment due now", "Chemical Delivery Request", "Add Another Product",
    "We will confirm availability, pricing, and expected timing before invoicing you separately.",
  ]) assert.ok(visibleText.includes(phrase), `Chemical delivery page must explain: ${phrase}`);
  const links = tags(html, "a").map((tag) => tag.href);
  for (const href of ["/services/ship-shape-pool-review", "/locations"]) {
    assert.ok(links.includes(href), `Chemical delivery page must link to ${href}`);
  }
  assert.ok(contents(html, "h2").includes("Pool Chemical Delivery FAQ"));
  assert.equal(contents(html, "h3").filter((heading) => heading === "Is the chemical delivery really free?").length, 1);
});
test("service reports trust page preserves qualified claims, weekly conversion paths and WebPage semantics", async () => {
  const route = "/pool-service-reports";
  const response = await get(route);
  assert.equal(response.status, 200);
  const html = stripScripts(response.html);
  const visibleText = text(html);
  assert.deepEqual(contents(html, "h1"), ["Pool Service Reports & Picture Proof"]);
  assert.deepEqual(contents(html, "title"), ["Pool Service Reports & Picture Proof | Shipwrecked Pools Abilene"]);
  assert.deepEqual(tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href),
    [canonical(route)]);
  assert.ok(sitemapUrls.includes(canonical(route)));
  assert.deepEqual(tags(html, "meta").filter((tag) => tag.name === "description").map((tag) => tag.content), [
    "See how Shipwrecked Pools documents weekly pool service with photos, water readings, chemical details, service notes, and equipment observations in Abilene.",
  ]);
  for (const phrase of [
    "You should know what happened at your pool after we leave.",
    "What Your Service Report Can Show",
    "Service Photos", "Water Readings", "Chemicals Added", "Work Completed",
    "Equipment Observations", "Service Notes", "Picture Proof",
    "details shown depend on what was recorded during that visit",
    "Weekly-service customers receive an After Service Pool Report after each visit.",
  ]) assert.ok(visibleText.includes(phrase), `Service reports page must explain: ${phrase}`);
  for (const forbidden of ["GPS proof", "technician certification", "every field is completed"]) {
    assert.ok(!visibleText.toLowerCase().includes(forbidden.toLowerCase()), `Service reports page must not claim: ${forbidden}`);
  }
  const links = tags(html, "a").map((tag) => tag.href);
  for (const href of ["/contact", "/services/weekly-services"]) {
    assert.ok(links.includes(href), `Service reports page must link to ${href}`);
  }
  const nodes = jsonLd(response.html);
  const webPages = entitiesOfType(nodes, "WebPage");
  assert.equal(webPages.length, 1);
  assert.equal(webPages[0]["@id"], `${canonical(route)}#webpage`);
  assert.equal(webPages[0].url, canonical(route));
  assert.equal(webPages[0].publisher["@id"], organizationId);
  assert.equal(entitiesOfType(nodes, "Service").length, 0, "Trust page must not be represented as a Service");
  assert.equal(entitiesOfType(nodes, "BreadcrumbList").length, 1);
});
test("weekly service links to the service reports trust page", async () => {
  const response = await get("/services/weekly-services");
  assert.equal(response.status, 200);
  const links = tags(stripScripts(response.html), "a").map((tag) => tag.href);
  assert.ok(links.includes("/pool-service-reports"));
});
test("Package A deepens revenue-page intent without collapsing service distinctions", async () => {
  const expectations = {
    "/services/weekly-services": {
      required: [
        "Weekly residential pool cleaning and maintenance",
        "What is included in weekly pool service?",
        "How often should a pool be professionally cleaned?",
        "When might more frequent attention be appropriate?",
        "How is weekly service different from one-time cleaning?",
        "Are corrective repairs included in weekly service?",
        "routine chemicals are billed separately",
        "After Service Pool Report",
      ],
      links: ["/pool-service-reports", "/services/one-time-cleans", "/services/algae-removal"],
    },
    "/pool-service-reports": {
      required: [
        "Arrival Time", "Departure Time", "remote owners", "property managers",
        "not regulatory or code-compliance inspections", "not", "repair diagnoses",
      ],
      links: [
        "/services/weekly-services",
        "/services/short-term-rental-pool-hot-tub-cleaning",
        "/services/hotel-apartment-pool-cleaning",
      ],
    },
    "/services/pool-equipment-repair": {
      required: ["Accessible equipment condition", "repair or replacement"],
      links: [
        "/services/pump-repair-and-installation", "/services/filter-repair-replacement",
        "/services/filter-cleaning", "/services/pool-plumbing-repair",
      ],
    },
    "/services/pump-repair-and-installation": {
      required: [
        "will not prime or loses prime", "low or weak flow", "loud operation",
        "visible pump leaks", "runs without moving water",
      ],
      links: ["/services/pool-equipment-repair", "/services/pool-plumbing-repair"],
    },
    "/services/filter-repair-replacement": {
      required: ["high- or low-pressure behavior", "cleaning, repair, or replacement"],
      links: ["/services/filter-cleaning", "/services/pool-equipment-repair"],
    },
    "/services/filter-cleaning": {
      required: ["cartridge, DE, and sand pool filters", "separate repair or replacement work"],
      links: ["/services/filter-repair-replacement"],
    },
    "/services/pool-plumbing-repair": {
      required: [
        "visible valve, fitting, connection, flow, or suction issues",
        "does not promise to locate hidden underground leaks or reconstruct buried lines",
        "does not include electrical work, structural repair",
      ],
      links: ["/services/pool-equipment-repair", "/services/pump-repair-and-installation"],
    },
    "/services/pool-remodeling": {
      required: ["coordinated starting point", "individual project quote"],
      links: [
        "/services/pool-resurfacing-replastering", "/services/pool-tile-coping-repair",
        "/services/pool-liner-repair", "/services/pool-deck-resurfacing-repair",
        "/services/pool-tile-cleaning",
      ],
    },
    "/services/pool-resurfacing-replastering": {
      required: [
        "worn, rough, or deteriorated interior pool finish",
        "pool deck resurfacing, which addresses the surrounding walking surface",
        "acid wash, which is a surface treatment and cleaning service rather than finish replacement",
      ],
      links: [
        "/services/pool-remodeling", "/services/pool-deck-resurfacing-repair",
        "/services/pool-tile-coping-repair", "/services/acid-wash",
      ],
    },
    "/services/pool-tile-coping-repair": {
      required: ["loose, missing, or damaged tile", "cracked or deteriorated coping"],
      links: ["/services/pool-tile-cleaning", "/services/pool-remodeling"],
    },
    "/services/pool-tile-cleaning": {
      required: ["calcium, mineral scale, and buildup", "one professional cleaning method"],
      links: ["/services/pool-tile-coping-repair", "/services/acid-wash"],
    },
    "/services/pool-liner-repair": {
      required: ["visible liner damage", "professional leak detection is not included"],
      links: ["/services/pool-remodeling"],
    },
    "/services/pool-deck-resurfacing-repair": {
      required: ["walking surface outside the pool, not the interior pool finish", "standalone project or coordinated renovation scope"],
      links: ["/services/pool-remodeling", "/services/pool-resurfacing-replastering"],
    },
    "/services/one-time-cleans": {
      required: ["travel, heavy use, storm debris, or preparation for an event or sale", "separate Green-to-Clean recovery"],
      links: ["/services/weekly-services", "/services/algae-removal"],
    },
    "/services/algae-removal": {
      required: ["Green or cloudy water", "weather, heavy debris, chemistry drift, or an equipment interruption", "staged treatment"],
      links: ["/services/one-time-cleans", "/services/weekly-services"],
    },
    "/services/acid-wash": {
      required: ["not resurfacing", "does not guarantee removal of every stain"],
      links: ["/services/drain-and-refill", "/services/pool-resurfacing-replastering"],
    },
    "/services/drain-and-refill": {
      required: ["does not repair leaks, liners, structural problems, or pool surfaces"],
      links: ["/services/acid-wash", "/services/weekly-services"],
    },
    "/services/sand-replacement": {
      required: ["There is no universal interval", "filter cleaning or another equipment service"],
      links: ["/services/filter-cleaning", "/services/weekly-services"],
    },
    "/services/hot-tub-cleaning": {
      required: [
        "brushing or vacuuming accessible surfaces", "accessible filter cleaning",
        "reporting needs", "recurring schedule",
      ],
      links: ["/services/short-term-rental-pool-hot-tub-cleaning"],
    },
    "/services/short-term-rental-pool-hot-tub-cleaning": {
      required: ["remote owners", "agree on service frequency and scope", "designated contact"],
      links: ["/pool-service-reports", "/services/pool-equipment-repair", "/services/hot-tub-cleaning"],
    },
    "/services/hotel-apartment-pool-cleaning": {
      required: ["recurring commercial pool-cleaning plan", "owner or operator retains regulatory"],
      links: ["/pool-service-reports", "/services/pool-equipment-repair"],
    },
    "/services/free-pool-chemical-delivery": {
      required: [
        "chlorine tabs", "pool shock", "liquid chlorine", "muriatic acid",
        "sodium bicarbonate", "pool salt", "invoice you separately",
        "request form itself is not a checkout and does not collect payment",
      ],
      links: ["/services/weekly-services"],
    },
  };

  const waveThreeMarketing = [
    "leak detection service", "heater repair", "automation repair", "lighting repair", "water-feature repair",
  ];
  for (const [route, checks] of Object.entries(expectations)) {
    const response = await get(route);
    assert.equal(response.status, 200, `${route} Package A status`);
    const html = stripScripts(response.html);
    const visibleText = text(html);
    assert.equal(contents(html, "h1").length, 1, `${route} must preserve one H1`);
    assert.ok(!visibleText.toLowerCase().includes("near me"), `${route} must not show literal near-me copy`);
    const links = tags(html, "a").map((tag) => tag.href);
    assert.ok(!links.includes("/services/bi-weekly-services"), `${route} must not rediscover legacy biweekly service`);
    for (const phrase of waveThreeMarketing) {
      assert.ok(!visibleText.toLowerCase().includes(phrase), `${route} must not introduce Wave 3 marketing: ${phrase}`);
    }
    for (const phrase of checks.required) {
      assert.ok(visibleText.toLowerCase().includes(phrase.toLowerCase()), `${route} must explain: ${phrase}`);
    }
    for (const href of checks.links) assert.ok(links.includes(href), `${route} must link to ${href}`);
  }

  const hubResponse = await get("/services");
  const hubHtml = stripScripts(hubResponse.html);
  assert.deepEqual(contents(hubHtml, "h1"), ["Pool Cleaning, Repair & Remodeling in Abilene, TX"]);
  assert.ok(!text(hubHtml).toLowerCase().includes("near me"));
  assert.ok(!tags(hubHtml, "a").some((tag) => tag.href === "/services/bi-weekly-services"));
});
test("Package B1 DIY guides are substantial, discoverable, safely bounded articles", async () => {
  const expectations = {
    "weekly-pool-care-guide": {
      required: [
        "Use weekly as a planning rhythm, not a universal rule",
        "Skim and remove visible debris", "Circulation and filter-condition awareness",
        "Water testing and adjustment as a process", "DIY care means owning the testing",
        "Do not use a universal chemical dose",
      ],
      links: [
        "/services/weekly-services", "/pool-service-reports", "/services/one-time-cleans",
        "/services/algae-removal", "/services/pool-equipment-repair",
        "/diy-pool-care/pool-chemistry-troubleshooting",
        "/diy-pool-care/west-texas-storm-pool-care",
      ],
    },
    "pool-chemistry-troubleshooting": {
      required: [
        "Chlorine that is low, high, or not holding", "pH keeps rising", "pH keeps dropping",
        "Cyanuric acid or CYA", "Salt pool producing insufficient chlorine",
        "saturation-index or LSI concept", "Change one variable deliberately",
        "Never mix pool chemicals together and never combine chlorine and acid",
      ],
      links: [
        "/services/weekly-services", "/services/free-pool-chemical-delivery",
        "/services/algae-removal", "/services/acid-wash", "/services/pool-tile-cleaning",
        "/diy-pool-care/pool-chemical-dosing-safety",
        "/diy-pool-care/green-cloudy-pool-recovery",
      ],
    },
    "pool-chemical-dosing-safety": {
      required: [
        "Confirm pool volume", "Confirm the current reading", "Read concentration and label directions",
        "Liquid chlorine, tabs, and shock", "Sodium bicarbonate and soda ash", "Pool salt",
        "Free chlorine, total chlorine", "Keep products in original labeled containers",
        "Never mix pool chemicals together and never combine chlorine and acid",
        "The request is not a cart or checkout", "invoices separately",
      ],
      links: [
        "/services/free-pool-chemical-delivery", "/services/weekly-services",
        "/pool-service-reports", "/diy-pool-care/pool-chemistry-troubleshooting",
      ],
    },
    "green-cloudy-pool-recovery": {
      required: [
        "A pool that stays cloudy after shocking needs reassessment",
        "Dark spots are not automatically black algae", "Dirty or overloaded filtration",
        "A staged recovery decision framework", "Why a pool can stay cloudy after shocking",
        "Chemical treatment does not repair failed equipment",
      ],
      links: [
        "/services/algae-removal", "/services/one-time-cleans", "/services/filter-cleaning",
        "/services/pool-equipment-repair", "/diy-pool-care/pool-chemistry-troubleshooting",
        "/diy-pool-care/west-texas-storm-pool-care",
      ],
    },
    "west-texas-storm-pool-care": {
      required: [
        "West Texas wind, dust, heavy rain", "dirt, leaves, branches",
        "Test the water before adjusting it", "Filter and circulation checks after a storm",
        "power outage or equipment interruption", "Do not touch or operate visibly damaged",
        "no emergency or same-day response is promised",
      ],
      links: [
        "/services/one-time-cleans", "/services/algae-removal", "/services/filter-cleaning",
        "/services/pool-equipment-repair", "/services/weekly-services",
        "/diy-pool-care/pool-chemistry-troubleshooting",
        "/diy-pool-care/green-cloudy-pool-recovery",
      ],
    },
  };

  const descriptions = new Set();
  const hubResponse = await get("/diy-pool-care");
  assert.equal(hubResponse.status, 200);
  const hubHtml = stripScripts(hubResponse.html);
  const hubLinks = tags(hubHtml, "a").map((tag) => tag.href);
  for (const heading of ["Routine Care", "Water & Chemistry", "Recovery & Weather", "DIY Pool Care Cheat Sheet"]) {
    assert.ok(text(hubHtml).includes(heading), `/diy-pool-care must preserve grouped discovery: ${heading}`);
  }

  for (const [slug, title, expectedDescription] of diyGuides.filter(([slug]) => Object.hasOwn(expectations, slug))) {
    const route = `/diy-pool-care/${slug}`;
    assert.ok(hubLinks.includes(route), `/diy-pool-care must discover ${route}`);
    const { html: responseHtml, nodes } = await page(route, branded(title));
    const html = stripScripts(responseHtml);
    const visibleText = text(html);
    const checks = expectations[slug];

    assert.deepEqual(contents(html, "h1"), [title], `${route} intended H1`);
    const description = tags(html, "meta").find((tag) => tag.name === "description")?.content;
    assert.equal(description, expectedDescription, `${route} intended meta description`);
    assert.ok(!descriptions.has(description), `${route} must have a distinct meta description`);
    descriptions.add(description);
    assert.ok(tags(html, "nav").some((tag) => tag["aria-label"] === "Breadcrumb"), `${route} visible breadcrumb`);

    const articleEntities = entitiesOfType(nodes, "Article");
    assert.equal(articleEntities.length, 1, `${route} Article schema`);
    assert.equal(articleEntities[0]["@id"], `${canonical(route)}#article`);
    assert.equal(articleEntities[0].headline, title);
    assert.equal(articleEntities[0].mainEntityOfPage, canonical(route));
    assert.equal(articleEntities[0].articleSection, "DIY Pool Care");
    assert.equal(articleEntities[0].author["@id"], organizationId);
    assert.equal(articleEntities[0].publisher["@id"], organizationId);
    assert.equal(entitiesOfType(nodes, "BreadcrumbList").length, 1, `${route} Breadcrumb schema`);
    assert.equal(entitiesOfType(nodes, "HowTo").length, 0, `${route} must not use HowTo schema`);
    assert.equal(entitiesOfType(nodes, "FAQPage").length, 0, `${route} must not use FAQ schema`);

    assert.equal(tags(html, "table").length, 0, `${route} must not publish a dosing table`);
    assert.equal(tags(html, "form").length, 0, `${route} must not operate as a dosing calculator`);
    assert.equal(tags(html, "input").length, 0, `${route} must not collect calculator inputs`);
    assert.ok(!visibleText.toLowerCase().includes("mix chlorine with acid"), `${route} must not instruct chemical mixing`);
    for (const phrase of [
      "guaranteed recovery", "recover in 24 hours", "one visit will clear",
      "same-day emergency response", "universal wait time is", "universal chemical dose is",
      "leak detection service", "heater repair", "automation repair", "lighting repair", "water-feature repair",
    ]) assert.ok(!visibleText.toLowerCase().includes(phrase), `${route} must not claim: ${phrase}`);

    const links = tags(html, "a").map((tag) => tag.href);
    assert.ok(links.includes("/diy-pool-care"), `${route} must link to the DIY hub`);
    assert.ok(links.includes("/contact"), `${route} must preserve a quote path`);
    assert.ok(!links.includes("/services/bi-weekly-services"), `${route} must not rediscover Biweekly service`);
    for (const phrase of checks.required) {
      assert.ok(visibleText.toLowerCase().includes(phrase.toLowerCase()), `${route} must explain: ${phrase}`);
    }
    for (const href of checks.links) assert.ok(links.includes(href), `${route} must link to ${href}`);
  }
});
test("Package B2 equipment, cleaner and surface guides preserve safe decision boundaries", async () => {
  const expectations = {
    "pool-equipment-troubleshooting": {
      required: [
        "Start with safe observation", "Pump will not prime or loses prime",
        "Filter concerns: cleaning, repair, or replacement",
        "Plumbing, valves, suction, and return flow",
        "Prepare a useful equipment inspection request", "When to stop and request service",
        "Never open energized equipment", "There is no universal pressure threshold",
      ],
      links: [
        "/services/pool-equipment-repair", "/services/pump-repair-and-installation",
        "/services/filter-repair-replacement", "/services/filter-cleaning",
        "/services/pool-plumbing-repair", "/services/weekly-services",
        "/diy-pool-care/pool-cleaner-robot-troubleshooting",
      ],
      absent: [
        "replace the capacitor", "rewire the motor", "bypass the safety device",
        "open the breaker panel", "run the pump dry",
      ],
    },
    "pool-cleaner-robot-troubleshooting": {
      required: [
        "Robotic cleaner", "Suction-side cleaner", "Pressure-side cleaner",
        "Cleaner will not move", "Cleaner starts and stops",
        "Cleaner will not climb walls or steps", "Cleaner moves but does not pick up debris",
        "Cord, cable, and hose problems", "Pressure-side and Polaris-type concerns",
        "Suction-side cleaner concerns", "Robotic cleaner concerns",
        "Cleaner maintenance checklist", "not a manufacturer relationship",
      ],
      links: [
        "/diy-pool-care/pool-equipment-troubleshooting", "/services/pool-equipment-repair",
        "/services/pump-repair-and-installation", "/services/filter-cleaning",
        "/services/pool-plumbing-repair", "/blog/which-pool-cleaner-is-right",
      ],
      absent: [
        "authorized service", "manufacturer affiliation", "affiliate link",
        "open the power supply", "repair the internal motor", "splice the power cable",
      ],
    },
    "pool-surface-remodeling-guide": {
      required: [
        "Interior pool finish: cleaning, treatment, or renewal",
        "Resurfacing and replastering versus acid washing",
        "Tile and coping: repair, replacement, or remodel scope",
        "Tile repair is different from tile cleaning", "Tile scale and calcium buildup",
        "Pool liner concerns", "Pool deck surface concerns",
        "Pool deck resurfacing concerns the surrounding walking surface",
        "When several issues belong in one remodel", "Photos and quote preparation",
        "does not diagnose structural failure",
      ],
      links: [
        "/services/pool-remodeling", "/services/pool-resurfacing-replastering",
        "/services/pool-tile-coping-repair", "/services/pool-tile-cleaning",
        "/services/pool-liner-repair", "/services/pool-deck-resurfacing-repair",
        "/services/acid-wash",
      ],
      absent: [
        "structural failure diagnosis", "engineering certification", "coating warranty",
        "guaranteed slip resistance", "guaranteed stain removal", "guaranteed repairability",
      ],
    },
  };

  const hubResponse = await get("/diy-pool-care");
  assert.equal(hubResponse.status, 200);
  const hubHtml = stripScripts(hubResponse.html);
  const hubText = text(hubHtml);
  const hubLinks = tags(hubHtml, "a").map((tag) => tag.href);
  for (const heading of ["Routine Care", "Water & Chemistry", "Recovery & Weather", "Equipment & Surfaces", "DIY Pool Care Cheat Sheet"]) {
    assert.ok(hubText.includes(heading), `/diy-pool-care must preserve grouped discovery: ${heading}`);
  }

  for (const [slug, title, expectedDescription] of diyGuides.filter(([slug]) => Object.hasOwn(expectations, slug))) {
    const route = `/diy-pool-care/${slug}`;
    const checks = expectations[slug];
    assert.ok(hubLinks.includes(route), `/diy-pool-care must discover ${route}`);
    const { html: responseHtml, nodes } = await page(route, branded(title));
    const html = stripScripts(responseHtml);
    const visibleText = text(html);
    const lowerText = visibleText.toLowerCase();

    assert.deepEqual(contents(html, "h1"), [title], `${route} intended H1`);
    assert.equal(tags(html, "meta").find((tag) => tag.name === "description")?.content,
      expectedDescription, `${route} intended meta description`);
    assert.ok(tags(html, "nav").some((tag) => tag["aria-label"] === "Breadcrumb"), `${route} visible breadcrumb`);
    assert.equal(entitiesOfType(nodes, "Article").length, 1, `${route} Article schema`);
    assert.equal(entitiesOfType(nodes, "BreadcrumbList").length, 1, `${route} Breadcrumb schema`);
    assert.equal(entitiesOfType(nodes, "HowTo").length, 0, `${route} must not use HowTo schema`);
    assert.equal(entitiesOfType(nodes, "FAQPage").length, 0, `${route} must not use FAQ schema`);
    assert.equal(entitiesOfType(nodes, "Product").length, 0, `${route} must not use Product schema`);
    assert.equal(entitiesOfType(nodes, "Review").length, 0, `${route} must not use Review schema`);

    const links = tags(html, "a").map((tag) => tag.href);
    assert.ok(links.includes("/diy-pool-care"), `${route} must link to the DIY hub`);
    assert.ok(links.includes("/contact"), `${route} must preserve a quote path`);
    assert.ok(!links.includes("/services/bi-weekly-services"), `${route} must not rediscover Biweekly service`);
    assert.ok(!links.some((href) => /amazon|affiliate|utm_source=affiliate/i.test(href)), `${route} must not add affiliate links`);
    for (const phrase of checks.required) {
      assert.ok(lowerText.includes(phrase.toLowerCase()), `${route} must explain: ${phrase}`);
    }
    for (const phrase of checks.absent) {
      assert.ok(!lowerText.includes(phrase.toLowerCase()), `${route} must not claim or instruct: ${phrase}`);
    }
    for (const phrase of [
      "leak detection service", "heater repair", "automation repair", "lighting repair", "water-feature repair",
    ]) assert.ok(!lowerText.includes(phrase), `${route} must not introduce Wave 3 marketing: ${phrase}`);
    for (const href of checks.links) assert.ok(links.includes(href), `${route} must link to ${href}`);
  }

  for (const slug of [
    "weekly-pool-care-guide", "pool-chemistry-troubleshooting", "pool-chemical-dosing-safety",
    "green-cloudy-pool-recovery", "west-texas-storm-pool-care",
  ]) {
    const response = await get(`/diy-pool-care/${slug}`);
    assert.equal(response.status, 200, `Package B1 route must remain intact: ${slug}`);
  }
});
test("Package B3 spa, rental and commercial guides preserve scope and responsibility boundaries", async () => {
  const expectations = {
    "hot-tub-spa-water-care": {
      required: [
        "Why hot tub water changes quickly", "Routine hot tub and spa cleaning",
        "Water testing and controlled adjustment",
        "Bromine and chlorine are different sanitizer approaches",
        "Bromine floaters and dispensers", "Care after heavy or frequent use",
        "Accessible spa filter care", "Cloudy, foamy, or odorous water",
        "Service reports and chemical logs", "Never mix pool or spa chemicals together",
        "not an individualized dosing plan", "does not certify sanitation or health safety",
      ],
      links: [
        "/services/hot-tub-cleaning", "/pool-service-reports",
        "/diy-pool-care/short-term-rental-pool-hot-tub-care",
        "/diy-pool-care/pool-chemistry-troubleshooting",
        "/diy-pool-care/pool-chemical-dosing-safety",
      ],
      absent: [
        "add 2 ounces", "add two ounces", "universal sanitizer target is",
        "guaranteed sanitation", "guaranteed service interval",
      ],
    },
    "short-term-rental-pool-hot-tub-care": {
      required: [
        "hosts, remote owners, and property managers", "Define the property-specific service plan",
        "Routine pool-care observations", "Routine hot tub and spa care",
        "Plan for frequent guest use", "Between-stay and turnover observations",
        "Service reports for remote owners", "Weather, storms, and property conditions",
        "Issue escalation boundaries", "Prepare a useful rental-property quote request",
        "does not provide property management, housekeeping, guest communication",
      ],
      links: [
        "/services/short-term-rental-pool-hot-tub-cleaning", "/services/hot-tub-cleaning",
        "/services/weekly-services", "/pool-service-reports",
        "/diy-pool-care/hot-tub-spa-water-care",
        "/diy-pool-care/west-texas-storm-pool-care",
        "/diy-pool-care/pool-equipment-troubleshooting",
      ],
      absent: [
        "official airbnb partner", "official vrbo partner", "we guarantee guest readiness",
        "guaranteed turnover completion", "same-day service guaranteed",
      ],
    },
    "commercial-pool-service-checklist": {
      required: [
        "hotel, apartment, multifamily", "Define operational responsibilities",
        "Create a property and pool information record", "Define the recurring service scope",
        "Plan service frequency around actual conditions",
        "Coordinate water care and chemicals", "Filter and equipment observations",
        "Reporting and communication standards", "Plan for weather and high-use conditions",
        "Prepare a commercial service proposal request",
        "Professional and regulatory boundaries", "Documentation is not an official inspection",
        "The property owner or operator remains responsible",
      ],
      links: [
        "/services/hotel-apartment-pool-cleaning", "/pool-service-reports",
        "/services/pool-equipment-repair", "/services/filter-cleaning",
        "/services/free-pool-chemical-delivery",
        "/diy-pool-care/pool-equipment-troubleshooting",
        "/diy-pool-care/pool-chemistry-troubleshooting",
        "/diy-pool-care/pool-chemical-dosing-safety",
        "/diy-pool-care/west-texas-storm-pool-care",
      ],
      absent: [
        "compliance guaranteed", "certified pool operator services",
        "fixed staffing included", "fixed chemical inclusion guaranteed",
        "health department inspection service", "lifeguard services included",
      ],
    },
  };

  const hubResponse = await get("/diy-pool-care");
  assert.equal(hubResponse.status, 200);
  const hubHtml = stripScripts(hubResponse.html);
  const hubText = text(hubHtml);
  const hubLinks = tags(hubHtml, "a").map((tag) => tag.href);
  for (const heading of [
    "Routine Care", "Water & Chemistry", "Recovery & Weather", "Equipment & Surfaces",
    "Property & Spa Care", "DIY Pool Care Cheat Sheet",
  ]) assert.ok(hubText.includes(heading), `/diy-pool-care must preserve grouped discovery: ${heading}`);

  for (const [slug, title, expectedDescription] of diyGuides.filter(([slug]) => Object.hasOwn(expectations, slug))) {
    const route = `/diy-pool-care/${slug}`;
    const checks = expectations[slug];
    assert.ok(hubLinks.includes(route), `/diy-pool-care must discover ${route}`);
    const { html: responseHtml, nodes } = await page(route, branded(title));
    const html = stripScripts(responseHtml);
    const visibleText = text(html);
    const lowerText = visibleText.toLowerCase();

    assert.deepEqual(contents(html, "h1"), [title], `${route} intended H1`);
    assert.equal(tags(html, "meta").find((tag) => tag.name === "description")?.content,
      expectedDescription, `${route} intended meta description`);
    assert.ok(tags(html, "nav").some((tag) => tag["aria-label"] === "Breadcrumb"), `${route} visible breadcrumb`);
    assert.equal(entitiesOfType(nodes, "Article").length, 1, `${route} Article schema`);
    assert.equal(entitiesOfType(nodes, "BreadcrumbList").length, 1, `${route} Breadcrumb schema`);
    for (const type of ["HowTo", "FAQPage", "Product", "Review", "LocalBusiness"]) {
      assert.equal(entitiesOfType(nodes, type).length, 0, `${route} must not add ${type} schema`);
    }

    assert.equal(tags(html, "table").length, 0, `${route} must not publish a dosing or target table`);
    const links = tags(html, "a").map((tag) => tag.href);
    assert.ok(links.includes("/diy-pool-care"), `${route} must link to the DIY hub`);
    assert.ok(links.includes("/contact"), `${route} must preserve a quote path`);
    assert.ok(!links.includes("/services/bi-weekly-services"), `${route} must not rediscover Biweekly service`);
    for (const phrase of checks.required) {
      assert.ok(lowerText.includes(phrase.toLowerCase()), `${route} must explain: ${phrase}`);
    }
    for (const phrase of checks.absent) {
      assert.ok(!lowerText.includes(phrase.toLowerCase()), `${route} must not claim: ${phrase}`);
    }
    for (const phrase of [
      "leak detection service", "heater repair", "automation repair", "lighting repair", "water-feature repair",
    ]) assert.ok(!lowerText.includes(phrase), `${route} must not introduce Wave 3 marketing: ${phrase}`);
    for (const href of checks.links) assert.ok(links.includes(href), `${route} must link to ${href}`);
  }

  for (const [slug] of diyGuides.filter(([slug]) => !Object.hasOwn(expectations, slug))) {
    const response = await get(`/diy-pool-care/${slug}`);
    assert.equal(response.status, 200, `Packages B1/B2 route must remain intact: ${slug}`);
  }
});
test("legacy biweekly service remains direct-access, noindex/follow and undiscoverable", async () => {
  const [slug, subject, serviceType] = legacyService;
  const route = `/services/${slug}`;
  const response = await get(route);
  assert.equal(response.status, 200, `${route} must resolve directly without a redirect`);
  assert.equal(response.headers.get("location"), null, `${route} must not redirect`);

  const html = stripScripts(response.html);
  assert.deepEqual(contents(html, "title"), [branded(`${subject} in Abilene, TX`)]);
  assert.deepEqual(tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href),
    [canonical(route)]);
  assert.ok(!sitemapUrls.includes(canonical(route)), `${route} must remain excluded from the sitemap`);

  const robots = tags(html, "meta").filter((tag) => ["robots", "googlebot"].includes(tag.name));
  assert.equal(robots.length, 2, `${route} must define general and Googlebot directives`);
  for (const tag of robots) {
    assert.match(tag.content, /\bnoindex\b/);
    assert.match(tag.content, /\bfollow\b/);
    assert.doesNotMatch(tag.content, /\bnofollow\b/);
  }

  const visibleText = text(html);
  assert.ok(visibleText.includes("New recurring pool-service customers are enrolled on a weekly schedule."));
  assert.ok(visibleText.includes("Existing customer agreements are unchanged."));
  assert.ok(tags(html, "a").some((tag) => tag.href === "/services/weekly-services"));

  const serviceEntities = entitiesOfType(jsonLd(response.html), "Service");
  assert.equal(serviceEntities.length, 1);
  assert.equal(serviceEntities[0].serviceType, serviceType);
});
test("public discovery pages offer weekly service without linking to legacy biweekly service", async () => {
  for (const route of ["/", "/services", "/diy-pool-care",
    ...locations.map(([slug]) => `/locations/${slug}`),
    ...services.map(([slug]) => `/services/${slug}`),
    ...articles.map(([slug]) => `/blog/${slug}`)]) {
    const response = await get(route);
    assert.equal(response.status, 200, `${route} discovery check`);
    const links = tags(stripScripts(response.html), "a").map((tag) => tag.href);
    assert.ok(!links.includes(`/services/${legacyService[0]}`), `${route} must not expose the legacy service`);
  }

  for (const route of ["/", "/services", ...locations.map(([slug]) => `/locations/${slug}`)]) {
    const response = await get(route);
    const links = tags(stripScripts(response.html), "a").map((tag) => tag.href);
    assert.ok(links.includes("/services/weekly-services"), `${route} must retain weekly service discovery`);
  }
});
for (const [slug, name, hasSeoTitle] of locations) {
  test(`location ${slug}: canonical, title and shared Organization`, async () => {
    await page(`/locations/${slug}`, branded(hasSeoTitle
      ? `Pool Cleaning & Pool Service in ${name}, TX` : `Pool Service in ${name}`));
  });
}
test("Package 08 area pages preserve useful service, availability and quote paths without template substitution", async () => {
  const targetLocations = [
    ["north-abilene", "North Abilene"],
    ["south-abilene", "South Abilene"],
    ["abilene-wylie", "Abilene Wylie"],
    ["clyde", "Clyde"],
    ["tuscola", "Tuscola"],
    ["merkel", "Merkel"],
  ];
  const normalizedMainText = new Map();
  const unsupportedClaims = [
    "Shipwrecked Pools office in",
    "local branch",
    "assigned technician",
    "completed pool job in",
    "same-day availability",
    "guaranteed availability",
  ];

  for (const [slug, name] of targetLocations) {
    const route = `/locations/${slug}`;
    const response = await get(route);
    assert.equal(response.status, 200, `${route} must remain HTTP 200`);
    const html = stripScripts(response.html);
    const visibleText = text(html);
    assert.equal(contents(html, "h1").length, 1, `${route} must retain one H1`);
    assert.deepEqual(tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href),
      [canonical(route)], `${route} canonical`);
    assert.ok(visibleText.includes(name === "Abilene Wylie" ? "Wylie" : name), `${route} location intent`);
    assert.ok(visibleText.toLowerCase().includes("weekly"), `${route} must retain the weekly-service path`);
    assert.ok(visibleText.toLowerCase().includes("address"), `${route} must explain address-based confirmation`);
    assert.match(visibleText.toLowerCase(), /availability|route fit|confirm weekly route/,
      `${route} must qualify route availability`);
    for (const claim of unsupportedClaims) {
      assert.ok(!visibleText.toLowerCase().includes(claim.toLowerCase()), `${route} must not claim: ${claim}`);
    }
    const links = tags(html, "a").map((tag) => tag.href);
    assert.ok(links.includes("/contact"), `${route} must retain the quote/contact path`);
    assert.ok(links.includes("/locations"), `${route} must link to the locations hub`);
    assert.ok(links.includes("/services/weekly-services"), `${route} must link to weekly service`);
    assert.ok(!links.includes("/services/bi-weekly-services"), `${route} must not rediscover legacy biweekly service`);

    normalizedMainText.set(slug,
      visibleText.replaceAll(name, "[LOCATION]").replaceAll("Wylie", "[LOCATION]"));
  }

  const normalizedPages = [...normalizedMainText.values()];
  assert.equal(new Set(normalizedPages).size, normalizedPages.length,
    "Target location pages must not be exact location-name substitutions");
});
for (const [slug, title, published, summary, relatedServices] of articles) {
  test(`article ${slug}: canonical, title, one H1, content and author/publisher identity`, async () => {
    const route = `/blog/${slug}`;
    const { html, nodes } = await page(route, branded(title));
    assert.deepEqual(contents(html, "h1"), [title]);
    assert.ok(contents(html, "h2").includes("Related Articles"));
    assert.equal(contents(html, "h3").length, 3, "Related article headings must survive");
    assert.ok(text(html).includes(summary), "Article summary must remain visible");
    assert.ok(tags(html, "nav").some((tag) => tag["aria-label"] === "Breadcrumb"));
    const links = new Set(tags(html, "a").map((tag) => tag.href));
    for (const href of ["/", "/blog", "/contact", ...relatedServices.map((service) => `/services/${service}`)]) {
      assert.ok(links.has(href), `Preserve crawlable article link ${href}`);
    }
    const articleEntities = entitiesOfType(nodes, "Article");
    assert.equal(articleEntities.length, 1);
    const breadcrumbEntities = entitiesOfType(nodes, "BreadcrumbList");
    assert.equal(breadcrumbEntities.length, 1, `${route} BreadcrumbList schema`);
    assert.equal(breadcrumbEntities[0]["@id"], `${canonical(route)}#breadcrumb`);
    const article = articleEntities[0];
    assert.equal(article.headline, title);
    assert.equal(article.datePublished, published);
    assert.equal(article.dateModified, published);
    assert.equal(article.mainEntityOfPage, canonical(route));
    for (const role of ["author", "publisher"]) {
      assert.equal(article[role]["@type"], "Organization");
      assert.equal(article[role].name, brand);
      assert.equal(article[role]["@id"], organizationId);
    }
    assert.equal(article.publisher.url, origin);
  });
}

test("Package 09 articles retain intent and add supported contextual service paths", async () => {
  const expectations = {
    "how-to-clean-cartridge-filters": {
      links: ["/services/filter-cleaning"],
      required: ["this cartridge procedure does not apply to every filter type"],
      forbidden: ["PSI threshold", "every 6 months"],
    },
    "salt-pool-maintenance-checklist": {
      links: ["/services/weekly-services"],
      required: ["Salt pools are not maintenance-free"],
      forbidden: ["salt-cell repair", "warranty"],
    },
    "low-calcium-pool-corrosion-risk": {
      links: ["/services/weekly-services"],
      required: ["without guaranteeing prevention of every corrosion issue"],
      forbidden: ["guarantees prevention", "calcium target"],
    },
    "fiberglass-pool-maintenance-tips": {
      links: ["/services/weekly-services"],
      required: ["applicable routine cleaning, chemistry care, and equipment observations"],
      forbidden: ["structural repair", "resurfacing"],
    },
    "which-pool-cleaner-is-right": {
      links: ["/services/weekly-services"],
      required: ["Choosing a cleaner means owning and managing equipment"],
      forbidden: ["we sell", "manufacturer partner"],
    },
    "black-algae-the-pool-owners-nightmare": {
      links: ["/services/algae-removal", "/services/weekly-services"],
      required: [
        "not every dark pool spot is black algae",
        "evaluated and handled apart from routine maintenance",
        "After corrective work is complete and the water has stabilized",
      ],
      forbidden: ["guaranteed removal", "guaranteed recovery"],
    },
  };

  for (const [slug, checks] of Object.entries(expectations)) {
    const route = `/blog/${slug}`;
    const response = await get(route);
    assert.equal(response.status, 200, `${route} must remain HTTP 200`);
    const html = stripScripts(response.html);
    const visibleText = text(html);
    const links = tags(html, "a").map((tag) => tag.href);
    for (const href of checks.links) assert.ok(links.includes(href), `${route} must link to ${href}`);
    for (const phrase of checks.required) assert.ok(visibleText.includes(phrase), `${route} must explain: ${phrase}`);
    for (const phrase of checks.forbidden) {
      assert.ok(!visibleText.toLowerCase().includes(phrase.toLowerCase()), `${route} must not claim: ${phrase}`);
    }
  }

  const incoming = new Map(indexableRoutes.map((route) => [route, new Set()]));
  for (const sourceRoute of indexableRoutes) {
    const response = await get(sourceRoute);
    assert.equal(response.status, 200, `${sourceRoute} link-graph source`);
    for (const tag of tags(stripScripts(response.html), "a")) {
      if (!tag.href) continue;
      const target = new URL(tag.href, origin);
      if (target.origin !== origin) continue;
      const targetRoute = target.pathname === "/" ? "/" : target.pathname.replace(/\/$/, "");
      if (incoming.has(targetRoute) && targetRoute !== sourceRoute) incoming.get(targetRoute).add(sourceRoute);
    }
  }

  assert.ok(incoming.get("/blog/black-algae-the-pool-owners-nightmare").has("/services/algae-removal"));
  assert.ok(incoming.get("/blog/salt-pool-maintenance-checklist").has("/services/weekly-services"));
  const orphanCandidates = [...incoming].filter(([route, sources]) => route !== "/" && sources.size === 0);
  assert.deepEqual(orphanCandidates, [], "Every sitemapped indexable route must have a rendered incoming link");
});

test("Package C situational articles and final contextual link network remain safe and discoverable", async () => {
  const expectations = {
    "pool-care-after-freeze-power-outage": {
      required: [
        "Safety first", "After freezing weather", "After a power outage",
        "Water and chemistry after interruption", "Filter and circulation observations",
        "A lack of visible damage does not prove", "Do not touch damaged electrical components",
        "There is no universal pressure threshold", "Professional help is appropriate",
      ],
      links: [
        "/diy-pool-care/pool-equipment-troubleshooting",
        "/diy-pool-care/pool-chemistry-troubleshooting",
        "/diy-pool-care/west-texas-storm-pool-care",
        "/services/pool-equipment-repair", "/services/pump-repair-and-installation",
        "/services/pool-plumbing-repair", "/services/one-time-cleans", "/services/weekly-services",
      ],
      forbidden: ["reset the breaker repeatedly", "rewire", "guaranteed freeze protection", "same-day emergency"],
    },
    "west-texas-heat-dust-pollen-pool-care": {
      required: [
        "West Texas heat", "Dust and wind", "Pollen and organic debris",
        "Mowing, landscaping, and nearby work", "Water testing and controlled adjustment",
        "Filter and circulation", "Conditions—not a universal schedule",
        "pool service does not include unrelated landscaping or construction cleanup",
      ],
      links: [
        "/diy-pool-care/weekly-pool-care-guide", "/diy-pool-care/west-texas-storm-pool-care",
        "/diy-pool-care/pool-equipment-troubleshooting", "/services/weekly-services",
        "/services/one-time-cleans", "/services/filter-cleaning",
      ],
      forbidden: ["evaporates one inch", "fixed summer schedule", "guaranteed clarity"],
    },
    "pool-care-after-parties-vacations-heavy-use": {
      required: [
        "Before a party or high-use period", "After heavy use",
        "After a vacation or long absence", "Renters, guests, and changing occupancy",
        "Hot tub or spa heavy use", "Filter and circulation observations",
        "Routine care is not enough", "Plan the service path by condition",
        "not property-management or housekeeping guidance",
      ],
      links: [
        "/diy-pool-care/weekly-pool-care-guide", "/diy-pool-care/hot-tub-spa-water-care",
        "/diy-pool-care/green-cloudy-pool-recovery", "/services/weekly-services",
        "/services/one-time-cleans", "/services/algae-removal",
        "/services/short-term-rental-pool-hot-tub-cleaning", "/services/hot-tub-cleaning",
      ],
      forbidden: ["guaranteed event readiness", "guaranteed sanitation", "fixed turnaround time"],
    },
  };

  const hubResponse = await get("/blog");
  assert.equal(hubResponse.status, 200);
  const hubHtml = stripScripts(hubResponse.html);
  const hubLinks = tags(hubHtml, "a").map((tag) => tag.href);
  const descriptions = new Set();

  for (const [slug, checks] of Object.entries(expectations)) {
    const route = `/blog/${slug}`;
    assert.ok(hubLinks.includes(route), `/blog must discover ${route}`);
    const articleRecord = articles.find(([candidate]) => candidate === slug);
    assert.ok(articleRecord, `${route} inventory record`);
    const [, title] = articleRecord;
    const { html: responseHtml, nodes } = await page(route, branded(title));
    const html = stripScripts(responseHtml);
    const visibleText = text(html);
    const lowerText = visibleText.toLowerCase();
    assert.deepEqual(contents(html, "h1"), [title]);
    const description = tags(html, "meta").find((tag) => tag.name === "description")?.content;
    assert.ok(description && !descriptions.has(description), `${route} distinct meta description`);
    descriptions.add(description);
    assert.equal(entitiesOfType(nodes, "Article").length, 1);
    assert.equal(entitiesOfType(nodes, "BreadcrumbList").length, 1);
    for (const type of ["HowTo", "FAQPage", "Product", "Review", "LocalBusiness"]) {
      assert.equal(entitiesOfType(nodes, type).length, 0, `${route} must not add ${type} schema`);
    }
    const links = tags(html, "a").map((tag) => tag.href);
    for (const phrase of checks.required) assert.ok(lowerText.includes(phrase.toLowerCase()), `${route}: ${phrase}`);
    for (const phrase of checks.forbidden) assert.ok(!lowerText.includes(phrase.toLowerCase()), `${route} must not claim: ${phrase}`);
    for (const phrase of ["heater repair", "automation repair", "lighting repair", "water-feature repair", "leak detection service"]) {
      assert.ok(!lowerText.includes(phrase), `${route} must not introduce Wave 3 marketing: ${phrase}`);
    }
    for (const href of checks.links) assert.ok(links.includes(href), `${route} must link to ${href}`);
  }

  const contextualNetwork = {
    "/blog/how-to-clean-cartridge-filters": ["/diy-pool-care/pool-equipment-troubleshooting"],
    "/blog/low-calcium-pool-corrosion-risk": ["/diy-pool-care/pool-chemistry-troubleshooting"],
    "/blog/fiberglass-pool-maintenance-tips": ["/diy-pool-care/weekly-pool-care-guide"],
    "/blog/which-pool-cleaner-is-right": [
      "/diy-pool-care/pool-cleaner-robot-troubleshooting", "/diy-pool-care/pool-equipment-troubleshooting",
    ],
    "/blog/black-algae-the-pool-owners-nightmare": ["/diy-pool-care/green-cloudy-pool-recovery"],
    "/blog/salt-pool-maintenance-checklist": [
      "/diy-pool-care/pool-chemistry-troubleshooting", "/diy-pool-care/pool-chemical-dosing-safety",
    ],
    "/diy-pool-care/west-texas-storm-pool-care": [
      "/blog/pool-care-after-freeze-power-outage", "/blog/west-texas-heat-dust-pollen-pool-care",
    ],
    "/diy-pool-care/weekly-pool-care-guide": ["/blog/pool-care-after-parties-vacations-heavy-use"],
    "/diy-pool-care/hot-tub-spa-water-care": ["/blog/pool-care-after-parties-vacations-heavy-use"],
    "/diy-pool-care/short-term-rental-pool-hot-tub-care": ["/blog/pool-care-after-parties-vacations-heavy-use"],
  };
  for (const [route, expectedLinks] of Object.entries(contextualNetwork)) {
    const response = await get(route);
    const links = tags(stripScripts(response.html), "a").map((tag) => tag.href);
    for (const href of expectedLinks) assert.ok(links.includes(href), `${route} must contextually link to ${href}`);
  }
});

test("pay-now retains its exact portal redirect without following it", async () => {
  const response = await get("/pay-now");
  if (response.status >= 300 && response.status < 400) {
    assert.equal(response.status, 307, "Preserve Next redirect's temporary status");
    assert.equal(response.headers.get("location"), portal);
  } else {
    assert.equal(response.status, 200, "Only Next's streamed redirect may return 200");
    const refresh = tags(stripScripts(response.html), "meta")
      .filter((tag) => tag["http-equiv"]?.toLowerCase() === "refresh");
    assert.equal(refresh.length, 1, "Streamed redirect must include a refresh instruction");
    assert.match(refresh[0].content, /^\d+\s*;\s*url=/i);
    assert.equal(refresh[0].content.replace(/^\d+\s*;\s*url=/i, ""), portal);
  }
});
