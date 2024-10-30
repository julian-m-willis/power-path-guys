// src/components/CaloriesIntakeChart.js

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement, // Import the ArcElement for pie charts
  Tooltip,
  Legend
} from "chart.js";

// Register the ArcElement and other necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const CaloriesIntakeChart = () => {
  const data = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        label: "Calories Intake",
        data: [500, 800, 300], // Example data values
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
      <h3>Calories Intake Breakdown</h3>
      <Pie data={data} />
    </div>
  );
};

export default CaloriesIntakeChart;
