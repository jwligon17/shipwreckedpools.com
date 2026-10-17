import type { MetadataRoute } from "next";

import { diyGuides } from "@/content/diy-guides";
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
    "/pool-service-reports",
  ];

  const serviceRoutes = site.services
    .filter((service) => service.slug !== "bi-weekly-services")
    .map((service) => `/services/${service.slug}`);
  const locationRoutes = site.locations.map((location) => `/locations/${location.slug}`);
  const blogRoutes = site.blogSummaries.map((post) => `/blog/${post.slug}`);
  const diyGuideRoutes = diyGuides.map((guide) => `/diy-pool-care/${guide.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes, ...diyGuideRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
