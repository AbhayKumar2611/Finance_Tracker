import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-6">
        {/* Logo / Brand Name */}
        <NavLink to="/" className="text-2xl font-bold tracking-wide">
          Finance Tracker 💰
        </NavLink>

        {/* Hamburger Menu Button - Visible on Small Screens */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigation Links - Desktop View */}
        <div className="hidden md:flex space-x-6">
          {[
            { path: "/", label: "Dashboard" },
            { path: "/signin", label: "Sign In" },
            { path: "/income-tracker", label: "Income Tracker" },
            { path: "/expense-tracker", label: "Expense Tracker" },
            { path: "/budgeting-tool", label: "Budgeting Tool" },
          ].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Menu - Opens when Hamburger is Clicked */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-blue-700 p-4">
          {[
            { path: "/", label: "Dashboard" },
            { path: "/signin", label: "Sign In" },
            { path: "/income-tracker", label: "Income Tracker" },
            { path: "/expense-tracker", label: "Expense Tracker" },
            { path: "/budgeting-tool", label: "Budgeting Tool" },
          ].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
