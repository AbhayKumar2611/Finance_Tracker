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

const IncomeChart = () => {
  const [incomeData, setIncomeData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchIncome = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const incomeRef = ref(database, `income/${user.uid}`);
      onValue(incomeRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const sources = {};

          // Aggregate income by source instead of date
          Object.values(data).forEach((income) => {
            const source = income.source || "Other";
            const amount = parseFloat(income.amount) || 0;

            sources[source] = (sources[source] || 0) + amount;
          });

          setIncomeData({
            labels: Object.keys(sources), // Income sources
            values: Object.values(sources), // Total income per source
          });
        }
      });
    };

    fetchIncome();
  }, []);

  const chartData = {
    labels: incomeData.labels,
    datasets: [
      {
        label: "Income by Source",
        data: incomeData.values,
        backgroundColor: "#36A2EB",
        borderColor: "#1E88E5",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ Allows full-width usage
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: "Income Source" } },
      y: { title: { display: true, text: "Amount" }, beginAtZero: true },
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Income Overview</h2>
      <div className="w-full h-[400px]">
        {" "}
        {/* ✅ Increased height */}
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p>No income data available</p>
        )}
      </div>
    </div>
  );
};

export default IncomeChart;
