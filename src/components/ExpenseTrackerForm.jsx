import React, { useState, useEffect } from "react";

const ExpenseTrackerForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    paymentMethod: "",
    currency: "USD", // Default currency
    description: "",
  });

  const [conversionRate, setConversionRate] = useState(1); // Default rate for USD
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([
    "USD",
    "EUR",
    "GBP",
    "INR",
    "AUD",
  ]);
  const [error, setError] = useState("");

  // Fetch exchange rates
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseAmount = parseFloat(formData.amount);
    const converted = expenseAmount * conversionRate;
    setConvertedAmount(converted);

    console.log("Expense Data:", formData);
    console.log("Converted Expense:", converted);
  };

  return (
    <div className="p-8 mt-8">
      <h1 className="text-3xl font-bold">Expense Tracker Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        {/* Expense Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="entertainment">Entertainment</option>
            <option value="transportation">Transportation</option>
            <option value="bills">Bills</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
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

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
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

        {/* Currency Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
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

        {/* Description/Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit Expense
          </button>
        </div>

        {/* Display Converted Expense */}
        {convertedAmount > 0 && (
          <div className="mt-4 text-lg">
            <span className="font-bold">Converted Expense: </span>
            {convertedAmount.toFixed(2)} {formData.currency}
          </div>
        )}

        {/* Error Handling */}
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default ExpenseTrackerForm;
