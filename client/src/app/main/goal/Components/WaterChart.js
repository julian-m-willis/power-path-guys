// src/components/WaterChart.js
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Register the necessary components with Chart.js
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const WaterChart = ({ view }) => {
  const [waterData, setWaterData] = useState([2.5, 3.0, 2.8, 3.1, 2.9, 3.3, 2.7, 3.0, 3.2, 2.8, 2.6, 2.9, 3.0, 2.7, 3.1, 2.8]);

  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        // Uncomment and replace with actual API call if needed
        // const response = await axios.get(`https://your-backend-api.com/api/water-intake`, { params: { view } });
        // setWaterData(response.data);

        // Mock data for different views
        if (view === "today") setWaterData([2.8]);
        else if (view === "week") setWaterData([2.5, 3.0, 2.8, 3.1, 2.9, 3.3, 2.7]);
        else if (view === "month") setWaterData([2.5, 3.0, 2.8, 3.1, 2.9, 3.3, 2.7, 3.0, 3.2, 2.8, 2.6, 2.9, 3.0, 2.7, 3.1, 2.8]);
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };

    fetchWaterData();
  }, [view]);

  const chartData = {
    labels: view === "today" ? ["Today"] : view === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Water Consumption (liters)",
        data: waterData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Water Consumption Chart ({view})</h3>
      <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true, max: 4 } } }} />
    </div>
  );
};

export default WaterChart;
