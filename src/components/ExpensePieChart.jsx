import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { ref, onValue } from "firebase/database";
import { auth, database } from "./firebase";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
  const [expenseData, setExpenseData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchExpenses = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const expensesRef = ref(database, `expenses/${user.uid}`);
      onValue(expensesRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const categories = {};

          // Aggregate expenses by category
          Object.values(data).forEach((expense) => {
            const category = expense.category || "Other";
            const amount = parseFloat(expense.convertedAmount) || 0;

            if (categories[category]) {
              categories[category] += amount;
            } else {
              categories[category] = amount;
            }
          });

          setExpenseData({
            labels: Object.keys(categories),
            values: Object.values(categories),
          });
        }
      });
    };

    fetchExpenses();
  }, []);

  const chartData = {
    labels: expenseData.labels,
    datasets: [
      {
        label: "Expense Distribution",
        data: expenseData.values,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9800",
          "#9C27B0",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">
        Expense Breakdown
      </h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ExpensePieChart;
