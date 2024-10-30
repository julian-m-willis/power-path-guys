// src/app/main/goal/index.js
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
  const [view, setView] = useState("today");

  const handleViewChange = (event, newView) => {
    if (newView) setView(newView);
  };

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
            <WaterChart view={view} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <CaloriesBurntChart view={view} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <CaloriesIntakeChart view={view} /> {/* This is the pie chart version */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <CaloriesIntakeChart2 view={view} /> {/* This is the bar chart version */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <NetCaloriesChart view={view} />
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
