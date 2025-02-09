import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { auth, database } from "./firebase";
import { ref, push, update, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const ExpenseTrackerForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    paymentMethod: "",
    currency: "USD", // Default currency
    description: "",
  });

  const [categories, setCategories] = useState([
    "Groceries",
    "Rent",
    "Entertainment",
    "Transportation",
    "Bills",
    "Health",
  ]);
  const [customCategory, setCustomCategory] = useState("");
  const [conversionRate, setConversionRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([
    "USD",
    "EUR",
    "GBP",
    "INR",
    "AUD",
  ]);
  const [error, setError] = useState("");
  const [lastExpense, setLastExpense] = useState(null);

  useEffect(() => {
    // Mock conversion rate (in a real scenario, this would fetch from an API)
    if (formData.currency === "EUR") {
      setConversionRate(0.85); // Example: 1 USD = 0.85 EUR
    } else if (formData.currency === "GBP") {
      setConversionRate(0.75); // Example: 1 USD = 0.75 GBP
    } else {
      setConversionRate(1); // Default 1:1 for USD
    }
  }, [formData.currency]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");

    const expenseAmount = parseFloat(formData.amount);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in to add expenses.");
      return;
    }

    try {
      const expenseRef = push(ref(database, `expenses/${user.uid}`));

      // 🔥 Convert amount before storing
      const convertedExpenseAmount = expenseAmount * conversionRate;

      await set(expenseRef, {
        id: expenseRef.key,
        userEmail: user.email,
        amount: formData.amount,
        convertedAmount: convertedExpenseAmount, // 🔥 Store converted amount
        category:
          formData.category === "custom" ? customCategory : formData.category,
        date: formData.date,
        paymentMethod: formData.paymentMethod,
        currency: formData.currency,
        description: formData.description,
        timestamp: new Date().toISOString(),
      });

      setLastExpense({
        id: expenseRef.key,
        ...formData,
        convertedAmount: convertedExpenseAmount, // 🔥 Update UI with converted amount
      });

      // 🔥 Ensure converted amount updates in UI
      setConvertedAmount(convertedExpenseAmount);

      console.log("Expense added successfully!");
      setError("");
    } catch (error) {
      console.error("Error adding expense:", error);
      setError("Failed to add expense. Please try again.");
    }
  };

  const handleUpdate = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in to update expenses.");
      return;
    }

    if (!lastExpense || !lastExpense.id) {
      setError("No recent expense to update.");
      return;
    }

    try {
      const expenseRef = ref(
        database,
        `expenses/${user.uid}/${lastExpense.id}`
      );

      // 🔥 Recalculate converted amount if needed
      const updatedConvertedAmount =
        parseFloat(formData.amount) * conversionRate;

      await update(expenseRef, {
        amount: formData.amount,
        convertedAmount: updatedConvertedAmount, // 🔥 Ensure converted amount is updated
        category:
          formData.category === "custom" ? customCategory : formData.category,
        date: formData.date,
        paymentMethod: formData.paymentMethod,
        currency: formData.currency,
        description: formData.description,
      });

      console.log("Expense updated successfully!");
      setError("");

      // 🔥 Ensure UI updates correctly
      setLastExpense((prev) => ({
        ...prev,
        amount: formData.amount,
        convertedAmount: updatedConvertedAmount, // 🔥 Ensure converted amount updates in UI
        category:
          formData.category === "custom" ? customCategory : formData.category,
        date: formData.date,
        paymentMethod: formData.paymentMethod,
        currency: formData.currency,
        description: formData.description,
      }));

      setConvertedAmount(updatedConvertedAmount);
    } catch (error) {
      console.error("Error updating expense:", error);
      setError("Failed to update expense. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="p-8 pt-16 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">Expense Tracker Form</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-8 border border-gray-300 rounded-xl p-6 shadow-md bg-white w-120 mx-auto"
        >
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 text-left">
              Expense Amount
            </label>
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Expense Category */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 text-left">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => {
                handleChange(e);
                if (e.target.value === "custom") setCustomCategory("");
              }}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="custom">Add Custom Category</option>
            </select>
          </div>

          {formData.category === "custom" && (
            <div className="mb-4">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter your category"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  if (customCategory.trim()) {
                    setCategories([...categories, customCategory]);
                    setFormData((prev) => ({
                      ...prev,
                      category: customCategory,
                    }));
                    setCustomCategory(""); // Reset the input after adding the category
                  }
                }}
                className="mt-2 bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600"
              >
                Add Category
              </button>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 text-left">
              Date
            </label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 text-left">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 text-left">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 text-left">
              Description/Notes
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Add any extra details..."
            />
          </div>

          <div className="mb-4 flex gap-4 justify-center">
            <button
              type="submit"
              className="w-1/3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Submit Expense
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="w-1/3 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
            >
              Update Expense
            </button>
          </div>

          {convertedAmount > 0 && (
            <div className="mt-4 text-lg text-center flex justify-center">
              <span className="font-bold">Converted Expense: </span>
              <span className="ml-2">
                {convertedAmount.toFixed(2)} {formData.currency}
              </span>
            </div>
          )}

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ExpenseTrackerForm;
