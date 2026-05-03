import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.164"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/icon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/pages/acid-wash",
        destination: "/services/acid-wash",
        permanent: true,
      },
      {
        source: "/pages/green-to-cleans",
        destination: "/services/algae-removal",
        permanent: true,
      },
      {
        source: "/pages/contact",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/pages/baird-pool-service",
        destination: "/locations/baird",
        permanent: true,
      },
      {
        source: "/pages/buffalo-gap-pool-service",
        destination: "/locations/buffalo-gap",
        permanent: true,
      },
      {
        source: "/pages/clyde-pool-service",
        destination: "/locations/clyde",
        permanent: true,
      },
      {
        source: "/pages/hamby-pool-service",
        destination: "/locations/hamby",
        permanent: true,
      },
      {
        source: "/pages/hawley-pool-service",
        destination: "/locations/hawley",
        permanent: true,
      },
      {
        source: "/pages/merkel-pool-service",
        destination: "/locations/merkel",
        permanent: true,
      },
      {
        source: "/pages/potosi-pool-service",
        destination: "/locations/potosi",
        permanent: true,
      },
      {
        source: "/pages/tuscola-pool-service",
        destination: "/locations/tuscola",
        permanent: true,
      },
      {
        source: "/pages/tye-pool-service",
        destination: "/locations/tye",
        permanent: true,
      },
      {
        source: "/products/weekly-cleaning-service-text-325-665-8877-for-a-quote",
        destination: "/services/weekly-services",
        permanent: true,
      },
      {
        source: "/blogs/news/how-to-clean-cartridge-filters",
        destination: "/blog/how-to-clean-cartridge-filters",
        permanent: true,
      },
      {
        source: "/blogs/news/low-calcium-pool-corrosion-risk",
        destination: "/blog/low-calcium-pool-corrosion-risk",
        permanent: true,
      },
      {
        source: "/blogs/news/fiberglass-pool-maintenance-tips",
        destination: "/blog/fiberglass-pool-maintenance-tips",
        permanent: true,
      },
      {
        source: "/blogs/news/which-pool-cleaner-is-right",
        destination: "/blog/which-pool-cleaner-is-right",
        permanent: true,
      },
      {
        source: "/blogs/news/black-algae-the-pool-owners-nightmare",
        destination: "/blog/black-algae-the-pool-owners-nightmare",
        permanent: true,
      },
      {
        source: "/blogs/news/salt-pool-maintenance-checklist",
        destination: "/blog/salt-pool-maintenance-checklist",
        permanent: true,
      },
      {
        source: "/services/weekly-bi-weekly-pool-service",
        destination: "/services/weekly-services",
        permanent: true,
      },
      {
        source: "/services/algae-removal-green-to-clean",
        destination: "/services/algae-removal",
        permanent: true,
      },
      {
        source: "/services/drain-refill",
        destination: "/services/drain-and-refill",
        permanent: true,
      },
      {
        source: "/services/pump-repair-installation",
        destination: "/services/pump-repair-and-installation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
