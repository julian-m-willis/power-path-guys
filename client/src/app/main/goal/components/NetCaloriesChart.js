// src/components/NetCaloriesChart.js
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const NetCaloriesChart = ({ view }) => {
  const [netCaloriesData, setNetCaloriesData] = useState([]);

  useEffect(() => {
    const fetchNetCaloriesData = async () => {
      try {
        // Uncomment and replace with the actual endpoint for real data
        // const burntResponse = await axios.get(`https://your-backend-api.com/api/calories-burnt`, { params: { view } });
        // const intakeResponse = await axios.get(`https://your-backend-api.com/api/calories-intake`, { params: { view } });

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

  return (
    <div>
      <h3>Net Calories Chart ({view})</h3>
      <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true, max: 800 } } }} />
    </div>
  );
};

export default NetCaloriesChart;
