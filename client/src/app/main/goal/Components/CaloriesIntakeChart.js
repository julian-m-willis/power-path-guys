// src/components/CaloriesIntakeChart.js
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import ArcElement for pie charts
import axios from "axios";

// Register the necessary elements with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const CaloriesIntakeChart = ({ view }) => {
  const [caloriesIntakeData, setCaloriesIntakeData] = useState([50, 30, 20]); // Mock data for Carbs, Proteins, Fats

  useEffect(() => {
    const fetchCaloriesIntakeData = async () => {
      try {
        // Uncomment the following lines to fetch real data
        // const response = await axios.get(`https://your-backend-api.com/api/calories-intake`, { params: { view } });
        // setCaloriesIntakeData(response.data); // Set fetched calories intake data

        // Mock data based on view
        if (view === "today") {
          setCaloriesIntakeData([50, 30, 20]); // Daily average: Carbs, Proteins, Fats
        } else if (view === "week") {
          setCaloriesIntakeData([45, 35, 20]); // Weekly average: Carbs, Proteins, Fats
        } else if (view === "month") {
          setCaloriesIntakeData([40, 30, 30]); // Monthly average: Carbs, Proteins, Fats
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
        label: "Calories Intake",
        data: caloriesIntakeData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <h3>Calories Intake Chart ({view})</h3>
      <Pie data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default CaloriesIntakeChart;
