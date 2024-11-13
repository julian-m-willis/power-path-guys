// src/components/CaloriesBurntChart.js
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Typography, Box } from "@mui/material";
import axios from "axios";

// Register the necessary components with Chart.js
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);
axios.defaults.baseURL = "http://3.107.192.183:5006/goal"; 

const CaloriesBurntChart = ({ view }) => {
  const [caloriesBurntData, setCaloriesBurntData] = useState([]);

  useEffect(() => {
    const fetchCaloriesBurntData = async () => {
      const userId = localStorage.getItem("user_id") || 2;
      try {
        // Replace with actual API call
        const response = await axios.get(`/calories-burnt/${userId}`);
  
        // Update the state based on the selected view
        if (view === "today") {
          setCaloriesBurntData([response.data.today]); // Single day data as an array for consistency
        } else if (view === "week") {
          setCaloriesBurntData(response.data.week); // Array of 7 days
        } else if (view === "month") {
          setCaloriesBurntData(response.data.month); // Array of 30 days
        }
      } catch (error) {
        console.error("Error fetching calories burnt data:", error);
      }
    };
  
    fetchCaloriesBurntData();
  }, [view]);
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('en-US', { weekday: 'short' })); // e.g., "Sun", "Mon"
    }
    return days;
  };

const weekLabels = getLast7Days();


  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })); // e.g., "Nov 1"
    }
    return days;
  };
  
  const monthLabels = getLast30Days();

  const chartData = {
    labels: view === "today"
      ? ["Today"]
      : view === "week"
        ? weekLabels // Use dynamically generated week labels
        : monthLabels, // Use dynamically generated month labels
    datasets: [
      {
        label: "Calories Burnt",
        data: caloriesBurntData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...caloriesBurntData) + 50, // Dynamically adjust max y-axis based on data
        title: {
          display: true,
          text: "Calories",
        },
      },
      x: {
        title: {
          display: true,
          text: view === "today" ? "Today" : view === "week" ? "Days of the Week" : "Days of the Month",
        },
      },
    },
  };

  return (
    <Box>
      <Typography variant="h6" align="center" gutterBottom sx={{ color: "text.primary", fontWeight: "bold" }}>
        Calories Burnt ({view})
      </Typography>
      <Box sx={{ height: { xs: 250, md: 300 } }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default CaloriesBurntChart;
