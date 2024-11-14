"use client";

import React, { useState, useEffect, useRef } from "react";
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
// import TinderComponent from "./tindert";
import dynamic from "next/dynamic";
import LayoutGrid from "./mealrec";
// import LayoutGrid from "./LayoutGrid"
import MealPlanner from './MealSwipeComponent (1)';
import { TypewriterEffect } from "../../../components/ui/typewriter-effect";

const API_BASE_URL = "http://3.107.192.183:5006/diet";

const Diet = () => {
  const today = new Date().getDay();
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
  const adjustedToday = today === 0 ? 6 : today - 1;

  const [selectedDay, setSelectedDay] = useState(adjustedToday);
  const [foodAddMessage, setFoodAddMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
  const [water, setWater] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("user_id") || 2;
    fetchUserDataForDay(userId, getDateString(selectedDay));
  }, [selectedDay]);

  const getDateString = (dayOffset) => {
    const date = new Date();
    date.setDate(date.getDate() - (adjustedToday - dayOffset));
    return date.toISOString().split("T")[0];
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
  const waterInputRef = useRef(null);
  const foodInputRef = useRef(null);

  const handleWaterAdd = async (event) => {
    event.preventDefault();
    const waterInput = parseInt(waterInputRef.current.value);
    if (!isNaN(waterInput)) {
      try {
        const userId = localStorage.getItem("user_id") || 2;
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
    const foodInput = foodInputRef.current.value;
    if (foodInput) {
      try {
        const userId = localStorage.getItem("user_id") || 2;
        const response = await axios.post(
          `${API_BASE_URL}/add-food-record`,
          null,
          {
            params: {
              user_id: userId,
              food_name: foodInput,
            },
          }
        );

        setFoodAddMessage("Food added successfully.");
        fetchUserDataForDay(userId, getDateString(selectedDay));
        document.getElementById("foodInput").value = "";
      } catch (error) {
        // Check if the error is a 404 response from the backend
        if (error.response && error.response.status === 404) {
          setFoodAddMessage(
            "Food not found. Please check your input and try again."
          );
        } else {
          // For other errors, display a general message
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
    <div>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');`}
      </style>
      <div className="flex flex-col justify-center h-[calc(40vh-20px)] items-center px-4 text-center"
          style={{
            backgroundImage: "url('/dietbg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
      >
      <p className="font-bold text-5xl md:text-6xl" style={{ fontFamily: "'Anton', sans-serif", letterSpacing:"0.02em", fontWeight:500, }}>Diet Tracker</p>
      <TypewriterEffect 
        words={[
          { text: "Fuel" },
          { text: "Hydrate" },
          { text: "Conquer" }
        ]}
        className="font-bold text-3xl md:text-7xl" 
        style={{ color: "#c1ff72", fontFamily: "'Anton', sans-serif",  letterSpacing: "0.02em",
        fontWeight: 500 }}
      />

      </div>  

      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000, // Ensure it's above other elements
          backgroundColor: "inherit", // Keeps the background consistent
          borderBottom: 1,
          borderColor: "divider",
          marginBottom: 2,
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          centered
          aria-label="diet navigation tabs"
        >
          <Tab label="Diet Tracker" />
          <Tab label="Recommendation" />
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <>
          {/* <Typography variant="h4" align="center" gutterBottom>
            {selectedDay === adjustedToday ? `Today` : daysOfWeekFull[selectedDay]}
          </Typography> */}

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
                onClick={() => setSelectedDay(index)}
                disabled={index > adjustedToday}
                sx={{
                  color: index === selectedDay ? "black" : index === adjustedToday ? "#c1ff72" : "#888",
                  backgroundColor: index === selectedDay ? "#c1ff72" : "transparent",
                  fontWeight: index === adjustedToday ? "bold" : "normal",
                  "&:hover": {
                    backgroundColor: "#2ecc71", // New hover background color
                    color: "white",
                  },
                  margin: isMobile ? "0 2px" : "0 5px", // Reduced margin for compact view
                  padding: isMobile ? "5px 4px" : "10px 15px", // Smaller padding for mobile
                  fontSize: isMobile ? "0.75rem" : "1rem", // Smaller font size for mobile
                  borderRadius: 1,
                  boxShadow:
                    index === adjustedToday
                      ? "0px 2px 8px rgba(0, 123, 255, 0.4)"
                      : "none",
                  transition: "all 0.3s ease",
                  minWidth: isMobile ? "30px" : "auto", // Ensures buttons are narrow on mobile
                }}
              >
                {d}
              </Button>
            ))}
          </Box>

          <Grid
            container
            spacing={isMobile ? 2 : 4}
            alignItems="center"
            justifyContent="center"
          >
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
                  mb: { xs: 6, sm: 8, md: 9 },
                }}
              >
                <Typography variant="h6" align="center" gutterBottom>
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
                    {/* SVG circles */}
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      stroke="#e6e6e6"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      stroke="#e6e6e6"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="50"
                      stroke="#e6e6e6"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="30"
                      stroke="#e6e6e6"
                      strokeWidth="10"
                      fill="none"
                    />
                    {/* Data Circles */}
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      stroke={calories > 2000 ? "red" : "#6A1B9A"}
                      strokeDasharray="565"
                      strokeDashoffset={
                        565 - (updateProgress(calories, 1520) * 565) / 100
                      }
                      strokeWidth="10"
                      fill="none"
                      strokeLinecap="round"
                      style={{
                        transition: "stroke-dashoffset 0.5s ease-in-out",
                      }}
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      stroke={carbs > 250 ? "red" : "#FBC02D"}
                      strokeDasharray="440"
                      strokeDashoffset={
                        440 - (updateProgress(carbs, 175) * 440) / 100
                      }
                      strokeWidth="10"
                      fill="none"
                      strokeLinecap="round"
                      style={{
                        transition: "stroke-dashoffset 0.5s ease-in-out",
                      }}
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="50"
                      stroke={fat > 70 ? "red" : "#8BC34A"}
                      strokeDasharray="314"
                      strokeDashoffset={
                        314 - (updateProgress(fat, 55) * 314) / 100
                      }
                      strokeWidth="10"
                      fill="none"
                      strokeLinecap="round"
                      style={{
                        transition: "stroke-dashoffset 0.5s ease-in-out",
                      }}
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="30"
                      stroke={protein > 150 ? "red" : "#03A9F4"}
                      strokeDasharray="188"
                      strokeDashoffset={
                        188 - (updateProgress(protein, 70) * 188) / 100
                      }
                      strokeWidth="10"
                      fill="none"
                      strokeLinecap="round"
                      style={{
                        transition: "stroke-dashoffset 0.5s ease-in-out",
                      }}
                    />
                  </svg>
                </Box>
                {/* Nutritional Labels */}
                <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                  <Typography
                    style={{ color: calories > 2000 ? "red" : "#6A1B9A" }}
                  >
                    Calories: {calories} / 2000 kcal
                  </Typography>
                  <Typography
                    style={{ color: carbs > 250 ? "red" : "#FBC02D" }}
                  >
                    Carbs: {carbs} / 250 g
                  </Typography>
                  <Typography style={{ color: fat > 70 ? "red" : "#8BC34A" }}>
                    Fat: {fat} / 70 g
                  </Typography>
                  <Typography
                    style={{ color: protein > 150 ? "red" : "#03A9F4" }}
                  >
                    Protein: {protein} / 150 g
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: selectedDay === adjustedToday ? "block" : "none",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    inputRef={foodInputRef}
                    id="foodInput"
                    label="Enter food item"
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: 2 }}
                  />

                  <Button
                    onClick={handleFoodAdd}
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
                    Submit
                  </Button>
                  <Typography
                    variant="body2"
                    color={
                      foodAddMessage.includes("successfully") ? "green" : "red"
                    }
                    sx={{ marginBottom: 2 }}
                  >
                    {foodAddMessage}
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
                  mb: { xs: 6, sm: 8, md: 9 },
                }}
              >
                <Typography variant="h6" align="center" gutterBottom>
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
                      border: "3px solid #e6e6e6",
                      borderRadius: 1,
                      position: "relative",
                      minHeight: 250,
                      marginBottom: 1,
                    }}
                  >
                    <Box
                      sx={{
                        height: `calc(${
                          (Math.min(water, 2500) / 2500) * 100
                        }%)`,
                        backgroundColor: water >= 2500 ? "green" : "#00BFFF",
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        transition: "height 0.5s ease-in-out",
                      }}
                    ></Box>
                  </Box>
                  <Typography variant="h6" align="center">
                    {water} / 2500 ml
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: selectedDay === adjustedToday ? "block" : "none",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    inputRef={waterInputRef}
                    id="waterInput"
                    label="Add Water (ml)"
                    type="number"
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: 2 }}
                  />

                  <Button
                    onClick={handleWaterAdd}
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
                    Add
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {selectedTab === 1 && (
        <>
          <LayoutGrid/>
        </>
      )}
    </div>
  
  );
};

export default dynamic(() => Promise.resolve(Diet), {
  ssr: false,
});
