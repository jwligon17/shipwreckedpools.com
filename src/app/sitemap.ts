import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/locations",
    "/diy-pool-care",
    "/blog",
    "/careers",
    "/contact",
    "/pay-now",
  ];

  const serviceRoutes = site.services.map((service) => `/services/${service.slug}`);
  const locationRoutes = site.locations.map((location) => `/locations/${location.slug}`);
  const blogRoutes = site.blogSummaries.map((post) => `/blog/${post.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
