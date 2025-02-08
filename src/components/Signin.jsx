// import React, { useState } from "react";

// const Signin = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       setError("Please fill in all fields");
//     } else {
//       setError(""); // Reset error if validation passes
//       // Proceed with sign-in logic here
//     }
//   };

//   return (
//     <div className="signin-container p-4 mt-10">
//       <h2 className="text-center text-4xl font-semibold">Sign In</h2>
//       <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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

//         {/* Error Message */}
//         {error && <div className="text-red-500 text-sm">{error}</div>}

//         {/* Sign In Button */}
//         <button
//           type="submit"
//           className="w-full p-3 bg-blue-600 text-white rounded"
//         >
//           Sign In
//         </button>
//       </form>

//       {/* Register Redirect */}
//       <div className="mt-4 text-center">
//         <span>if not registered, </span>
//         <a href="/register" className="text-blue-600 hover:underline">
//           Register here
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Signin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-center text-3xl font-semibold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-3 border rounded"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-3 border rounded pr-7 "
          />
          <button
            type="button"
            className="absolute right-3 top-1/7 transform translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
      <p className="text-center mt-4">
        Not registered?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
};

export default Signin;
