import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Privacy", description: "ENASH website privacy information for contact and project request submissions.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <><Header /><main><section className="subpage-hero"><div className="container narrow"><div className="eyebrow">Privacy</div><h1>Information submitted through ENASH forms.</h1><p className="hero-copy">We use information submitted through project, contact and procurement forms to respond to the request and communicate about the relevant service.</p></div></section><section className="section"><div className="container narrow prose"><h2>What is submitted</h2><p>Forms can include your name, business details, email address, phone number, project information, procurement information and any other details you choose to send.</p><h2>How it is used</h2><p>The information is used to review and respond to enquiries, prepare requested documents or proposals, and discuss requested services. AI-assisted project discovery messages are included with the project request so the ENASH team can review the context.</p><h2>Contact</h2><p>For privacy-related questions, contact <a className="inline-link" href="mailto:contactus@enash.co.za">contactus@enash.co.za</a>.</p></div></section></main><Footer /></>;
}
