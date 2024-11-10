import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, useMediaQuery, Grid } from "@mui/material";
import axios from "axios";

const API_BASE_URL = "http://3.107.192.183:5006/diet"; // Replace with actual backend base URL

const DietTracker = () => {
  const today = new Date().getDay();
  const isCompactNav = useMediaQuery("(max-width:800px)");

  const daysOfWeekFull = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const daysOfWeekShort = ["M", "T", "W", "T", "F", "S", "S"];
  const adjustedToday = today === 0 ? 6 : today - 1;

  const [selectedDay, setSelectedDay] = useState(adjustedToday);
  const [calories, setCalories] = useState(1200); // Mock starting value
  const [carbs, setCarbs] = useState(150);        // Mock starting value
  const [fat, setFat] = useState(50);             // Mock starting value
  const [protein, setProtein] = useState(70);     // Mock starting value
  const [water, setWater] = useState(800);        // Mock starting value

  const getDateString = (dayOffset) => {
    const date = new Date();
    date.setDate(date.getDate() - (adjustedToday - dayOffset));
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchUserDataForDay(getDateString(selectedDay));
  }, [selectedDay]);

  const fetchUserDataForDay = async (date) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user-calories`, {
        params: { user_id: 1, date },
      });
      setCalories(response.data.total_calories || 1200);
      setProtein(response.data.total_protein || 70);
      setFat(response.data.total_fat || 50);
      setCarbs(response.data.total_carbs || 150);
      setWater(response.data.total_water || 800);
    } catch (error) {
      console.error("Error fetching user data for the day:", error);
    }
  };

  const handleDaySelection = (index) => {
    if (index <= adjustedToday) {
      setSelectedDay(index);
    }
  };

  const updateProgress = (value, total) => Math.min((value / total) * 100, 100);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 3,
          overflowX: "auto",
          width: "100%",
        }}
      >
        {(isCompactNav ? daysOfWeekShort : daysOfWeekFull).map((d, index) => (
          <Button
            key={index}
            onClick={() => handleDaySelection(index)}
            disabled={index > adjustedToday}
            sx={{
              color: index === selectedDay ? "white" : index === adjustedToday ? "#007bff" : "#888",
              backgroundColor: index === selectedDay ? "#007bff" : "transparent",
              fontWeight: index === adjustedToday ? "bold" : "normal",
              "&:hover": { backgroundColor: "#007bff", color: "white" },
              margin: "0 5px",
              minWidth: "30px",
              padding: "5px 10px",
            }}
          >
            {d}
          </Button>
        ))}
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {/* Calorie Tracker */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="h6">Calorie Tracker</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
              <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Background Circles */}
                <circle cx="100" cy="100" r="90" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                <circle cx="100" cy="100" r="70" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                <circle cx="100" cy="100" r="50" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                <circle cx="100" cy="100" r="30" stroke="#e6e6e6" strokeWidth="10" fill="none" />

                {/* Data Circles */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke={calories > 1520 ? "red" : "#6A1B9A"}
                  strokeDasharray="565"
                  strokeDashoffset={565 - (updateProgress(calories, 1520) * 565) / 100}
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                />
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  stroke={carbs > 175 ? "red" : "#FBC02D"}
                  strokeDasharray="440"
                  strokeDashoffset={440 - (updateProgress(carbs, 175) * 440) / 100}
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                />
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  stroke={fat > 55 ? "red" : "#8BC34A"}
                  strokeDasharray="314"
                  strokeDashoffset={314 - (updateProgress(fat, 55) * 314) / 100}
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                />
                <circle
                  cx="100"
                  cy="100"
                  r="30"
                  stroke={protein > 70 ? "red" : "#03A9F4"}
                  strokeDasharray="188"
                  strokeDashoffset={188 - (updateProgress(protein, 70) * 188) / 100}
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                />
              </svg>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography style={{ color: calories > 1520 ? "red" : "#6A1B9A" }}>
                Calories: {calories} / 1520 kcal
              </Typography>
              <Typography style={{ color: carbs > 175 ? "red" : "#FBC02D" }}>
                Carbs: {carbs} / 175 g
              </Typography>
              <Typography style={{ color: fat > 55 ? "red" : "#8BC34A" }}>
                Fat: {fat} / 55 g
              </Typography>
              <Typography style={{ color: protein > 70 ? "red" : "#03A9F4" }}>
                Protein: {protein} / 70 g
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Water Tracker */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="h6">Water Tracker</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 150,
                  border: "2px solid #e6e6e6",
                  borderRadius: 1,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: `${updateProgress(water, 1320)}%`,
                    backgroundColor: water >= 1320 ? "green" : "#00BFFF",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                  }}
                />
              </Box>
            </Box>
            <Typography>
              {water} / 1320 ml
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DietTracker;
