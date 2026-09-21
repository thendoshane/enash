import Logo from "@/components/Logo";
import { company, socials } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-intro">
          <Logo footer />
          <p>Practical software, web, AI, cloud and data work for startups, new companies and growing teams.</p>
          <a className="footer-big-link" href="/request">Request a project <span>↗</span></a>
        </div>

        <div className="footer-column">
          <h2>Requests</h2>
          <a href="/contact?type=proposal">Request a proposal</a>
          <a href="/contact?type=company-documents">Request company documents</a>
          <a href="/procurement">Request procurement support</a>
          <a href="/request">Start a project request</a>
        </div>

        <div className="footer-column">
          <h2>Company</h2>
          <a href="/about">About ENASH</a>
          <a href="/services">Services</a>
          <a href="/privacy">Privacy</a>
          <span className="footer-note">Company documents available on request: B-BBEE certificate and CSD report.</span>
        </div>

        <div className="footer-column">
          <h2>Contact</h2>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
          <a href="https://wa.me/27787181100" target="_blank" rel="noreferrer">WhatsApp</a>
          <span>{company.location}</span>
          <div className="social-links" aria-label="ENASH social profiles">
            {socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ENASH</span>
        <span>A product brand of {company.legalName}</span>
        <span>@enashcloud</span>
      </div>
    </footer>
  );
}
