// src/components/CaloriesBurntChart.js
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const CaloriesBurntChart = ({ view }) => {
  const [caloriesBurntData, setCaloriesBurntData] = useState([]);

  useEffect(() => {
    const fetchCaloriesBurntData = async () => {
      try {
        // Uncomment and replace with the actual endpoint for real data
        // const response = await axios.get(`https://your-backend-api.com/api/calories-burnt`, { params: { view } });
        // setCaloriesBurntData(response.data);

        // Mock data based on view
        if (view === "today") {
          setCaloriesBurntData([450]); // Single day
        } else if (view === "week") {
          setCaloriesBurntData([400, 500, 450, 520, 470, 490, 510]); // 7 days
        } else if (view === "month") {
          setCaloriesBurntData([400, 500, 450, 520, 470, 490, 510, 480, 530, 510, 550, 460, 520, 500, 480, 540]); // 16 days
        }
      } catch (error) {
        console.error("Error fetching calories burnt data:", error);
      }
    };

    fetchCaloriesBurntData();
  }, [view]);

  const chartData = {
    labels: view === "today" ? ["Today"] : view === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`),
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

  return (
    <div>
      <h3>Calories Burnt Chart ({view})</h3>
      <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true, max: 600 } } }} />
    </div>
  );
};

export default CaloriesBurntChart;
