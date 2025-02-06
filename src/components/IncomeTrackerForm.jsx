import React, { useState, useEffect } from "react";

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
  const [currencies, setCurrencies] = useState([
    "USD",
    "EUR",
    "GBP",
    "INR",
    "AUD", // Add more currencies as needed
  ]);

  const [error, setError] = useState("");

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

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (optional: handle Firebase integration here)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the entered amount based on the selected currency
    const incomeAmount = parseFloat(formData.amount);
    const converted = incomeAmount * conversionRate;
    setConvertedAmount(converted);

    // Submit the form data to Firebase (your logic here)
    console.log("Form Data:", formData);
    console.log("Converted Income:", converted);
  };

  return (
    <div className="p-8 mt-8">
      <h1 className="text-3xl font-bold">Income Tracker Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        {/* Income Amount */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
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
            className="block text-sm font-medium text-gray-700"
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
            className="block text-sm font-medium text-gray-700"
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
            className="block text-sm font-medium text-gray-700"
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
            className="block text-sm font-medium text-gray-700"
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
            className="block text-sm font-medium text-gray-700"
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
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>

        {/* Display Converted Income */}
        {convertedAmount > 0 && (
          <div className="mt-4 text-lg">
            <span className="font-bold">Converted Income: </span>
            {convertedAmount.toFixed(2)} {formData.currency}
          </div>
        )}

        {/* Error Handling */}
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default IncomeTrackerForm;
