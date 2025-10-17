import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Marié Élégance</Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dresses">Dresses</Link></li>
        <li><Link to="/accessories">Accessories</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/bookings">Book Online</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}