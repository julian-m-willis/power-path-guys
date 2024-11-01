"use client"; // If you are using hooks or client-side functionality

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

// Sample workout data for demonstration; replace with your data-fetching logic
const workoutsData = [
  { id: 1, category: 'Cardio', bodyPart: 'Legs', difficulty: 'Beginner', duration: '30 min', details: ['Running', 'Cycling', 'Jump Rope'] },
  { id: 2, category: 'Strength', bodyPart: 'Arms', difficulty: 'Intermediate', duration: '45 min', details: ['Push-ups', 'Bicep Curls', 'Tricep Dips'] },
  // ...other workouts
];

const WorkoutDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { workoutId } = query; // Extract the workoutId from the query parameters

  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    // Simulate fetching workout details by ID
    const fetchedWorkout = workoutsData.find((w) => w.id === parseInt(workoutId));
    setWorkout(fetchedWorkout);
  }, [workoutId]);

  if (!workout) return <Typography>Loading...</Typography>; // Handle loading state

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Workout Details: {workout.category}
      </Typography>
      <Typography variant="h6">Body Part: {workout.bodyPart}</Typography>
      <Typography variant="h6">Difficulty: {workout.difficulty}</Typography>
      <Typography variant="h6">Duration: {workout.duration}</Typography>
      <Typography variant="h6">Exercises:</Typography>
      <ul>
        {workout.details.map((exercise, index) => (
          <li key={index}>{exercise}</li>
        ))}
      </ul>
      <Button variant="contained" color="primary" onClick={() => router.push('/main/workout')}>
        Back to Workouts
      </Button>
    </Box>
  );
};

export default WorkoutDetail;
