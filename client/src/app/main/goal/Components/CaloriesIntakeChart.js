// src/components/CaloriesIntakeChart.js
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; 
import { Typography, Box } from "@mui/material";
import axios from "axios";

// Register the necessary elements with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const CaloriesIntakeChart = ({ view }) => {
  const [caloriesIntakeData, setCaloriesIntakeData] = useState([50, 30, 20]); // Mock data for Carbs, Proteins, Fats

  useEffect(() => {
    const fetchCaloriesIntakeData = async () => {
      try {
        // Uncomment and replace with actual API call if needed
        // const response = await axios.get(`https://your-backend-api.com/api/calories-intake`, { params: { view } });
        // setCaloriesIntakeData(response.data);

        // Mock data based on view
        if (view === "today") {
          setCaloriesIntakeData([50, 30, 20]); // Carbs, Proteins, Fats for today
        } else if (view === "week") {
          setCaloriesIntakeData([45, 35, 20]); // Weekly average
        } else if (view === "month") {
          setCaloriesIntakeData([40, 30, 30]); // Monthly average
        }
      } catch (error) {
        console.error("Error fetching calories intake data:", error);
      }
    };

    fetchCaloriesIntakeData();
  }, [view]);

  const chartData = {
    labels: ["Carbs", "Proteins", "Fats"],
    datasets: [
      {
        label: "Calories Intake Distribution",
        data: caloriesIntakeData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h6" align="center" gutterBottom sx={{ color: "text.primary", fontWeight: "bold" }}>
        Calories Intake Breakdown ({view})
      </Typography>
      <Box sx={{ height: { xs: 250, md: 300 }, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </Box>
    </Box>
  );
};

export default CaloriesIntakeChart;
