// src/components/CaloriesBurntChart.js

import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";

const CaloriesBurntChart = () => {
  const data = {
    labels: ["Today"],
    datasets: [
      {
        label: "Calories Burnt",
        data: [350], // Example value
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
        max: 2000, // Example goal or max limit for calories burnt
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Calories Burnt
        </Typography>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default CaloriesBurntChart;
