import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brand.name,
    description: site.brand.description,
    url: siteUrl,
    telephone: site.brand.phone,
    founder: site.brand.owner,
    areaServed: site.locations.map((location) => location.name),
    serviceType: site.services.map((service) => service.name),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
