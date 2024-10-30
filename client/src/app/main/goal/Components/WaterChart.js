// src/components/WaterChart.js

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale, // x-axis scale
  BarElement, // For the bar chart
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register the necessary components with Chart.js
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const WaterChart = () => {
  const data = {
    labels: ["Today"],
    datasets: [
      {
        label: "Water Consumption (ml)",
        data: [1200], // Example data for today's water consumption
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color
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
        max: 2000, // Set your desired maximum value here
      },
    },
  };

  return (
    <div>
      <h3>Water Consumption Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WaterChart;
