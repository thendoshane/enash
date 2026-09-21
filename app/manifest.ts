import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "ENASH", short_name: "ENASH", description: "Software, websites, AI, cloud, data and MVP development for South African startups and companies.", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#ffffff", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
