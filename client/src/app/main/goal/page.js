"use client";
import React, { useState } from "react";
import { Container, Grid, Paper, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import WaterChart from "./components/WaterChart";
import CaloriesBurntChart from "./components/CaloriesBurntChart";
import CaloriesIntakeChart2 from "./components/CaloriesIntakeChart.2"; // Bar chart version
import CaloriesIntakeChart from "./components/CaloriesIntakeChart"; // Pie chart version
import NetCaloriesChart from "./components/NetCaloriesChart";
import TaskList from "./components/TaskList";
import KeyInsights from "./components/KeyInsights";

const GoalTrackingPage = () => {
  // State for selecting the view
  const [view, setView] = useState("today");

  // Handle view changes
  const handleViewChange = (event, newView) => {
    if (newView) {
      setView(newView);
    }
  };

  // Mock data functions to simulate fetching or generating data based on the view
  const getWaterChartData = () => {
    switch (view) {
      case "week":
        return [300, 400, 450, 350, 600, 500, 700]; // Example data for the week
      case "month":
        return [400, 450, 500, 550, 600, 450, 400, 700, 600, 650, 550, 700, 800, 600, 700, 800]; // Example data for the month
      default:
        return [250]; // Example data for today
    }
  };

  const getCaloriesBurntData = () => {
    return view === "today"
      ? [400]
      : view === "week"
      ? [350, 400, 450, 380, 420, 500, 550]
      : [350, 380, 400, 420, 450, 470, 480, 500, 520, 540, 560, 580, 600, 610, 620, 630];
  };

  const getCaloriesIntakeData = () => {
    return view === "today"
      ? [2000]
      : view === "week"
      ? [1800, 2000, 2200, 2100, 1900, 2400, 2300]
      : [1900, 2000, 2100, 2300, 2200, 2100, 1900, 2000, 2100, 2200, 2300, 1900, 2400, 2200, 2000, 2100];
  };

  return (
    <Container maxWidth="lg" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Goal Tracking
      </Typography>

      {/* Toggle button group to select the view */}
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        aria-label="View Selector"
        style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}
      >
        <ToggleButton value="today" aria-label="Today">
          Today
        </ToggleButton>
        <ToggleButton value="week" aria-label="This Week">
          Week
        </ToggleButton>
        <ToggleButton value="month" aria-label="This Month">
          Month
        </ToggleButton>
      </ToggleButtonGroup>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <WaterChart view={view} data={getWaterChartData()} /> {/* Pass view and data to WaterChart */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <CaloriesBurntChart view={view} /> {/* Pass view to CaloriesBurntChart */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <CaloriesIntakeChart view={view} /> {/* Display Pie chart version */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <CaloriesIntakeChart2 view={view} /> {/* Display Bar chart version */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <NetCaloriesChart
              view={view}
              caloriesBurntData={getCaloriesBurntData()}
              caloriesIntakeData={getCaloriesIntakeData()}
            />
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} style={{ marginTop: "20px" }}>
        <TaskList view={view} /> {/* Optional: Add view-specific tasks */}
      </Paper>

      <Paper elevation={3} style={{ marginTop: "20px" }}>
        <KeyInsights view={view} /> {/* Optional: Add view-specific insights */}
      </Paper>
    </Container>
  );
};

export default GoalTrackingPage;
