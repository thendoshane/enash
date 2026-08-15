import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  ['About', '/about'],
  ['Services', '/services'],
  ['Developed Systems', '/projects'],
  ['Industries', '/industries'],
  ['Procurement', '/procurement'],
  ['Company Documents', '/compliance'],
  ['Contact', '/contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar-wrap">
      <nav className="navbar container" aria-label="Primary navigation">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">E</span>
          <span><strong>ENASH</strong><small>InDesign & Developers</small></span>
        </Link>
        <button className="menu-button" onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation">{open ? <X size={24} /> : <Menu size={24} />}</button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>)}
          <Link className="btn btn-primary nav-cta" to="/request-service" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={17} /></Link>
        </div>
      </nav>
    </header>
  );
}
