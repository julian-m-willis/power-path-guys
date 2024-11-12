import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, LinearProgress, Grid, Paper, CircularProgress, Divider, Avatar, Tooltip } from "@mui/material";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const KeyInsights = () => {
  const [progressData, setProgressData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace with the actual user ID
    const userId = localStorage.getItem("user_id") || 2;

    // Fetch data from the backend
    axios.get(`http://3.107.192.183:5006/goal/user-progress/${userId}`)
      .then(response => {
        setProgressData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching progress data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!progressData) {
    return <Typography>Error loading data</Typography>;
  }

  const {
    workout_progress,
    completed_workout_days,
    calorie_progress,
    completed_calorie_days,
    water_progress,
    completed_water_days,
    total_days
  } = progressData;

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Grid container spacing={4} alignItems="center">
        
        {/* Workout Goal Progress */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, fontWeight: 'bold' }}>
              <FitnessCenterIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Workout Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LinearProgress variant="determinate" value={workout_progress} sx={{ flexGrow: 1, height: 10, borderRadius: 5, mr: 2 }} />
              <Typography variant="body2" sx={{ minWidth: 40 }}>{`${Math.round(workout_progress)}%`}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              {`Consistent workouts for ${completed_workout_days} days out of ${total_days} days.`}
            </Typography>
            <Tooltip title="Earn this badge by completing 30 days of workouts!">
              <Avatar sx={{ bgcolor: workout_progress >= 100 ? 'gold' : 'grey', margin: '0 auto' }}>
                <EmojiEventsIcon />
              </Avatar>
            </Tooltip>
          </Box>
        </Grid>
        
        {/* Calorie Goal Progress */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, fontWeight: 'bold' }}>
              <FastfoodIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Calorie Intake
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LinearProgress variant="determinate" value={calorie_progress} sx={{ flexGrow: 1, height: 10, borderRadius: 5, mr: 2 }} />
              <Typography variant="body2" sx={{ minWidth: 40 }}>{`${Math.round(calorie_progress)}%`}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              {`Healthy eating maintained for ${completed_calorie_days} days out of ${total_days} days.`}
            </Typography>
            <Tooltip title="Earn this badge by staying consistent with your calorie intake for 30 days!">
              <Avatar sx={{ bgcolor: calorie_progress >= 100 ? 'gold' : 'grey', margin: '0 auto' }}>
                <EmojiEventsIcon />
              </Avatar>
            </Tooltip>
          </Box>
        </Grid>

        {/* Water Completion */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, fontWeight: 'bold' }}>
              <WaterDropIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Water Intake
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <LinearProgress variant="determinate" value={water_progress} sx={{ flexGrow: 1, height: 10, borderRadius: 5, mr: 2 }} />
              <Typography variant="body2" sx={{ position: 'absolute' }}>{`${Math.round(water_progress)}%`}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              {`Drank enough Water for ${completed_calorie_days} days out of ${total_days} days!`}
            </Typography>
            <Tooltip title="Earn this badge by hitting your water intake goal for 30 days!">
              <Avatar sx={{ bgcolor: water_progress >= 100 ? 'gold' : 'grey', margin: '0 auto' }}>
                <EmojiEventsIcon />
              </Avatar>
            </Tooltip>
          </Box>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default KeyInsights;
