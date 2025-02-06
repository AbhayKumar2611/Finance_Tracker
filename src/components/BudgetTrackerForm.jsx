import React, { useState, useEffect } from "react";

const BudgetTrackerForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    budgetAmount: "",
    currency: "USD", // Default currency
    timeframe: "monthly",
  });

  const [currencies, setCurrencies] = useState([
    "USD",
    "EUR",
    "GBP",
    "INR",
    "AUD",
  ]);
  const [expenses, setExpenses] = useState({}); // Mock data for tracking expenses
  const [remainingBudget, setRemainingBudget] = useState(0);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the budget details (Firebase integration can be done here)
    console.log("Budget Data Submitted:", formData);
  };

  // Calculate remaining budget (Mock comparison with expenses data)
  useEffect(() => {
    const totalSpent = expenses[formData.category] || 0;
    setRemainingBudget(formData.budgetAmount - totalSpent);
  }, [formData.budgetAmount, formData.category, expenses]);

  return (
    <div className="p-8 mt-8">
      <h1 className="text-3xl font-bold">Budget Setup Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        {/* Expense Category */}
        <div>
          <label className="block text-sm font-medium">Expense Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Category</option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="entertainment">Entertainment</option>
            <option value="transportation">Transportation</option>
          </select>
        </div>

        {/* Budget Amount */}
        <div>
          <label className="block text-sm font-medium">Budget Amount</label>
          <input
            type="number"
            name="budgetAmount"
            value={formData.budgetAmount}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Timeframe Selection */}
        <div>
          <label className="block text-sm font-medium">Timeframe</label>
          <select
            name="timeframe"
            value={formData.timeframe}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Set Budget
        </button>
      </form>

      {/* Budget Tracking Section */}
      {formData.budgetAmount && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-semibold">Budget Tracking</h2>
          <p>
            Total Budget: {formData.budgetAmount} {formData.currency}
          </p>
          <p>
            Total Spent: {expenses[formData.category] || 0} {formData.currency}
          </p>
          <p>
            Remaining Budget: {remainingBudget} {formData.currency}
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetTrackerForm;
