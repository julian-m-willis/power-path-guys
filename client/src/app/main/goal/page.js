// src/app/main/goal/index.js
"use client";
import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import axios from "axios";
import WaterChart from "./components/WaterChart";
import CaloriesBurntChart from "./components/CaloriesBurntChart";
import CaloriesIntakeChart2 from "./components/CaloriesIntakeChart.2";
import CaloriesIntakeChart from "./components/CaloriesIntakeChart";
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

  useEffect(() => {
    // Fetch water data
    const fetchWaterData = async () => {
      try {
        // Uncomment the following lines to use axios
        // const response = await axios.get(`https://your-backend-api.com/api/water-intake`, {
        //   params: { view },
        // });
        // setWaterData(response.data);
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
        // setCaloriesBurntData(response.data);
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
        // setCaloriesIntakeData(response.data);
      } catch (error) {
        console.error("Error fetching calories intake data:", error);
      }
    };

    // Calculate net calories
    const calculateNetCalories = () => {
      // Example calculation
      // const netData = caloriesBurntData.map((burnt, index) => burnt - (caloriesIntakeData[index] || 0));
      // setNetCaloriesData(netData);
    };

    fetchWaterData();
    fetchCaloriesBurntData();
    fetchCaloriesIntakeData();
    calculateNetCalories();
  }, [view]);

  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 2, md: 4 }, pb: 6 }}>
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
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <WaterChart view={view} data={waterData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <CaloriesBurntChart view={view} data={caloriesBurntData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <CaloriesIntakeChart view={view} data={caloriesIntakeData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <CaloriesIntakeChart2 view={view} data={caloriesIntakeData} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <NetCaloriesChart view={view} data={netCaloriesData} />
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <TaskList view={view} />
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <KeyInsights view={view} />
        </Paper>
      </Box>

      {/* Spacer for bottom navigation */}
      <Box sx={{ height: 60 }} />
    </Container>
  );
};

export default GoalTrackingPage;
