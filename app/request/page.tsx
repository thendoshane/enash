import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectRequestForm from "@/components/ProjectRequestForm";
import { getService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Request a Project",
  description: "Request a software, website, AI, cloud, data or MVP project from ENASH. Prepare the brief manually or use AI-assisted project discovery.",
  alternates: { canonical: "/request" },
};

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service = "" } = await searchParams;
  const selected = getService(service);
  return (
    <><Header /><main><section className="subpage-hero request-page-hero"><div className="container narrow"><div className="eyebrow">Project request</div><h1>{selected ? `Request ${selected.shortTitle}.` : "Start with the idea. We’ll help shape the build."}</h1><p className="hero-copy">Choose manual project request or use the ENASH AI assistant to structure the idea before it reaches our team.</p></div></section><section className="section form-page"><div className="container form-page-grid"><div><div className="section-kicker">What happens next</div><ol className="simple-steps"><li><span>01</span><p>We review the request and confirm whether the project is a fit.</p></li><li><span>02</span><p>We clarify scope, priorities, timing and any missing technical information.</p></li><li><span>03</span><p>You receive the next-step recommendation or project proposal before implementation starts.</p></li></ol></div><ProjectRequestForm initialService={selected?.slug || ""} /></div></section></main><Footer /></>
  );
}
