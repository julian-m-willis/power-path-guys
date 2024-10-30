// src/components/NetCaloriesChart.js

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Grid } from "@mui/material"; // Ensure Grid is imported

ChartJS.register(LinearScale, CategoryScale, LineElement, PointElement, Title, Tooltip, Legend);

const NetCaloriesChart = ({ view, caloriesBurntData, caloriesIntakeData }) => {
  // Calculate net calories burnt based on the data for burnt and intake
  const getNetCaloriesData = () => {
    if (!caloriesBurntData || !caloriesIntakeData) return [];

    return caloriesBurntData.map((burnt, index) => burnt - (caloriesIntakeData[index] || 0));
  };

  const chartData = {
    labels: view === "today" ? ["Today"] : view === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Net Calories Burnt",
        data: getNetCaloriesData(),
        backgroundColor: "rgba(255, 159, 64, 0.6)", // Example color for net calories
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
        fill: false,
        lineTension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Grid container>
      <h3>Net Calories Burnt Chart ({view})</h3>
      <Line data={chartData} options={options} />
    </Grid>
  );
};

export default NetCaloriesChart;

  