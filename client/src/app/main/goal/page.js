// tracking.js
"use client";
import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import WaterChart from "./components/WaterChart"; // Update the path as needed
import CaloriesBurntChart from "./components/WaterChart";
import CaloriesIntakeChart from "./components/CaloriesIntakeChart";
import TaskList from "./components/TaskList";
import KeyInsights from "./components/KeyInsights";

const GoalTrackingPage = () => {
  return (
    <Container maxWidth="lg" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Goal Tracking
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <WaterChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <CaloriesBurntChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <CaloriesIntakeChart />
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} style={{ marginTop: "20px" }}>
        <TaskList />
      </Paper>

      <Paper elevation={3} style={{ marginTop: "20px" }}>
        <KeyInsights />
      </Paper>
    </Container>
  );
};

export default GoalTrackingPage;
