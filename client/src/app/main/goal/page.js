// src/app/main/goal/index.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import axios from "axios";
import WaterChart from "./components/WaterChart";
import WorkoutCalendar from "./Components/MonthlyWorkoutCalendar";
import CaloriesChart from "./Components/CaloriesChart";
import CaloriesIntakeChart from "./components/CaloriesIntakeChart"; // Pie chart version
import TaskList from "./components/TaskList";
import KeyInsights from "./components/KeyInsights";

const workoutDays = [
  new Date(2024, 10, 2), // November 2, 2024
  new Date(2024, 10, 7), // November 7, 2024
  new Date(2024, 10, 15), // November 15, 2024
  // Add more dates as needed
];

const plannedWorkoutDays = [
  new Date(2024, 10, 4), // November 4, 2024
  new Date(2024, 10, 9), // November 9, 2024
  new Date(2024, 10, 20), // November 20, 2024
  // Add more planned dates as needed
];

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
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", fontSize: { xs: "1.5rem", md: "2.125rem" } }}
      >
        Goal Tracking
      </Typography>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        aria-label="View Selector"
        sx={{
          marginBottom: 3,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <ToggleButton value="today">Today</ToggleButton>
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
      </ToggleButtonGroup>

      <Grid container spacing={4} rowSpacing={0} justifyContent="center">
        {/* First Row: Water Chart, Calories Chart, and Calories Intake */}
        {[
          { component: <WaterChart view={view} data={waterData} /> },
          { component: <CaloriesChart view={view} data={caloriesBurntData} /> },
          {
            component: (
              <CaloriesIntakeChart view={view} data={caloriesIntakeData} />
            ),
          },
        ].map(({ component, title }, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                height: "100%",
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {title}
              </Typography>
              {component}
            </Paper>
          </Grid>
        ))}

        {/* Second Row: Workout Calendar (col-4) and Key Insights (col-8) */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2, minHeight: "400px" }}>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ color: "text.primary", fontWeight: "bold" }}
            >
              Workout Tracker
            </Typography>
            <WorkoutCalendar />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 2, minHeight: "400px" }}>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ color: "text.primary", fontWeight: "bold" }}
            >
              Goal Progress
            </Typography>
            <KeyInsights />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GoalTrackingPage;
