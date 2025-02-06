import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Register from "./components/Register";
import IncomeTrackerForm from "./components/IncomeTrackerForm";
import ExpenseTrackerForm from "./components/ExpenseTrackerForm";
import BudgetTrackerForm from "./components/BudgetTrackerForm";

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
        <Route path="/income-tracker" element={<IncomeTrackerForm />} />
        <Route path="/expense-tracker" element={<ExpenseTrackerForm />} />
        <Route path="/budgeting-tool" element={<BudgetTrackerForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
