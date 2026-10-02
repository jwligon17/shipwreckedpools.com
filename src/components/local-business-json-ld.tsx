import { site } from "@/content/site";
import { siteUrl } from "@/lib/site";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.brand.name,
    description: site.brand.description,
    url: siteUrl,
    telephone: site.brand.phone,
    founder: {
      "@type": "Person",
      name: site.brand.owner,
    },
    areaServed: site.locations.map((location) => ({
      "@type": "AdministrativeArea",
      name: location.name,
    })),
    sameAs: site.socialLinks.filter((link) => link.enabled).map((link) => link.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
