// src/components/CaloriesBurntChart.js

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const CaloriesBurntChart = ({ view }) => {
  // Generate dynamic data based on the selected view
  const getChartData = () => {
    switch (view) {
      case "week":
        return [350, 400, 450, 380, 420, 500, 550]; // Example data for the week
      case "month":
        return [350, 380, 400, 420, 450, 470, 480, 500, 520, 540, 560, 580, 600, 610, 620, 630]; // Example data for the month
      default:
        return [400]; // Example data for today
    }
  };

  const chartData = {
    labels: view === "today" ? ["Today"] : view === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Calories Burnt",
        data: getChartData(),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
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
        max: 1000, // Set your desired maximum value here
      },
    },
  };

  return (
    <div>
      <h3>Calories Burnt Chart ({view})</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CaloriesBurntChart;
