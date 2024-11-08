// src/components/KeyInsights.js
import React, { useState, useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import axios from "axios";

const KeyInsights = () => {
  const [insights, setInsights] = useState([
    "Your water consumption today is below the recommended amount.",
    "You successfully completed your planned workout for today."
  ]); // Mock data

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // Uncomment and replace with actual API call for real data
        // const response = await axios.get("https://your-backend-api.com/api/insights");
        // setInsights(response.data);
      } catch (error) {
        console.error("Error fetching insights data:", error);
      }
    };

    fetchInsights();
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: { xs: 2, md: 3 }, mb: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "text.primary" }}>
        Key Insights
      </Typography>
      <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
        {insights.map((insight, index) => (
          <Box component="li" key={index} sx={{ mb: 1 }}>
            {insight}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default KeyInsights;
