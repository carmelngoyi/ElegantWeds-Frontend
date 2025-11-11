import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Homepage from "./Pages/Homepage";
import Accessories from "./Pages/Accessories";
import Dresses from "./Pages/Dresses";
import AboutUs from "./Pages/AboutUs";
import Bookings from "./Pages/Bookings";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Reviews from "./Pages/Reviews";
import Favorites from "./Pages/Favorites";
import { getFavorites, toggleFavorite, isFavorite } from "./Favourite.js";
import { AuthProvider, AuthContext } from "./Pages/AuthContext";

function Layout() {
  const location = useLocation();
  const excludedPaths = ["/login", "/signup"];
  const shouldShowNavAndFooter = !excludedPaths.includes(location.pathname);

  // Get login status from localStorage or AuthContext
  const { user } = useContext(AuthContext); // assuming your AuthContext provides user info
  const isAuthenticated = !!user; // true if user is logged in

  return (
    <div>
      {shouldShowNavAndFooter && <Navbar />}

      <Routes>
        {/* Root redirects based on login status */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
        />

        {/* Auth pages */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <SignUp />}
        />

        {/* Protected pages */}
        <Route
          path="/home"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/accessories"
          element={isAuthenticated ? <Accessories /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dresses"
          element={isAuthenticated ? <Dresses /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/about-us"
          element={isAuthenticated ? <AboutUs /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/bookings"
          element={isAuthenticated ? <Bookings /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/reviews"
          element={isAuthenticated ? <Reviews /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/favorites"
          element={isAuthenticated ? <Favorites /> : <Navigate to="/login" replace />}
        />
      </Routes>

      {shouldShowNavAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
