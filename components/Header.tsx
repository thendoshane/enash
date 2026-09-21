import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <nav className="nav-group nav-left" aria-label="Primary navigation">
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/procurement">Procurement</a>
        </nav>

        <a className="nav-brand" href="/" aria-label="ENASH home">
          <Logo />
        </a>

        <nav className="nav-group nav-right" aria-label="Contact navigation">
          <a href="/contact">Contact</a>
          <a className="nav-cta" href="/request">Request project</a>
        </nav>
      </div>
    </header>
  );
}
