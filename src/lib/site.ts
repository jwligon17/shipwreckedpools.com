import { site } from "@/content/site";

export const isSiteLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export function getServiceBySlug(slug: string) {
  return site.services.find((service) => service.slug === slug);
}

export function getLocationBySlug(slug: string) {
  return site.locations.find((location) => location.slug === slug);
}
