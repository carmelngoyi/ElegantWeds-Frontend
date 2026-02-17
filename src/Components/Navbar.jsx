import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Pages/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="logo">Marié Élégance</Link>

      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/dresses">Dresses</Link></li>
        <li><Link to="/accessories">Accessories</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/bookings">Book Online</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>

        {!user ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
