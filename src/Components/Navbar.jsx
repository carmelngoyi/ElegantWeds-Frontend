import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuOnLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const colorPrimary = '#F7F7F7';
  const colorAccent1 = '#9C898C';
  const colorAccent2 = '#A3836B';
  const colorTextDark = '#333333';

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenuOnLinkClick}>Marié Élégance</Link>
        
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
          {isMenuOpen ? '✕' : '☰'} 
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenuOnLinkClick}>Home</Link></li>
          <li><Link to="/dresses" onClick={closeMenuOnLinkClick}>Dresses</Link></li>
          <li><Link to="/accessories" onClick={closeMenuOnLinkClick}>Accessories</Link></li>
          <li><Link to="/reviews" onClick={closeMenuOnLinkClick}>Reviews</Link></li>
          <li><Link to="/about-us" onClick={closeMenuOnLinkClick}>About Us</Link></li>
          <li><Link to="/bookings" onClick={closeMenuOnLinkClick}>Book Online</Link></li>
          <li><Link to="/login" onClick={closeMenuOnLinkClick}>Login</Link></li>
        </ul>
      </nav>
    </>
  );
}
