import type { Metadata, Viewport } from "next";
import { Fraunces, Sora } from "next/font/google";
import Script from "next/script";

import { AnalyticsEvents } from "@/components/analytics-events";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LocalBusinessJsonLd } from "@/components/local-business-json-ld";
import { site } from "@/content/site";
import { isSiteLive, siteUrl } from "@/lib/site";

import "./globals.css";

const sans = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  preload: false,
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b1e4b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KM6X4R2T21"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag("js", new Date());
            gtag("config", "G-KM6X4R2T21");
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ytj18y7wo9");
          `}
        </Script>
        <AnalyticsEvents />
        <LocalBusinessJsonLd />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
