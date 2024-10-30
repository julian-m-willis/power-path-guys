// export default function Home() {
//   return <h1>Welcome to the Fitness App</h1>;
// }


"use client";

// src/app/main/workout/page.js
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import Link from 'next/link';

// Sample workout data
const workoutsData = [
  { id: 1, category: 'Cardio', bodyPart: 'Legs', difficulty: 'Beginner', duration: '30 min' },
  { id: 2, category: 'Strength', bodyPart: 'Arms', difficulty: 'Intermediate', duration: '45 min' },
  { id: 3, category: 'Flexibility', bodyPart: 'Full Body', difficulty: 'Advanced', duration: '60 min' },
  { id: 4, category: 'Balance', bodyPart: 'Core', difficulty: 'Beginner', duration: '20 min' },
  // Add more workout data as needed
];

const WorkoutSelection = () => {
  const [category, setCategory] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [duration, setDuration] = useState('');

  const filteredWorkouts = workoutsData.filter((workout) => {
    return (
      (category ? workout.category === category : true) &&
      (bodyPart ? workout.bodyPart === bodyPart : true) &&
      (difficulty ? workout.difficulty === difficulty : true) &&
      (duration ? workout.duration === duration : true)
    );
  });

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Workout Selection
      </Typography>

      <Grid container spacing={2} marginBottom={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Cardio">Cardio</MenuItem>
            <MenuItem value="Strength">Strength</MenuItem>
            <MenuItem value="Flexibility">Flexibility</MenuItem>
            <MenuItem value="Balance">Balance</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Body Part"
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Legs">Legs</MenuItem>
            <MenuItem value="Arms">Arms</MenuItem>
            <MenuItem value="Full Body">Full Body</MenuItem>
            <MenuItem value="Core">Core</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="20 min">20 min</MenuItem>
            <MenuItem value="30 min">30 min</MenuItem>
            <MenuItem value="45 min">45 min</MenuItem>
            <MenuItem value="60 min">60 min</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={() => {}}>
        Filter
      </Button>

      {/* Moved Personalized Workout Plan card below the filter button */}
      <Link href="/swipe" passHref>
        <Card variant="outlined" style={{ marginTop: '20px', cursor: 'pointer' }}>
          <CardContent style={{ textAlign: 'center' }}>
            <Typography variant="h5">Personalise Your Workout Plan</Typography>
          </CardContent>
        </Card>
      </Link>

      <Grid container spacing={3} mt={3}>
        {filteredWorkouts.map((workout) => (
          <Grid item xs={12} sm={6} md={4} key={workout.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">{workout.category}</Typography>
                <Typography variant="body2">Body Part: {workout.bodyPart}</Typography>
                <Typography variant="body2">Difficulty: {workout.difficulty}</Typography>
                <Typography variant="body2">Duration: {workout.duration}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Select</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkoutSelection;
