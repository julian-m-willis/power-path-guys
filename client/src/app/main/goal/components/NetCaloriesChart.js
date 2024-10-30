// src/components/NetCaloriesChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NetCaloriesChart = ({ view, caloriesBurntData, caloriesIntakeData }) => {
  // Generate dynamic data for net calories based on the selected view
  const burntData = {
    today: [500],
    week: [400, 450, 300, 600, 500, 550, 520],
    month: [400, 450, 300, 600, 500, 550, 520, 450, 470, 490, 510, 530, 550, 570, 600, 620],
  };

  const intakeData = {
    today: [300],
    week: [250, 300, 200, 350, 280, 300, 290],
    month: [250, 300, 200, 350, 280, 300, 290, 310, 320, 330, 340, 350, 360, 370, 380, 390],
  };

  const netCaloriesData = burntData[view].map((burnt, index) => burnt - (intakeData[view][index] || 0));

  const labels = view === "today"
    ? ["Today"]
    : view === "week"
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Net Calories",
        data: netCaloriesData,
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Example color
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 800, // Adjust the maximum value based on your data
      },
    },
  };

  return (
    <div>
      <h3>Net Calories Chart ({view})</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default NetCaloriesChart;
