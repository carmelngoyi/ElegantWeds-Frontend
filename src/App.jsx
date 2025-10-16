import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Homepage from "./Pages/Homepage"
import Accessories from "./Pages/Accessories"
import Dresses  from "./Pages/Dresses"
import AboutUs from "./Pages/AboutUs"
import Bookings from "./Pages/Bookings"
// import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp";
import Reviews from "./Pages/Reviews"
import { AuthProvider } from "./Pages/AuthContext";

function App() {

  return (
  
      <div>
      <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/dresses" element={<Dresses />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/bookings" element={<Bookings />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
        <Footer />
        </AuthProvider>
      </BrowserRouter>

      </div>
  )
}

export default App


