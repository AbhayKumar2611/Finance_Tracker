import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { auth, database } from "./firebase";
import { ref, push, update, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const IncomeTrackerForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    date: "",
    paymentMethod: "",
    currency: "USD", // Default currency
    description: "", // New description field
  });

  const [conversionRate, setConversionRate] = useState(1); // Default rate for USD
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [showConvertedAmount, setShowConvertedAmount] = useState(false); // Track submit click
  const [currencies, setCurrencies] = useState([
    "USD",
    "EUR",
    "GBP",
    "INR",
    "AUD", // Add more currencies as needed
  ]);

  const [error, setError] = useState("");
  const [lastEntryId, setLastEntryId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // API to fetch exchange rates (You can use any exchange rate API)
  const fetchExchangeRate = async (currency) => {
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/USD`
      );
      const data = await response.json();
      const rate = data.rates[currency];
      setConversionRate(rate);
      return rate;
    } catch (err) {
      setError("Failed to fetch exchange rates. Please try again later.");
    }
  };

  useEffect(() => {
    fetchExchangeRate(formData.currency);
  }, [formData.currency]);
  useEffect(() => {
    const incomeAmount = parseFloat(formData.amount);
    if (!isNaN(incomeAmount)) {
      setConvertedAmount(incomeAmount * conversionRate);
    }
  }, [formData.amount, conversionRate]);

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (optional: handle Firebase integration here)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");

    const incomeAmount = parseFloat(formData.amount);
    if (isNaN(incomeAmount) || incomeAmount <= 0) {
      setError("Please enter a valid income amount.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in to add income.");
      return;
    }

    try {
      const incomeRef = ref(database, `income/${user.uid}`);
      const newEntryRef = push(incomeRef);

      await set(newEntryRef, {
        userEmail: user.email,
        amount: formData.amount,
        source: formData.source,
        date: formData.date,
        paymentMethod: formData.paymentMethod,
        currency: formData.currency,
        description: formData.description,
        timestamp: new Date().toISOString(),
      });

      setLastEntryId(newEntryRef.key);
      console.log("Income added successfully!");
      setError("");
      setShowConvertedAmount(true);
    } catch (error) {
      console.error("Error adding income:", error);
      setError("Failed to add income. Please try again.");
    }
    setSuccessMessage("Income added successfully! ✅");
    setTimeout(() => setSuccessMessage(""), 2000); // Hide after 2 sec
  };

  const handleUpdate = async () => {
    if (!lastEntryId) {
      setError("No previous entry found to update.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in to update income.");
      return;
    }

    const incomeRef = ref(database, `income/${user.uid}/${lastEntryId}`);
    try {
      await update(incomeRef, {
        amount: formData.amount,
        source: formData.source,
        date: formData.date,
        paymentMethod: formData.paymentMethod,
        currency: formData.currency,
        description: formData.description,
      });

      console.log("Last entry updated successfully!");
      setError("");
    } catch (error) {
      console.error("Error updating income:", error);
      setError("Failed to update income. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="p-8 pt-16 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">Income Tracker Form</h1>
        {successMessage && (
          <div
            className="absolute top-5 left-1/2 transform -translate-x-1/2
                    bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl
                    text-lg font-semibold transition-opacity duration-500 opacity-100"
          >
            {successMessage}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-8 border border-gray-300 rounded-xl p-6 shadow-md bg-white w-120 mx-auto"
        >
          {/* Income Amount */}
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="amount"
              className="block text-lg font-medium text-gray-700 text-left"
            >
              Income Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Income Source */}
          <div className="mb-4">
            <label
              htmlFor="source"
              className="block text-lg font-medium text-gray-700 text-left"
            >
              Income Source
            </label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Source</option>
              <option value="salary">Salary</option>
              <option value="freelance">Freelance</option>
              <option value="gift">Gift</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date */}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-lg font-medium text-gray-700 text-left"
            >
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label
              htmlFor="paymentMethod"
              className="block text-lg font-medium text-gray-700 text-left"
            >
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled selected>
                Select Payment Method
              </option>
              <option value="bank">Bank Transfer</option>
              <option value="cash">Cash</option>
              <option value="paypal">PayPal</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Currency Selector */}
          <div className="mb-4">
            <label
              htmlFor="currency"
              className="block text-lg font-medium text-gray-700 text-left"
            >
              Currency
            </label>
            <select
              id="currency"
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

          {/* Description/Notes */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700 text-left"
            >
              Description/Notes
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add any details about the income (e.g., project name, client name, etc.)"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4 flex gap-4 justify-center">
            <button
              type="submit"
              className="w-1/3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="w-1/3 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
            >
              Update
            </button>
          </div>

          {/* Display Converted Income */}
          {showConvertedAmount && convertedAmount > 0 && (
            <div className="mt-4 text-lg">
              <span className="font-bold">Converted Income: </span>
              {convertedAmount.toFixed(2)} {formData.currency}
            </div>
          )}

          {/* Error Handling */}
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default IncomeTrackerForm;
