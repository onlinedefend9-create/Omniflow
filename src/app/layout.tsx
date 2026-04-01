import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "OneFlow | One Flow. All Platforms. Global Impact.",
  description: "The high-performance engine for creators to dominate TikTok, YouTube, and Meta in one click. Global social media multi-publisher.",
  keywords: ["multi-publication", "SaaS social media", "TikTok automation", "YouTube Shorts scheduler", "OneFlow", "social media management", "OAuth2 hub", "global reach"],
  authors: [{ name: "OneFlow Team" }],
  metadataBase: new URL("https://oneflow.site"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "fr-FR": "/fr-FR",
    },
  },
  openGraph: {
    title: "OneFlow | Dominate All Social Networks",
    description: "Create once, broadcast everywhere. The most secure multi-publication platform.",
    url: "https://oneflow.site",
    siteName: "OneFlow",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OneFlow",
    "operatingSystem": "Web",
    "applicationCategory": "SocialNetworkingApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "areaServed": "Worldwide"
    },
    "description": "The high-performance engine for creators to dominate TikTok, YouTube, and Meta in one click."
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <meta name="tiktok-developers-site-verification" content="1NN0n1viZIBsPmHOlNFFcR4TLxonnf2U" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="dark font-sans bg-background text-foreground antialiased overflow-x-hidden relative">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
