"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TinderComponent from "./tindert";
import { TypewriterEffect } from "@/components/ui/typewriter-effect"; // Assuming you have a TypewriterEffect component

const API_BASE_URL = "http://3.107.192.183:5006/diet"; // Replace with your backend base URL

const Diet = () => {
  const today = new Date().getDay(); // 0 (Sunday) - 6 (Saturday)
  const isMobile = useMediaQuery("(max-width:600px)");

  const daysOfWeekFull = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const daysOfWeekShort = ["M", "T", "W", "T", "F", "S", "S"];
  const adjustedToday = today === 0 ? 6 : today - 1; // Adjust to make Monday the first day

  const [selectedDay, setSelectedDay] = useState(adjustedToday);
  const [foodAddMessage, setFoodAddMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
  const [water, setWater] = useState(0);
  const [userId] = useState(1); // Replace with actual user ID

  useEffect(() => {
    fetchUserDataForDay(userId, getDateString(selectedDay));
  }, [selectedDay]);

  const getDateString = (dayOffset) => {
    const date = new Date();
    date.setDate(date.getDate() - (adjustedToday - dayOffset));
    return date.toISOString().split("T")[0];
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleDaySelection = (index) => {
    if (index <= adjustedToday) {
      setSelectedDay(index);
    }
  };

  const fetchUserDataForDay = async (userId, date) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user-calories`, {
        params: { user_id: userId, date },
      });
      setCalories(response.data.total_calories || 0);
      setProtein(response.data.total_protein || 0);
      setFat(response.data.total_fat || 0);
      setCarbs(response.data.total_carbs || 0);
      setWater(response.data.total_water || 0);
    } catch (error) {
      console.error("Error fetching user data for the day:", error);
    }
  };

  const handleWaterAdd = async (event) => {
    event.preventDefault();
    const waterInput = parseInt(document.getElementById("waterInput").value);
    if (!isNaN(waterInput)) {
      try {
        await axios.post(`${API_BASE_URL}/log-water`, null, {
          params: {
            user_id: userId,
            amount_ml: waterInput,
            date: getDateString(selectedDay),
          },
        });
        fetchUserDataForDay(userId, getDateString(selectedDay));
        document.getElementById("waterInput").value = "";
      } catch (error) {
        console.error("Error logging water intake:", error);
      }
    }
  };

  const handleFoodAdd = async (event) => {
    event.preventDefault();
    const foodInput = document.getElementById("foodInput").value;
    if (foodInput) {
      try {
        await axios.post(`${API_BASE_URL}/add-food-record`, null, {
          params: {
            user_id: userId,
            food_name: foodInput,
          },
        });

        setFoodAddMessage("Food added successfully.");
        fetchUserDataForDay(userId, getDateString(selectedDay));
        document.getElementById("foodInput").value = "";
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setFoodAddMessage("Food not found. Please check your input and try again.");
        } else {
          setFoodAddMessage("Error adding food. Please try again later.");
        }
        console.error("Error adding food record:", error);
      }
    } else {
      setFoodAddMessage("Please enter a valid food item.");
    }
  };

  const updateProgress = (value, total) => Math.min((value / total) * 100, 100);

  return (
    <Box sx={{ padding: 2 }}>
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            color: "#c1ff72",
            marginBottom: 1,
          }}
        >
          Diet Tracker
        </Typography>
        <TypewriterEffect 
          words={[
            { text: "Track Your Nutrition" },
            { text: "Manage Your Goals" },
            { text: "Stay Hydrated" }
          ]}
          className="text-lg md:text-xl"
          style={{ color: "#c1ff72", fontWeight: 'bold' }}
        />
      </Box>

      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "inherit",
          borderBottom: 1,
          borderColor: "divider",
          marginBottom: 2,
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          aria-label="diet navigation tabs"
          TabIndicatorProps={{
            style: { backgroundColor: "#c1ff72" },
          }}
          textColor="inherit"
        >
          <Tab label="Diet Tracker" sx={{ color: selectedTab === 0 ? "#c1ff72" : "white" }} />
          <Tab label="Recommendation" sx={{ color: selectedTab === 1 ? "#c1ff72" : "white" }} />
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 3,
              flexWrap: "nowrap",
              overflowX: "auto",
              width: "100%",
            }}
          >
            {(isMobile ? daysOfWeekShort : daysOfWeekFull).map((d, index) => (
              <Button
                key={index}
                onClick={() => handleDaySelection(index)}
                disabled={index > adjustedToday}
                sx={{
                  color: index === selectedDay ? "white" : index === adjustedToday ? "#c1ff72" : "#888",
                  backgroundColor: index === selectedDay ? "#c1ff72" : "transparent",
                  fontWeight: index === adjustedToday ? "bold" : "normal",
                  "&:hover": {
                    backgroundColor: index !== selectedDay ? "#c1ff72" : "transparent",
                    color: "white"
                  },
                  margin: isMobile ? "0 2px" : "0 5px",
                  padding: isMobile ? "5px 4px" : "10px 15px",
                  fontSize: isMobile ? "0.75rem" : "1rem",
                  borderRadius: 1,
                  boxShadow: index === adjustedToday ? "0px 2px 8px rgba(193, 255, 114, 0.4)" : "none",
                  transition: "all 0.3s ease",
                  minWidth: isMobile ? "30px" : "auto",
                }}
              >
                {d}
              </Button>
            ))}
          </Box>

          <Grid container spacing={isMobile ? 2 : 4} alignItems="center" justifyContent="center">
            {/* Calorie Tracker */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  marginBottom: 3,
                  animation: "fadeIn 1s",
                  height: 550,
                  width: 350,
                  backgroundColor: "#1c1c1e",
                  color: "white",
                }}
              >
                <Typography variant="h6" align="center" gutterBottom sx={{ color: "#c1ff72" }}>
                  Calorie Tracker
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 2,
                    height: 200,
                  }}
                >
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" stroke="#333" strokeWidth="10" fill="none" />
                    <circle cx="100" cy="100" r="70" stroke="#333" strokeWidth="10" fill="none" />
                    <circle cx="100" cy="100" r="50" stroke="#333" strokeWidth="10" fill="none" />
                    <circle cx="100" cy="100" r="30" stroke="#333" strokeWidth="10" fill="none" />
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

                <Box sx={{ textAlign: "center", marginBottom: 2 }}>
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
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  marginBottom: 3,
                  animation: "fadeIn 1s",
                  width: 350,
                  height: 550,
                  backgroundColor: "#1c1c1e",
                  color: "white",
                }}
              >
                <Typography variant="h6" align="center" gutterBottom sx={{ color: "#c1ff72" }}>
                  Water Tracker
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 2,
                    height: 310,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 200,
                      border: "3px solid #333",
                      borderRadius: 1,
                      position: "relative",
                      minHeight: 250,
                      marginBottom: 1,
                    }}
                  >
                    <Box
                      sx={{
                        height: `calc(${(Math.min(water, 1320) / 1320) * 100}%)`,
                        backgroundColor: water >= 1320 ? "green" : "#00BFFF",
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        transition: "height 0.5s ease-in-out",
                      }}
                    ></Box>
                  </Box>
                  <Typography variant="h6" align="center">
                    {water} / 1320 ml
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {selectedTab === 1 && <TinderComponent />}
    </Box>
  );
};

export default Diet;
