// src/components/CaloriesIntakeChart.2.js

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

const CaloriesIntakeChart = ({ view }) => {
  // Generate dynamic data based on the selected view
  const getChartData = () => {
    switch (view) {
      case "week":
        return [1800, 2000, 2200, 2100, 1900, 2400, 2300]; // Example data for the week
      case "month":
        return [1900, 2000, 2100, 2300, 2200, 2100, 1900, 2000, 2100, 2200, 2300, 1900, 2400, 2200, 2000, 2100]; // Example data for the month
      default:
        return [2000]; // Example data for today
    }
  };

  const chartData = {
    labels: view === "today" ? ["Today"] : view === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Calories Intake",
        data: getChartData(),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Example color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 3000, // Adjust the maximum value based on your data
      },
    },
  };

  return (
    <div>
      <h3>Calories Intake Chart ({view})</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CaloriesIntakeChart;
