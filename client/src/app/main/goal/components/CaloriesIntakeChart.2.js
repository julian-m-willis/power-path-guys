// src/components/CaloriesIntakeChart2.js
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const CaloriesIntakeChart2 = ({ view }) => {
  const [caloriesIntakeData, setCaloriesIntakeData] = useState([]);

  useEffect(() => {
    const fetchCaloriesIntakeData = async () => {
      try {
        // Uncomment the following lines to fetch real data
        // const response = await axios.get(`https://your-backend-api.com/api/calories-intake`, { params: { view } });
        // setCaloriesIntakeData(response.data);

        // Mock data based on view
        if (view === "today") {
          setCaloriesIntakeData([2000]); // Single day intake
        } else if (view === "week") {
          setCaloriesIntakeData([1800, 2000, 2200, 2100, 1900, 2400, 2300]); // Weekly intake
        } else if (view === "month") {
          setCaloriesIntakeData([1900, 2000, 2100, 2300, 2200, 2100, 1900, 2000, 2100, 2200, 2300, 1900, 2400, 2200, 2000, 2100]); // 16-day intake
        }
      } catch (error) {
        console.error("Error fetching calories intake data:", error);
      }
    };

    fetchCaloriesIntakeData();
  }, [view]);

  const chartData = {
    labels: view === "today" ? ["Today"] : view === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Calories Intake",
        data: caloriesIntakeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Calories Intake Chart ({view})</h3>
      <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true, max: 3000 } } }} />
    </div>
  );
};

export default CaloriesIntakeChart2;
