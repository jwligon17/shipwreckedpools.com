import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.164"],
  async redirects() {
    return [
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
