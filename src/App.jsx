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
import { AuthProvider, AuthContext } from "./Pages/AuthContext";

function Layout() {
  const location = useLocation();
  const excludedPaths = ["/login", "/signup"];
  const shouldShowNavAndFooter = !excludedPaths.includes(location.pathname);

  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user;

  return (
    <>
      {shouldShowNavAndFooter && <Navbar />}

      <Routes>
        {/* Home route */}
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

        {/* Catch-all: redirect unknown routes to home/login */}
        <Route
          path="*"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
        />
      </Routes>

      {shouldShowNavAndFooter && <Footer />}
    </>
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
