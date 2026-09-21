import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact ENASH",
  description: "Contact ENASH for general enquiries, proposals, company documents, B-BBEE certificate, CSD report or procurement support.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type = "general" } = await searchParams;
  return (
    <><Header /><main><section className="subpage-hero"><div className="container narrow"><div className="eyebrow">Contact ENASH</div><h1>General enquiries, proposals and company documents.</h1><p className="hero-copy">Email <a className="inline-link" href={`mailto:${company.email}`}>{company.email}</a> or call <a className="inline-link" href={`tel:${company.phone}`}>{company.phoneDisplay}</a>. You can also use the form below.</p></div></section><section className="section form-page"><div className="container form-page-grid"><div><div className="section-kicker">Available requests</div><div className="contact-options"><article><strong>Proposal</strong><p>Ask for a project proposal after sharing the service or outcome you need.</p></article><article><strong>Company documents</strong><p>Request the ENASH / company B-BBEE certificate and CSD report by email.</p></article><article><strong>Procurement</strong><p>For RFQs, RFPs, RFIs, tender support and technology sourcing, use the procurement option or dedicated page.</p></article></div></div><InquiryForm initialType={type} /></div></section></main><Footer /></>
  );
}
