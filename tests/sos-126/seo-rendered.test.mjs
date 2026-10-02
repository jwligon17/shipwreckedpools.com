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
  ["bi-weekly-services", "Bi-Weekly Pool Service", "Bi-Weekly Services"],
  ["algae-removal", "Green-to-Clean Pool Cleanup", "Algae Removal"],
  ["acid-wash", "Pool Acid Wash", "Acid Wash"],
  ["drain-and-refill", "Pool Drain & Refill", "Drain & Refill"],
  ["filter-cleaning", "Pool Filter Cleaning", "Filter Cleaning"],
  ["sand-replacement", "Pool Filter Sand Replacement", "Sand Replacement"],
  ["pump-repair-and-installation", "Pool Pump Repair & Installation", "Pump Repair and Installation"],
  ["one-time-cleans", "One-Time Pool Cleaning", "One Time Cleans"],
];
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
  ...locations.map(([slug]) => `/locations/${slug}`),
  ...articles.map(([slug]) => `/blog/${slug}`)];
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
  assert.deepEqual([...sitemapUrls].sort(), routes.map(canonical).sort());
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
for (const [slug, name, hasSeoTitle] of locations) {
  test(`location ${slug}: canonical, title and shared Organization`, async () => {
    await page(`/locations/${slug}`, branded(hasSeoTitle
      ? `Pool Cleaning & Pool Service in ${name}, TX` : `Pool Service in ${name}`));
  });
}
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
