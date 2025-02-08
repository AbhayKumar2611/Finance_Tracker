import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { auth, database } from "./firebase";
import { ref, set, update, get } from "firebase/database";

const BudgetTrackerForm = () => {
  const [month, setMonth] = useState("");
  const [budgetData, setBudgetData] = useState({
    groceries: "",
    rent: "",
    entertainment: "",
    transportation: "",
    utilities: "",
    healthcare: "",
    savings: "",
    others: "",
  });
  const [totalBudget, setTotalBudget] = useState(0);
  const [existingBudget, setExistingBudget] = useState(false);
  const user = getAuth().currentUser;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetData({ ...budgetData, [name]: value });
  };

  // Handle Submit (Save new budget)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !month) return alert("Please select a month and sign in!");

    const userId = user.uid;
    const total = Object.values(budgetData).reduce(
      (acc, num) => acc + Number(num || 0),
      0
    );

    const budgetRef = ref(database, `budgets/${userId}/${month}`);
    await set(budgetRef, { ...budgetData, total });

    setTotalBudget(total);
    setExistingBudget(true);
    alert("Budget saved successfully!");
  };

  // Handle Update (Modify existing budget)
  const handleUpdate = async () => {
    if (!user || !month) return alert("Please select a month and sign in!");

    const userId = user.uid;
    const total = Object.values(budgetData).reduce(
      (acc, num) => acc + Number(num || 0),
      0
    );

    const budgetRef = ref(database, `budgets/${userId}/${month}`);
    await update(budgetRef, { ...budgetData, total });

    setTotalBudget(total);
    alert("Budget updated successfully!");
  };

  // Fetch existing budget when month is selected
  useEffect(() => {
    if (!user || !month) return;

    const userId = user.uid;
    const budgetRef = ref(database, `budgets/${userId}/${month}`);

    get(budgetRef).then((snapshot) => {
      if (snapshot.exists()) {
        setBudgetData(snapshot.val());
        setTotalBudget(snapshot.val().total);
        setExistingBudget(true);
      } else {
        setBudgetData({
          groceries: "",
          rent: "",
          entertainment: "",
          transportation: "",
          utilities: "",
          healthcare: "",
          savings: "",
          others: "",
        });
        setTotalBudget(0);
        setExistingBudget(false);
      }
    });
  }, [month, user]);

  return (
    <div className="p-6 mt-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Budget Tracker</h1>

      <div className="border p-6 rounded-lg shadow-lg">
        <label className="block text-lg font-semibold mb-2">
          Select Month:
        </label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="block w-full border px-3 py-2 rounded-md mb-4"
        />

        {/* Budget Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "groceries",
              "rent",
              "entertainment",
              "transportation",
              "utilities",
              "healthcare",
              "savings",
              "others",
            ].map((category, index) => (
              <div key={index}>
                <label className="block font-medium capitalize">
                  {category}
                </label>
                <input
                  type="number"
                  name={category}
                  value={budgetData[category]}
                  onChange={handleChange}
                  className="block w-full border px-4 py-3 rounded-md"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            {!existingBudget ? (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit Budget
              </button>
            ) : (
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Update Budget
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Budget Summary */}
      {month && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h2 className="text-xl font-semibold">Budget Summary for {month}</h2>
          <p className="text-lg font-bold">Total Budget: ${totalBudget}</p>
        </div>
      )}
    </div>
  );
};

export default BudgetTrackerForm;
