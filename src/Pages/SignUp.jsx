import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import base64 from "base-64";
import "./SignUp.css";
import { AuthContext } from "./AuthContext.jsx";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const API_BASE = import.meta.env.VITE_API_URL || "https://elegantweds-backend.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/homepage");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      window.alert("Passwords do not match!");
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/signup`, formData);

      if (res.status === 201) {
        window.alert("Signup Successful!");

        const encoded = base64.encode(`${formData.email}:${formData.password}`);
        localStorage.setItem("authToken", encoded);
        localStorage.setItem("userEmail", formData.email);

        signIn(res.data.user);

        navigate("/homepage");
      } else {
        window.alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      window.alert("Signup Failed: " + errorMsg);
      setMessage("Signup Failed: " + errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="overlay-box">
          <h1 className="brand-title">The Bridal Boutique</h1>
          <p className="brand-tagline">Where Every Dream Finds Its Fit.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2 className="welcome">Welcome, Future Bride🌸</h2>
          <div className="tabs">
            <Link to="/login">
              <button className="inactive-tab">Log In</button>
            </Link>
            <button className="active-tab">Sign Up</button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              name="name"
              placeholder="Sarah Johnson"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="sarah@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" className="pink-button">
              Create My Account
            </button>

            {message && <p className="error">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
