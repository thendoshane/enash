import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  ['Services', '/services'],
  ['Developed Systems', '/projects'],
  ['Procurement', '/procurement'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar-wrap">
      <nav className="navbar container" aria-label="Primary navigation">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">E</span>
          <span className="brand-copy"><strong>ENASH</strong><small>InDesign &amp; Developers</small></span>
        </Link>

        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
          <Link className="btn btn-primary nav-cta" to="/request-service" onClick={() => setOpen(false)}>
            Start a project <ArrowUpRight size={16} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
