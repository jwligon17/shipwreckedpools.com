import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LocalBusinessJsonLd } from "@/components/local-business-json-ld";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { site } from "@/content/site";
import { isSiteLive, siteUrl } from "@/lib/site";

import "./globals.css";

const sans = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.brand.name} | Pool Service in Abilene, TX`,
    template: `%s | ${site.brand.name}`,
  },
  description: site.brand.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.brand.name,
    title: `${site.brand.name} | Pool Service in Abilene, TX`,
    description: site.brand.description,
  },
  twitter: {
    card: "summary",
    title: `${site.brand.name} | Pool Service in Abilene, TX`,
    description: site.brand.description,
  },
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    index: isSiteLive,
    follow: isSiteLive,
    googleBot: {
      index: isSiteLive,
      follow: isSiteLive,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>
        <LocalBusinessJsonLd />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
        </div>
        <MobileStickyCta />
      </body>
    </html>
  );
}
