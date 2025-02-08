// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { FiMenu, FiX } from "react-icons/fi";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-blue-600 text-white p-4 shadow-lg w-full fixed top-0 left-0 z-50">
//       <div className="flex justify-between items-center px-6">
//         {/* Logo / Brand Name */}
//         <NavLink to="/" className="text-2xl font-bold tracking-wide">
//           Finance Tracker 💰
//         </NavLink>

//         {/* Hamburger Menu Button - Visible on Small Screens */}
//         <button
//           className="md:hidden text-white text-2xl"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <FiX /> : <FiMenu />}
//         </button>

//         {/* Navigation Links - Desktop View */}
//         <div className="hidden md:flex space-x-6">
//           {[
//             { path: "/", label: "Dashboard" },
//             { path: "/signin", label: "Sign In" },
//             { path: "/income-tracker", label: "Income Tracker" },
//             { path: "/expense-tracker", label: "Expense Tracker" },
//             { path: "/budgeting-tool", label: "Budgeting Tool" },
//           ].map(({ path, label }) => (
//             <NavLink
//               key={path}
//               to={path}
//               className={({ isActive }) =>
//                 isActive ? "underline font-semibold" : "hover:underline"
//               }
//             >
//               {label}
//             </NavLink>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Menu - Opens when Hamburger is Clicked */}
//       {isOpen && (
//         <div className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-blue-700 p-4">
//           {[
//             { path: "/", label: "Dashboard" },
//             { path: "/signin", label: "Sign In" },
//             { path: "/income-tracker", label: "Income Tracker" },
//             { path: "/expense-tracker", label: "Expense Tracker" },
//             { path: "/budgeting-tool", label: "Budgeting Tool" },
//           ].map(({ path, label }) => (
//             <NavLink
//               key={path}
//               to={path}
//               className={({ isActive }) =>
//                 isActive ? "underline font-semibold" : "hover:underline"
//               }
//               onClick={() => setIsOpen(false)}
//             >
//               {label}
//             </NavLink>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { auth, database } from "../components/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // Track signed-in user
  const [username, setUsername] = useState("Guest"); // Default username
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = ref(database, "users/" + currentUser.uid);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUsername(snapshot.val().username); // Set username from database
        }
      } else {
        setUsername("Guest"); // Default if no user is logged in
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout Function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUsername("Guest");
      navigate("/signin"); // Redirect to Sign In after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
        <div className="hidden md:flex space-x-6 items-center">
          {[
            { path: "/", label: "Dashboard" },
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

          {/* Profile Icon & Username */}
          <div className="relative group flex flex-col items-center">
            {/* Circle Profile Icon */}
            <div className="w-10 h-10 bg-gray-400 flex items-center justify-center rounded-full cursor-pointer">
              <FiUser size={20} className="text-white" />
            </div>

            {/* Username - Hidden by Default, Visible on Hover Below */}
            <span
              className="absolute top-12 bg-gray-800 text-white px-3 py-1 rounded-md 
                  opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              {username}
            </span>
          </div>

          {/* Show Sign In or Sign Out button */}
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-black px-6 py-2 rounded-lg text-white font-medium shadow-md transition-all duration-300 
                       hover:bg-gray-900 hover:shadow-lg transform hover:scale-105"
            >
              Sign Out
            </button>
          ) : (
            <NavLink
              to="/signin"
              className="bg-black text-white rounded-lg px-6 py-2 font-medium shadow-md transition-all duration-300 
             hover:bg-gray-900 hover:shadow-lg transform hover:scale-105"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu - Opens when Hamburger is Clicked */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-blue-700 p-4">
          {[
            { path: "/", label: "Dashboard" },
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

          {/* Profile Icon & Username in Mobile Menu */}
          <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
            <FiUser size={20} />
            <span className="font-medium">{username}</span>
          </div>

          {/* Show Sign In or Sign Out button in Mobile Menu */}
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-black px-6 py-2 rounded-lg text-white font-medium shadow-md transition-all duration-300 
               hover:bg-gray-900 hover:shadow-lg transform hover:scale-105 w-full text-center"
            >
              Sign Out
            </button>
          ) : (
            <NavLink
              to="/signin"
              className="bg-black text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all duration-300 
               hover:bg-gray-900 hover:shadow-lg transform hover:scale-105 w-full text-center"
            >
              Sign In
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
