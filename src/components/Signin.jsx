import React, { useState } from "react";

// const Signin = () => {
//   // State for Sign In Form
//   const [signinEmail, setSigninEmail] = useState("");
//   const [signinPassword, setSigninPassword] = useState("");
//   const [signinError, setSigninError] = useState("");

//   // State for Register Form
//   const [registerUsername, setRegisterUsername] = useState("");
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
//   const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
//   const [registerError, setRegisterError] = useState("");

//   // Sign In Validation
//   const handleSignIn = (e) => {
//     e.preventDefault();
//     if (!signinEmail || !signinPassword) {
//       setSigninError("Email and Password are required!");
//     } else {
//       setSigninError(""); // Success, proceed with sign-in logic
//     }
//   };

//   // Register Validation
//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (
//       !registerUsername ||
//       !registerEmail ||
//       !registerPassword ||
//       !registerConfirmPassword
//     ) {
//       setRegisterError("All fields are required!");
//     } else if (registerPassword !== registerConfirmPassword) {
//       setRegisterError("Passwords do not match!");
//     } else {
//       setRegisterError(""); // Success, proceed with registration logic
//     }
//   };

//   return (
//     <div className="signin-container">
//       {/* Sign In Form */}
//       <div className="form-container">
//         <h2>Sign In</h2>
//         <form onSubmit={handleSignIn}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={signinEmail}
//               onChange={(e) => setSigninEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={signinPassword}
//               onChange={(e) => setSigninPassword(e.target.value)}
//               required
//             />
//           </div>
//           {signinError && <p className="error">{signinError}</p>}
//           <button type="submit">Sign In</button>
//         </form>
//       </div>

//       {/* Register Section */}
//       <div className="register-section">
//         <p>If not registered, </p>
//         <button
//           onClick={() =>
//             (document.getElementById("register-form").style.display = "block")
//           }
//         >
//           Register here
//         </button>
//       </div>

//       {/* Register Form (Initially Hidden) */}
//       <div
//         id="register-form"
//         className="form-container"
//         style={{ display: "none" }}
//       >
//         <h2>Register</h2>
//         <form onSubmit={handleRegister}>
//           <div className="form-group">
//             <label>User Name</label>
//             <input
//               type="text"
//               value={registerUsername}
//               onChange={(e) => setRegisterUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={registerEmail}
//               onChange={(e) => setRegisterEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={registerPassword}
//               onChange={(e) => setRegisterPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               value={registerConfirmPassword}
//               onChange={(e) => setRegisterConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           {registerError && <p className="error">{registerError}</p>}
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const Signin = () => {
//   console.log("Signin component rendered");
//   return (
//     <div className="signin-container">
//       <h2>Sign In</h2>
//       {/* Add your form here */}
//     </div>
//   );
// };

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
    } else {
      setError(""); // Reset error if validation passes
      // Proceed with sign-in logic here
    }
  };

  return (
    <div className="signin-container p-4 mt-10">
      <h2 className="text-center text-4xl font-semibold">Sign In</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded"
        >
          Sign In
        </button>
      </form>

      {/* Register Redirect */}
      <div className="mt-4 text-center">
        <span>if not registered, </span>
        <a href="/register" className="text-blue-600 hover:underline">
          Register here
        </a>
      </div>
    </div>
  );
};

export default Signin;
