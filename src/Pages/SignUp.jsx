import { useState, useContext, createContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Loader2 } from 'lucide-react';

// ===============================================
// Context Definition (Based on AuthContext.jsx)
// 
// NOTE: This AuthContext structure is defined locally to ensure 
// the single-file component compiles and runs.
// ===============================================

// 1. Create the context
export const AuthContext = createContext({
    user: null,
    login: () => {}, // Updated to match your original AuthContext
    signOut: () => {},
});

// 2. Define the Auth Provider
const AuthProvider = ({ children }) => {
    // Initial state: attempt to load user from localStorage (as per your original context logic)
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem("Auth");
      return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => { // Updated function name
        setUser(userData);
        // Using localStorage as per original AuthContext.jsx
        localStorage.setItem("Auth", JSON.stringify(userData)); 
        console.log("User logged in:", userData.email);
    };

    const signOut = () => {
        setUser(null);
        // Clear localStorage as per original AuthContext.jsx
        localStorage.removeItem("Auth"); 
        console.log("User signed out.");
    };

    return (
        <AuthContext.Provider value={{ user, login, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
// ===============================================
// END CONTEXT DEFINITION
// ===============================================


// *** 1. CRITICAL: Replace this placeholder with your actual deployed backend URL. ***
const API_BASE = "YOUR_DEPLOYED_API_URL"; 
const SIGNUP_ENDPOINT = `${API_BASE}/signup`; 

// Internal CSS block for modern styling
const internalStyles = `
  /* Overall container for centering and background */
  .signup-container {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f7; /* Light background for contrast */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* The main white card (replaces #signup) */
  #signup {
    background-color: white; 
    padding: 40px; /* Slightly more padding */
    border-radius: 16px; /* Increased rounding */
    width: 100%;
    max-width: 420px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); 
    border: 1px solid #eee;
  }

  .signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 15px; /* Spacing between input groups */
  }

  /* Title and Logo styling (replaces H1) */
  #signup h1 {
    margin-bottom: 5px;
    color: #333;
    font-size: 2.2rem; 
    font-family: 'Georgia', serif; 
    font-weight: 700;
  }
  .form-subtitle {
      margin-bottom: 25px;
      color: #666;
      font-size: 0.95rem;
      font-weight: 500;
  }

  /* Input fields container */
  .input-field {
    width: 100%;
  }

  .input-field input {
    width: 100%;
    padding: 14px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    background: #fcfcfc;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input-field input:focus {
    border-color: #FF69B4; /* Hot pink focus */
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.2);
  }

  /* Main Button (Pink/Magenta) */
  #signup button {
    background-color: #FF69B4; /* Hot Pink */
    color: white;
    padding: 14px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.1s;
    width: 100%; 
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px; /* Adjust margin above button */
    box-shadow: 0 4px 10px rgba(255, 105, 180, 0.4);
  }

  #signup button:hover {
    background-color: #FF4081; /* Darker Pink on hover */
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgba(255, 105, 180, 0.5);
  }

  /* Link text (replaces .login) */
  .link-text {
    margin-top: 15px;
    font-weight: 500;
    color: #888;
    font-size: 0.95rem;
  }
  .link-text a {
    color: #FF69B4; /* Hot Pink link */
    text-decoration: none;
    transition: color 0.3s;
    font-weight: 600;
  }
  .link-text a:hover {
    color: #FF4081;
    text-decoration: underline;
  }

  /* Status/Error Messages */
  .status-message {
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    margin-top: 15px;
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
  }
  .status-success {
    background-color: #e6ffed;
    color: #00701a;
    border: 1px solid #b3ffc7;
  }
  .status-error {
    background-color: #ffe6e6;
    color: #a30000;
    border: 1px solid #ffb3b3;
  }
  
  /* Loader styles */
  .loader-icon {
      animation: spin 1s linear infinite;
  }
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
`;

// Renamed core component to avoid naming conflict with the export wrapper
const SignupComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  // Use status for submission state and message for content
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  // *** CRITICAL UPDATE: Destructure 'login' instead of 'signIn' ***
  const { login } = useContext(AuthContext); 

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    setMessage(""); // Clear previous message

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setSubmissionStatus('error');
      // Set a timeout to clear the message
      setTimeout(() => { setMessage(""); setSubmissionStatus(null); }, 5000);
      return;
    }

    try {
      // Use the SIGNUP_ENDPOINT constant
      const res = await axios.post(SIGNUP_ENDPOINT, formData); 

      if (res.status === 201) {
        setMessage("Signup Successful! Redirecting...");
        setSubmissionStatus('success');
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

        // Use setTimeout to allow the success message to show before navigating
        setTimeout(() => {
          // *** CRITICAL UPDATE: Call 'login' instead of 'signIn' ***
          login(res.data.user || { name: formData.name, email: formData.email, id: Date.now() }); // Fallback user data
          navigate("/homepage");
        }, 1500); 

      } else {
        setMessage("Signup failed: Unexpected response.");
        setSubmissionStatus('error');
        setTimeout(() => { setMessage(""); setSubmissionStatus(null); }, 5000);
      }
    } catch (err) {
      // Enhanced error handling to catch Network/CORS issues
      let errorMsg;
      if (err.code === 'ERR_NETWORK') {
         errorMsg = "Network Error: Could not connect to the API. Check your URL or backend CORS settings.";
      } else {
        errorMsg = err.response?.data?.error || err.message;
      }

      setMessage("Signup Failed: " + errorMsg);
      setSubmissionStatus('error');
      setTimeout(() => { setMessage(""); setSubmissionStatus(null); }, 8000);
    }
  };

  const isSubmitting = submissionStatus === 'submitting';

  return (
    <div className="signup-container">
      <style>{internalStyles}</style>
      
      <div id="signup">
        <div className="signup-form">
          <h1 className="flex items-center justify-center">
            <UserPlus size={28} style={{ color: '#FF69B4', marginRight: '10px' }} /> 
            Sign Up
          </h1>
          <p className="form-subtitle">Join the Marié Élégance family for exclusive bridal updates.</p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="input-field">
              <input
                name="name"
                placeholder="Username"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          
            <div className="input-field">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          
            <div className="input-field">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          
            <div className="input-field">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          
            {/* Submission Status Message (replaces message && <p>{message}</p>) */}
            {message && (
              <div 
                className={`status-message ${submissionStatus === 'success' ? 'status-success' : 'status-error'}`}
              >
                {message}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="loader-icon" size={20} style={{ marginRight: '8px' }} /> 
                  Processing...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
            
            <p className="link-text">
              Already have an account? <Link to="/Login">Sign In</Link>
            </p>
          </form>
          
        </div>
      </div>
    </div>
  );
};

// Wrapper component to ensure AuthContext is available for the Signup logic to run
const Signup = () => (
  <AuthProvider>
    <SignupComponent />
  </AuthProvider>
);

export default Signup;
