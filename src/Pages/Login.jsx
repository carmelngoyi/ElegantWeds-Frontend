import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  // If already logged in, redirect to /home
  // if (user) return <Navigate to="/home" replace />;

  useEffect(() => {
  if (user) {
    navigate("/home", { replace: true });
  }
}, [user, navigate]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    const { email, password } = formData;

    try {
      const credentials = btoa(`${email}:${password}`);
      const API_BASE = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed. Please check your credentials.");
        return;
      } else {
        window.alert("Login Successful!");
      }

      // Save credentials in localStorage
      localStorage.setItem("authToken", credentials);
      localStorage.setItem("userEmail", email);

      // Update AuthContext
      login(data.user);

      // Navigate after login
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Error signing in. Please try again.");
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
            <button className="active-tab">Log In</button>
            <Link to="/signup">
              <button className="inactive-tab">Sign Up</button>
            </Link>
          </div>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="sarah@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

            <button type="submit" className="pink-button">
              Log In to My Account
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
