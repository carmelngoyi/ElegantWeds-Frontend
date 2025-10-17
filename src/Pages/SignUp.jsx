// import { useState, useContext } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./SignUp.css";
// import { AuthContext } from "./AuthContext.jsx";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const { signIn } = useContext(AuthContext); 

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       window.alert("Passwords do not match!");
//       setMessage("Passwords do not match!");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:3000/signup", formData);

//       if (res.status === 201) {
//         window.alert("Signup Successful!");
//         setMessage("Signup Successful!");
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//           confirmPassword: ""
//         });

//         signIn(res.data.user);

//         navigate("/homepage");
//       } else {
//         window.alert("Something went wrong. Please try again.");
//         setMessage("Signup failed: Unexpected response.");
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.error || err.message;
//       window.alert("Signup Failed: " + errorMsg);
//       setMessage("Signup Failed: " + errorMsg);
//     }
//   };

//   return (
//     <div id="mainDiv">
//       <div id="signup">
//         <h1>Sign Up</h1>
//         <form onSubmit={handleSubmit} className="signup-form">
//           <input
//             name="name"
//             placeholder="Username"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <br /><br />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
        
//           <br /><br />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <br /><br />
//           <input
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//           <br /><br />
//           <button type="submit">Sign Up</button>
//           <p className="login">
//             Already have an account? <Link to="/Login">Sign In</Link>
//           </p>
//         </form>
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Signup;