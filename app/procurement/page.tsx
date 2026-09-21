import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Technology Procurement, RFQ & RFP Support South Africa",
  description: "Request ENASH procurement support for technology RFQs, RFPs, RFIs, tenders, supplier sourcing and solution quotations in South Africa.",
  keywords: ["technology procurement South Africa", "RFQ technology supplier", "RFP IT services South Africa", "ICT procurement support", "software quotation South Africa"],
  alternates: { canonical: "/procurement" },
};

export default function ProcurementPage() {
  return (
    <><Header /><main><section className="subpage-hero"><div className="container narrow"><div className="eyebrow">Procurement services</div><h1>RFQs, RFPs, technology sourcing and supplier responses.</h1><p className="hero-copy">Send ENASH a procurement request when your organisation needs a technology quote, proposal, supplier response or sourcing support.</p></div></section><section className="section"><div className="container value-grid procurement-values"><article><span>01</span><h3>RFQ / quotation</h3><p>Share the requirement, quantity, specification, deadline and reference details for a quotation request.</p></article><article><span>02</span><h3>RFP / RFI response</h3><p>Send the scope or request information so we can review fit and prepare the appropriate response.</p></article><article><span>03</span><h3>Technology sourcing</h3><p>Request sourcing or solution guidance for software, cloud, digital services or related technology requirements.</p></article></div></section><section className="section soft-section form-page"><div className="container form-page-grid"><div><div className="section-kicker">Procurement contact form</div><h2>Send the requirement.</h2><p className="lead">Include the reference number and deadline where applicable. You can provide the core requirement in the form and we will follow up for supporting documents if needed.</p></div><InquiryForm procurementOnly /></div></section></main><Footer /></>
  );
}
