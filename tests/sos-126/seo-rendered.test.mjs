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
  ["/services", branded("Pool Services in Abilene, TX")],
  ["/locations", branded("Service Areas")],
  ["/diy-pool-care", branded("DIY Pool Care Cheat Sheet")],
  ["/blog", branded("Pool Care Blog")],
  ["/careers", "Careers at Shipwrecked Pools"],
  ["/contact", branded("Get a Pool Service Quote in Abilene, TX")],
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
const routes = ["/", ...hubs.map(([route]) => route),
  ...services.map(([slug]) => `/services/${slug}`),
  `/services/${legacyService[0]}`,
  ...locations.map(([slug]) => `/locations/${slug}`),
  ...articles.map(([slug]) => `/blog/${slug}`)];
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
for (const [slug, subject, serviceType] of services) {
  test(`service ${slug}: canonical, title and page-specific Service`, async () => {
    const route = `/services/${slug}`;
    const { nodes } = await page(route, branded(`${subject} in Abilene, TX`));
    const serviceEntities = entitiesOfType(nodes, "Service");
    assert.equal(serviceEntities.length, 1);
    const service = serviceEntities[0];
    assert.equal(service["@id"], `${canonical(route)}#service`);
    assert.equal(service.name, `${subject} in Abilene, TX`);
    assert.equal(service.serviceType, serviceType);
    assert.equal(service.areaServed, "Abilene, TX");
    assert.equal(service.url, canonical(route));
    assert.equal(service.provider["@id"], organizationId);
    assert.ok(!service.provider["@type"] || service.provider["@type"] === "Organization");
  });
}
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
