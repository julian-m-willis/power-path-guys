// src/app/main/goal/index.js
"use client";
import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios"; // Import axios
import WaterChart from "./components/WaterChart";
import CaloriesBurntChart from "./components/CaloriesBurntChart";
import CaloriesIntakeChart2 from "./components/CaloriesIntakeChart.2"; // Bar chart version
import CaloriesIntakeChart from "./components/CaloriesIntakeChart"; // Pie chart version
import NetCaloriesChart from "./components/NetCaloriesChart";
import TaskList from "./components/TaskList";
import KeyInsights from "./components/KeyInsights";

const GoalTrackingPage = () => {
  const [view, setView] = useState("today");

  // State variables to hold API data
  const [waterData, setWaterData] = useState([]);
  const [caloriesBurntData, setCaloriesBurntData] = useState([]);
  const [caloriesIntakeData, setCaloriesIntakeData] = useState([]);
  const [netCaloriesData, setNetCaloriesData] = useState([]);

  const handleViewChange = (event, newView) => {
    if (newView) setView(newView);
  };

  // Example of how you might call your friend's backend API for data
  useEffect(() => {
    // Fetch water data
    const fetchWaterData = async () => {
      try {
        // Uncomment the following lines to use axios
        // const response = await axios.get(`https://your-backend-api.com/api/water-intake`, {
        //   params: { view },
        // });
        // setWaterData(response.data); // Set fetched water data
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };

    // Fetch calories burnt data
    const fetchCaloriesBurntData = async () => {
      try {
        // Uncomment the following lines to use axios
        // const response = await axios.get(`https://your-backend-api.com/api/calories-burnt`, {
        //   params: { view },
        // });
        // setCaloriesBurntData(response.data); // Set fetched calories burnt data
      } catch (error) {
        console.error("Error fetching calories burnt data:", error);
      }
    };

    // Fetch calories intake data
    const fetchCaloriesIntakeData = async () => {
      try {
        // Uncomment the following lines to use axios
        // const response = await axios.get(`https://your-backend-api.com/api/calories-intake`, {
        //   params: { view },
        // });
        // setCaloriesIntakeData(response.data); // Set fetched calories intake data
      } catch (error) {
        console.error("Error fetching calories intake data:", error);
      }
    };

    // Calculate net calories based on intake and burnt data
    const calculateNetCalories = () => {
      // You can calculate net calories based on fetched intake and burnt data here
      // Example:
      // const netData = caloriesBurntData.map((burnt, index) => burnt - (caloriesIntakeData[index] || 0));
      // setNetCaloriesData(netData);
    };

    fetchWaterData();
    fetchCaloriesBurntData();
    fetchCaloriesIntakeData();
    calculateNetCalories();
  }, [view]);

  return (
    <Container maxWidth="lg" sx={{ padding: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
        Goal Tracking
      </Typography>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        aria-label="View Selector"
        sx={{ marginBottom: 3, display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <ToggleButton value="today">Today</ToggleButton>
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
      </ToggleButtonGroup>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {/* Pass waterData to WaterChart */}
            <WaterChart view={view} data={waterData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {/* Pass caloriesBurntData to CaloriesBurntChart */}
            <CaloriesBurntChart view={view} data={caloriesBurntData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {/* Pass caloriesIntakeData to CaloriesIntakeChart (Pie Chart) */}
            <CaloriesIntakeChart view={view} data={caloriesIntakeData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {/* Pass caloriesIntakeData to CaloriesIntakeChart2 (Bar Chart) */}
            <CaloriesIntakeChart2 view={view} data={caloriesIntakeData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {/* Pass netCaloriesData to NetCaloriesChart */}
            <NetCaloriesChart view={view} data={netCaloriesData} />
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ mt: 3, padding: 2 }}>
        <TaskList view={view} />
      </Paper>

      <Paper elevation={3} sx={{ mt: 3, padding: 2 }}>
        <KeyInsights view={view} />
      </Paper>
    </Container>
  );
};

export default GoalTrackingPage;
