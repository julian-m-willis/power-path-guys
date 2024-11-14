// src/components/CaloriesChart.js
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography, Box } from "@mui/material";
import axios from "axios";

// Register the necessary components with Chart.js
import annotationPlugin from 'chartjs-plugin-annotation';
ChartJS.register(annotationPlugin);
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

axios.defaults.baseURL = "http://3.107.192.183:5006/goal"; // Replace with your base URL

const CaloriesChart = ({ view }) => {
  const [caloriesIntakeData, setCaloriesIntakeData] = useState([]);
  const [caloriesBurntData, setCaloriesBurntData] = useState([]);

  useEffect(() => {
    const fetchCaloriesData = async () => {
      const userId = localStorage.getItem("user_id") || 2;
      try {
        // Fetch Calories Intake Data
        const intakeResponse = await axios.get(`/calories-intake/${userId}`);
        if (view === "today") {
          setCaloriesIntakeData([intakeResponse.data.today]);
        } else if (view === "week") {
          setCaloriesIntakeData(intakeResponse.data.week);
        } else if (view === "month") {
          setCaloriesIntakeData(intakeResponse.data.month);
        }

        // Fetch Calories Burnt Data
        const burntResponse = await axios.get(`/calories-burnt/${userId}`);
        if (view === "today") {
          setCaloriesBurntData([burntResponse.data.today]);
        } else if (view === "week") {
          setCaloriesBurntData(burntResponse.data.week);
        } else if (view === "month") {
          setCaloriesBurntData(burntResponse.data.month);
        }
      } catch (error) {
        console.error("Error fetching calories data:", error);
      }
    };

    fetchCaloriesData();
  }, [view]);

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString("en-US", { weekday: "short" })); // e.g., "Sun", "Mon"
    }
    return days;
  };

  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" })); // e.g., "Nov 1"
    }
    return days;
  };

  const labels =
    view === "today"
      ? ["Today"]
      : view === "week"
      ? getLast7Days()
      : getLast30Days();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Calories Intake",
        data: caloriesIntakeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Calories Burnt",
        data: caloriesBurntData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Net Calories",
        data: caloriesIntakeData.map((intake, index) => intake - (caloriesBurntData[index] || 0)),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
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
        max: 3000, // Dynamically sets the max y-axis based on the data
        title: {
          display: true,
          text: "Liters",
        },
      },
      x: {
        title: {
          display: true,
          text: view === "today" ? "Today" : view === "week" ? "Days of the Week" : "Days of the Month",
        },
      },
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 2000,
            yMax: 2000,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: '200 Goal',
              enabled: true,
              position: 'end',
              backgroundColor: 'rgba(255, 99, 132, 0.8)',
              color: '#fff',
            },
          },
        },
      },
    },
  };

  return (
    <Box>
      <Box sx={{ height: 350 }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default CaloriesChart;
