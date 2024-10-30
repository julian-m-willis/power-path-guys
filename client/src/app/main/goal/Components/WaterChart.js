// src/components/WaterChart.js
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

const WaterChart = ({ view }) => {
  // Generate dynamic data based on the selected view
  const getChartData = () => {
    switch (view) {
      case "week":
        return [2, 2.5, 3, 2.2, 3.5, 2.8, 3]; // Example data for the week
      case "month":
        return [2.5, 3, 3.2, 2.8, 2.9, 3, 2.4, 3.5, 2.8, 3.2, 2.5, 3, 3.1, 2.7, 3.4, 2.9]; // Example data for the month
      default:
        return [2.5]; // Example data for today
    }
  };

  const chartData = {
    labels: view === "today" ? ["Today"] : view === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Water Consumption (liters)",
        data: getChartData(),
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Example color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 4, // Adjust the maximum value based on your data
      },
    },
  };

  return (
    <div>
      <h3>Water Consumption Chart ({view})</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default WaterChart;
