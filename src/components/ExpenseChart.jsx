import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ref, onValue } from "firebase/database";
import { auth, database } from "./firebase";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
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
        label: "Expenses by Category",
        data: expenseData.values,
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red for expenses
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Expense Breakdown by Category" },
    },
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Expense Overview
      </h2>
      <div style={{ width: "100%", height: "400px" }}>
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true },
              },
            }}
          />
        ) : (
          <p>No expense data available</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
