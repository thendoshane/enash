import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const core = [
    { url: `${siteUrl}/`, priority: 1, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/request`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/contact`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/procurement`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
  ].map((item) => ({ ...item, lastModified }));
  const servicePages = services.map((service) => ({ url: `${siteUrl}/services/${service.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.85 }));
  return [...core, ...servicePages];
}
