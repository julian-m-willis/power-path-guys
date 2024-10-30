// src/components/CaloriesIntakeChart.js

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CaloriesIntakeChart = ({ view }) => {
  // Generate dynamic data based on the selected view
  const getChartData = () => {
    switch (view) {
      case "week":
        return [3500, 4000, 4500]; // Example data for the week
      case "month":
        return [5000, 6000, 5500]; // Example data for the month
      default:
        return [1500, 2000, 1800]; // Example data for today (e.g., Protein, Carbs, Fat)
    }
  };

  const chartData = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        label: "Calories Intake",
        data: getChartData(),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Blue for Protein
          "rgba(75, 192, 192, 0.6)", // Green for Carbs
          "rgba(255, 206, 86, 0.6)", // Yellow for Fat
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Calories Intake Breakdown ({view})</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default CaloriesIntakeChart;
