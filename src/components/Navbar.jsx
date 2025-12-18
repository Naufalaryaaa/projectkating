import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../App.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Fungsi cek apakah link sedang aktif
  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">DIGIMAX.</Link>
      
      {/* Desktop Menu */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/" className={isActive("/")} onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/work" className={isActive("/work")} onClick={() => setIsOpen(false)}>Work</Link></li>
        <li><Link to="/about" className={isActive("/about")} onClick={() => setIsOpen(false)}>About</Link></li>
      </ul>

      {/* Mobile Toggle */}
      <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>
    </nav>
  );
};

export default Navbar;