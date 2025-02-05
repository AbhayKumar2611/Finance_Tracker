import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
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

    setError(""); // Clear any errors
    setSuccess("Registration successful!"); // For demonstration purposes
    // Proceed with registration logic (e.g., sending data to a backend)
  };

  return (
    <div className="register-container p-4 mt-10">
      <h2 className="text-center text-4xl font-semibold">Register</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* User Name Input */}
        <div>
          <label htmlFor="username" className="block mb-2">
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your username"
          />
        </div>

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

        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Confirm your password"
          />
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Success Message */}
        {success && <div className="text-green-500 text-sm">{success}</div>}

        {/* Register Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded"
        >
          Register
        </button>
      </form>

      {/* Sign In Redirect */}
      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <a href="/signin" className="text-blue-600 hover:underline">
          Sign In here
        </a>
      </div>
    </div>
  );
};

export default Register;
