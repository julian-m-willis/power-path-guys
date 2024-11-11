// src/app/main/goal/index.js
"use client";
import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import axios from "axios";
import WaterChart from "./components/WaterChart";
import CaloriesBurntChart from "./components/CaloriesBurntChart";
import CaloriesIntakeChart2 from "./components/CaloriesIntakeChart.2"; // Bar chart version
import CaloriesIntakeChart from "./components/CaloriesIntakeChart"; // Pie chart version
import NetCaloriesChart from "./components/NetCaloriesChart";
import TaskList from "./components/TaskList";
import KeyInsights from "./components/KeyInsights";

const GoalTrackingPage = () => {
  const [view, setView] = useState("today");
  const [waterData, setWaterData] = useState([]);
  const [caloriesBurntData, setCaloriesBurntData] = useState([]);
  const [caloriesIntakeData, setCaloriesIntakeData] = useState([]);
  const [netCaloriesData, setNetCaloriesData] = useState([]);

  const handleViewChange = (event, newView) => {
    if (newView) setView(newView);
  };

  useEffect(() => {
    // Fetch data functions can go here with axios for actual API integration.
    // Mock data setting as per the view for demonstration
  }, [view]);

  return (
    <Container maxWidth="xl" sx={{ padding: { xs: 2, md: 4 } }}>
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

      <Grid container spacing={4} justifyContent="center">
        {[
          { component: <WaterChart view={view} data={waterData} />, title: "Water Consumption" },
          { component: <CaloriesBurntChart view={view} data={caloriesBurntData} />, title: "Calories Burnt" },
          { component: <CaloriesIntakeChart view={view} data={caloriesIntakeData} />, title: "Calories Intake Breakdown" },
          { component: <CaloriesIntakeChart2 view={view} data={caloriesIntakeData} />, title: "Calories Intake" },
          { component: <NetCaloriesChart view={view} data={netCaloriesData} />, title: "Net Calories" },
        ].map(({ component, title }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ padding: 2, height: "100%", minHeight: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}></Typography>
              {component}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 2, mb: 4 }}>
          <TaskList view={view} />
        </Paper>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <KeyInsights view={view} />
        </Paper>
      </Box>
    </Container>
  );
};

export default GoalTrackingPage;
