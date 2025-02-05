import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />{" "}
        {/* Use Dashboard Component */}
        <Route path="/signin" element={<Signin />} />{" "}
        {/* Use Sign In Component */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/income-tracker"
          element={<h1 className="text-center mt-10">Income Tracker Page</h1>}
        />
        <Route
          path="/expense-tracker"
          element={<h1 className="text-center mt-10">Expense Tracker Page</h1>}
        />
        <Route
          path="/budgeting-tool"
          element={<h1 className="text-center mt-10">Budgeting Tool Page</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
