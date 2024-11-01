// src/app/main/workout/detail/[workoutId]/page.js

import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

// Sample workout data
const workoutsData = [
  { id: 1, category: 'Cardio', bodyPart: 'Legs', difficulty: 'Beginner', duration: '30 min', details: ['Running', 'Cycling', 'Jump Rope'] },
  { id: 2, category: 'Strength', bodyPart: 'Arms', difficulty: 'Intermediate', duration: '45 min', details: ['Push-ups', 'Bicep Curls', 'Tricep Dips'] },
  { id: 3, category: 'Flexibility', bodyPart: 'Full Body', difficulty: 'Advanced', duration: '60 min', details: ['Yoga', 'Stretching', 'Pilates'] },
  { id: 4, category: 'Balance', bodyPart: 'Core', difficulty: 'Beginner', duration: '20 min', details: ['Tai Chi', 'Stability Ball', 'Single-leg Stand'] },
  { id: 5, category: 'Cardio', bodyPart: 'Full Body', difficulty: 'Intermediate', duration: '40 min', details: ['HIIT', 'Jumping Jacks', 'Burpees'] },
  { id: 6, category: 'Strength', bodyPart: 'Legs', difficulty: 'Advanced', duration: '50 min', details: ['Squats', 'Deadlifts', 'Leg Press'] },
  { id: 7, category: 'Flexibility', bodyPart: 'Upper Body', difficulty: 'Beginner', duration: '30 min', details: ['Shoulder Stretch', 'Triceps Stretch', 'Chest Opener'] },
  { id: 8, category: 'Balance', bodyPart: 'Full Body', difficulty: 'Intermediate', duration: '25 min', details: ['Tree Pose', 'Warrior III', 'Heel-to-Toe Walk'] },
];

const WorkoutDetail = ({ params }) => {
  const { workoutId } = params; // Access workoutId from params

  // Check if workoutId is available before proceeding
  if (!workoutId) {
    return <Typography variant="h6">Loading...</Typography>; // Show loading state
  }

  const workout = workoutsData.find(w => w.id === parseInt(workoutId));

  if (!workout) return <Typography variant="h6">Workout not found</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {workout.category} Workout
      </Typography>
      <Grid container spacing={2}>
        {workout.details.map((exercise, index) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined" style={{ display: 'flex', alignItems: 'center' }}>
              <Box p={2}>
                <img
                  src="https://via.placeholder.com/100" // Placeholder image
                  alt={exercise}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6">{exercise}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkoutDetail;
