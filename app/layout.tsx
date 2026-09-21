import type { Metadata, Viewport } from "next";
import "./globals.css";
import { company, siteUrl, socials } from "@/lib/site";

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ENASH | Software, Websites, AI & Cloud for South African Startups",
    template: "%s | ENASH",
  },
  description: "ENASH provides affordable software development, websites, AI automation, cloud, data and MVP development for startups and growing companies in South Africa.",
  applicationName: "ENASH",
  category: "technology",
  keywords: ["ENASH", "software development South Africa", "affordable software development", "web development Johannesburg", "AI automation South Africa", "MVP development South Africa", "startup technology partner"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "ENASH",
    locale: "en_ZA",
    title: "ENASH | Practical technology for startups and growing companies",
    description: "Software, websites, AI, cloud, data and MVP development in South Africa.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ENASH technology services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ENASH | Practical technology for startups and growing companies",
    description: "Software, websites, AI, cloud, data and MVP development in South Africa.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.brand,
    legalName: company.legalName,
    url: siteUrl,
    email: company.email,
    telephone: company.phone,
    sameAs: socials.map((item) => item.href),
    address: { "@type": "PostalAddress", addressLocality: "Johannesburg", addressRegion: "Gauteng", addressCountry: "ZA" },
    areaServed: { "@type": "Country", name: "South Africa" },
    contactPoint: [{ "@type": "ContactPoint", telephone: company.phone, email: company.email, contactType: "sales and customer enquiries", areaServed: "ZA", availableLanguage: "English" }],
    description: "A South African technology company providing software, website, AI, cloud, data, MVP and procurement services.",
  };

  return <html lang="en-ZA"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
