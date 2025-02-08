// import React, { useState } from "react";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validation
//     if (
//       !formData.username ||
//       !formData.email ||
//       !formData.password ||
//       !formData.confirmPassword
//     ) {
//       setError("Please fill in all fields");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setError(""); // Clear any errors
//     setSuccess("Registration successful!"); // For demonstration purposes
//     // Proceed with registration logic (e.g., sending data to a backend)
//   };

//   return (
//     <div className="register-container p-4 mt-10">
//       <h2 className="text-center text-4xl font-semibold">Register</h2>
//       <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//         {/* User Name Input */}
//         <div>
//           <label htmlFor="username" className="block mb-2">
//             User Name
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your username"
//           />
//         </div>

//         {/* Email Input */}
//         <div>
//           <label htmlFor="email" className="block mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your email"
//           />
//         </div>

//         {/* Password Input */}
//         <div>
//           <label htmlFor="password" className="block mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             placeholder="Enter your password"
//           />
//         </div>

//         {/* Confirm Password Input */}
//         <div>
//           <label htmlFor="confirmPassword" className="block mb-2">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             placeholder="Confirm your password"
//           />
//         </div>

//         {/* Error Message */}
//         {error && <div className="text-red-500 text-sm">{error}</div>}

//         {/* Success Message */}
//         {success && <div className="text-green-500 text-sm">{success}</div>}

//         {/* Register Button */}
//         <button
//           type="submit"
//           className="w-full p-3 bg-blue-600 text-white rounded"
//         >
//           Register
//         </button>
//       </form>

//       {/* Sign In Redirect */}
//       <div className="mt-4 text-center">
//         <span>Already have an account? </span>
//         <a href="/signin" className="text-blue-600 hover:underline">
//           Sign In here
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../components/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await set(ref(database, "users/" + userCredential.user.uid), {
        username: formData.username,
        email: formData.email,
      });

      setSuccess("Registration successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg mt-24">
      <h2 className="text-center text-3xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="w-full p-3 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-3 border rounded"
        />

        {/* Password Input with Show/Hide Icon */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-3 border rounded pr-7"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </button>
        </div>

        {/* Confirm Password Input with Show/Hide Icon */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="w-full p-3 border rounded pr-7"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-600 hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
};

export default Register;
