import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const links = [['About', '/about'], ['Company', '/company']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar-wrap">
      <nav className="navbar container" aria-label="Primary navigation">
        <Link className="brand" to="/" onClick={() => setOpen(false)} aria-label="ENASH home">
          <img className="brand-mark" src="/brand-mark.svg" alt="" aria-hidden="true" />
          <img className="brand-wordmark" src="/enash-wordmark.png" alt="ENASH" />
        </Link>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>
          ))}
          <Link className="btn btn-dark nav-cta" to="/contact" onClick={() => setOpen(false)}>Contact <ArrowUpRight size={15} /></Link>
        </div>
      </nav>
    </header>
  );
}
