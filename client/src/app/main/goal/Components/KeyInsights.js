// src/components/KeyInsights.js
import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import axios from "axios";

const KeyInsights = () => {
  const [insights, setInsights] = useState([
    "Your water consumption today is below the recommended amount.",
    "You successfully completed your planned workout for today."
  ]); // Mock data

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Uncomment the following lines to fetch real data
        // const response = await axios.get("https://your-backend-api.com/api/insights");
        // setInsights(response.data); // Set fetched insights data

      } catch (error) {
        console.error("Error fetching insights data:", error);
      }
    };

    fetchInsights();
  }, []);

  return (
    <Paper style={{ padding: "20px" }}>
      <Typography variant="h6">Key Insights</Typography>
      <ul>
        {insights.map((insight, index) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </Paper>
  );
};

export default KeyInsights;
