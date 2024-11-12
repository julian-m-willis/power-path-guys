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
  Divider,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EditIcon from "@mui/icons-material/Edit";
import WaterChart from "./components/WaterChart";
import WorkoutCalendar from "./Components/MonthlyWorkoutCalendar";
import CaloriesChart from "./Components/CaloriesChart";
import CaloriesIntakeChart from "./components/CaloriesIntakeChart"; // Pie chart version
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
    <Container maxWidth="xl" sx={{ padding: { xs: 2, md: 4 }, marginBottom: 10 }}>
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
        <Grid item xs={12} md={4}>
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
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ color: "text.primary", fontWeight: "bold" }}
            >
              Goals Insight to: Lose Weight
            </Typography>
            <Box
              sx={{
                padding: 3,
                borderRadius: 2,
                // backgroundColor: "background.paper",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: 350,
                width: 350,
              }}
            >
              <Typography>
                You should aim to:
              </Typography>
              <Divider></Divider>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <WaterDropIcon color="primary" sx={{ mr: 1 }} />
                Water Consumption:{" "}
                <Typography
                  component="span"
                  sx={{ ml: "auto", fontWeight: "bold" }}
                >
                  2.5 Liters
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FastfoodIcon color="secondary" sx={{ mr: 1 }} />
                Calories / Day:{" "}
                <Typography
                  component="span"
                  sx={{ ml: "auto", fontWeight: "bold" }}
                >
                  2,000 kcal
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FastfoodIcon color="success" sx={{ mr: 1 }} />
                Protein / Day:{" "}
                <Typography
                  component="span"
                  sx={{ ml: "auto", fontWeight: "bold" }}
                >
                  150g
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FastfoodIcon color="warning" sx={{ mr: 1 }} />
                Carbs / Day:{" "}
                <Typography
                  component="span"
                  sx={{ ml: "auto", fontWeight: "bold" }}
                >
                  250g
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FastfoodIcon color="error" sx={{ mr: 1 }} />
                Fat / Day:{" "}
                <Typography
                  component="span"
                  sx={{ ml: "auto", fontWeight: "bold" }}
                >
                  70g
                </Typography>
              </Typography>

              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FitnessCenterIcon color="action" sx={{ mr: 1 }} />
                Calories Burnt / day:{" "}
                <Typography
                  component="span"
                  sx={{ ml: "auto", fontWeight: "bold" }}
                >
                  500 kcal
                </Typography>
              </Typography>
            </Box>
          </Paper>
        </Grid>
        {[
          {
            component: <WaterChart view={view} data={waterData} />,
            title:
              view === "today"
                ? "Water Consumption (Today)"
                : view === "week"
                ? "Water Consumption (Past 7 Days)"
                : "Water Consumption (Past 30 Days)",
          },
          {
            component: <CaloriesChart view={view} data={caloriesBurntData} />,
            title:
              view === "today"
                ? "Calories Report (Today)"
                : view === "week"
                ? "Calories Report (Past 7 Days)"
                : "Calories Report (Past 30 Days)",
          },
          // {
          //   component: (
          //     <CaloriesIntakeChart view={view} data={caloriesIntakeData} />
          //   ),
          // },
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
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{ color: "text.primary", fontWeight: "bold" }}
              >
                {title}
              </Typography>
              {component}
            </Paper>
          </Grid>
        ))}

        {/* Second Row: Workout Calendar (col-4) and Key Insights (col-8) */}
        <Grid item xs={12} md={4}>
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
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ color: "text.primary", fontWeight: "bold" }}
            >
              Workout Tracker
            </Typography>
            <Box sx={{ height: 450 }}>
              <WorkoutCalendar />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 2, minHeight: "450px" }}>
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
