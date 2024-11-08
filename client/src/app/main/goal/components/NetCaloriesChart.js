// src/components/NetCaloriesChart.js
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Typography, Box } from "@mui/material";
import axios from "axios";

// Register necessary components with Chart.js
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const NetCaloriesChart = ({ view }) => {
  const [netCaloriesData, setNetCaloriesData] = useState([]);

  useEffect(() => {
    const fetchNetCaloriesData = async () => {
      try {
        // Uncomment and replace with real API calls for actual data
        // const burntResponse = await axios.get(`https://your-backend-api.com/api/calories-burnt`, { params: { view } });
        // const intakeResponse = await axios.get(`https://your-backend-api.com/api/calories-intake`, { params: { view } });
        // Calculate net calories if you fetch both burnt and intake data

        // Mock data based on view
        if (view === "today") {
          setNetCaloriesData([200]); // Single day
        } else if (view === "week") {
          setNetCaloriesData([150, 200, 180, 220, 190, 210, 230]); // 7 days
        } else if (view === "month") {
          setNetCaloriesData([150, 200, 180, 220, 190, 210, 230, 250, 270, 200, 180, 220, 240, 210, 260, 230]); // 16 days
        }
      } catch (error) {
        console.error("Error fetching net calories data:", error);
      }
    };

    fetchNetCaloriesData();
  }, [view]);

  const chartData = {
    labels: view === "today" ? ["Today"] : view === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Net Calories",
        data: netCaloriesData,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
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
        max: Math.max(...netCaloriesData) + 100, // Adjust max y-axis dynamically
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
        Net Calories ({view})
      </Typography>
      <Box sx={{ height: { xs: 250, md: 300 } }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default NetCaloriesChart;
