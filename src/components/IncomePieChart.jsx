import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { ref, onValue } from "firebase/database";
import { auth, database } from "./firebase";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const IncomePieChart = () => {
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

          // Aggregate income by source instead of category
          Object.values(data).forEach((income) => {
            const source = income.source || "Other";
            const amount = parseFloat(income.amount) || 0;

            sources[source] = (sources[source] || 0) + amount;
          });

          setIncomeData({
            labels: Object.keys(sources),
            values: Object.values(sources),
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
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9C27B0",
          "#FF5722",
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
        Income Breakdown by Source
      </h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default IncomePieChart;
