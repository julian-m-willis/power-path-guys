// src/components/WaterChart.js
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Typography, Box } from "@mui/material";
import axios from "axios";

// Register the necessary components with Chart.js
import annotationPlugin from 'chartjs-plugin-annotation';
ChartJS.register(annotationPlugin);
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const WaterChart = ({ view }) => {
  const [waterData, setWaterData] = useState([2.5, 3.0, 2.8, 3.1, 2.9, 3.3, 2.7, 3.0, 3.2, 2.8, 2.6, 2.9, 3.0, 2.7, 3.1, 2.8]);

  useEffect(() => {
    const fetchWaterData = async () => {
      const userId = localStorage.getItem("user_id") || 2;
      try {
        // Replace with actual API call
        const response = await axios.get(`/water-consumption/${userId}`);
  
        // Update the state based on the selected view
        if (view === "today") {
          setWaterData([response.data.today]); // Single day data as an array for consistency
        } else if (view === "week") {
          setWaterData(response.data.week); // Array of 7 days
        } else if (view === "month") {
          setWaterData(response.data.month); // Array of 30 days
        }
      } catch (error) {
        console.error("Error fetching calories burnt data:", error);
      }
    };

    fetchWaterData();
  }, [view]);
    // Generate last 7 days dynamically
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
        label: "Water Consumption",
        data: waterData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
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
            yMin: 2500,
            yMax: 2500,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: '2.5L Goal',
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
      {/* <Typography variant="h6" align="center" gutterBottom sx={{ color: "text.primary", fontWeight: "bold" }}> */}
        {/* Water Consumption ({view})
      </Typography> */}
      <Box sx={{ height: 350 }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default WaterChart;
