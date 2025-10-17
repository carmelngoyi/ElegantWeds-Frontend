import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"; 
import { AuthContext } from "./AuthContext.jsx"; 

const AuthContext = React.createContext({ signIn: () => {} });
const CustomAuthContextProvider = ({ children }) => {
    const signIn = (user) => {
        console.log("User signed in:", user);
    };
    return <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>;
};

const API_BASE_URL = "https://elegantweds-backend.onrender.com"; 

const AlertModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="alert-modal-backdrop">
      <div className="alert-modal-content">
        <p className="alert-title">{message.includes("Successful") ? "Success" : "Signup Failed"}</p>
        <p className="alert-message">{message}</p>
        <button onClick={onClose} className="alert-button">OK</button>
      </div>
    </div>
  );
};

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const signIn = authContext?.signIn || (() => console.log("AuthContext not fully implemented."));


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const displayAlert = (msg) => {
    setAlertMessage(msg);
    setShowAlert(true);
  };
  
  const closeAlert = () => {
    setShowAlert(false);
    
    if (alertMessage.includes("Successful")) {
        setAlertMessage(""); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      displayAlert("Passwords do not match!");
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/signup`, formData);

      if (res.status === 201) {
        displayAlert("Signup Successful!"); 
        
        // Use the actual sign-in function here
        signIn(res.data.user);
        
        // Wait for the user to close the modal before navigating
        // Or navigate after a short delay if the modal is for success feedback only
        setTimeout(() => navigate("/homepage"), 1500); 
        
      } else {
        displayAlert("Something went wrong. Please try again.");
        setMessage("Signup failed: Unexpected response.");
      }
    } catch (err) {
      console.error("Signup error details:", err);
      
      let errorMsg;
      if (err.code === 'ERR_NETWORK') {
          // This catches the true "Network Error" (CORS, DNS, or localhost issue)
          errorMsg = `Network Error. Please verify the API_BASE_URL constant and ensure CORS is enabled on the backend.`;
      } else {
          errorMsg = err.response?.data?.error || err.message;
      }

      displayAlert("Signup Failed: " + errorMsg);
      setMessage("Signup Failed: " + errorMsg);
    }
  };

  return (
    <React.Fragment>
      <style>{internalStyles}</style>

      <div id="mainDiv">
        <div id="signup">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <br /><br />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          
            <br /><br />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br /><br />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <br /><br />
            <button type="submit">Sign Up</button>
            <p className="login">
              Already have an account? <Link to="/Login">Sign In</Link>
            </p>
          </form>
          {message && <p>{message}</p>}
        </div>
        
        {showAlert && (
          <AlertModal 
            message={alertMessage} 
            onClose={closeAlert} 
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Signup;
