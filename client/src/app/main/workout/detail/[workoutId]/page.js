// src/app/main/workout/detail/[workoutId]/page.js

"use client";

import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [workoutId, setWorkoutId] = useState(null); // Store workoutId as state
  const [openDialog, setOpenDialog] = useState(false);
  const [openExitDialog, setOpenExitDialog] = useState(false); // State for the exit confirmation dialog
  const [workout, setWorkout] = useState(null);

  // Unwrap params and set workoutId
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setWorkoutId(resolvedParams.workoutId);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (workoutId) {
      const foundWorkout = workoutsData.find(w => w.id === parseInt(workoutId));
      setWorkout(foundWorkout || null);
    }
  }, [workoutId]);

  // Handle "Complete Workout" button click
  const handleCompleteClick = () => {
    setOpenDialog(true);
  };

  // Handle confirmation in dialog
  const handleConfirmComplete = () => {
    setOpenDialog(false);
    router.push('/main/workout'); // Redirect back to the workout page
  };

  // Handle cancellation in dialog
  const handleCancelComplete = () => {
    setOpenDialog(false);
  };

  // Handle "X" button click to open exit confirmation dialog
  const handleBackClick = () => {
    setOpenExitDialog(true);
  };

  // Confirm exiting the workout
  const handleConfirmExit = () => {
    setOpenExitDialog(false);
    router.back(); // Redirect back to the previous page
  };

  // Cancel exiting the workout
  const handleCancelExit = () => {
    setOpenExitDialog(false);
  };

  // Show loading state until workout is loaded
  if (workoutId === null) return <Typography variant="h6">Loading...</Typography>;

  if (!workout) return <Typography variant="h6">Workout not found</Typography>;

  return (
    <Box p={3} position="relative">
      {/* "X" Button in top-right corner */}
      <IconButton
        aria-label="close"
        onClick={handleBackClick}
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h4" gutterBottom>
        {workout.category} Workout
      </Typography>
      <Grid container spacing={2}>
        {workout.details.map((exercise, index) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined" style={{ display: 'flex', alignItems: 'center' }}>
              <Box p={2}>
                <img
                  src="https://via.placeholder.com/100"
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

      {/* Complete Workout Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCompleteClick}
        style={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        Complete Workout
      </Button>

      {/* Confirmation Dialog for Completing Workout */}
      <Dialog
        open={openDialog}
        onClose={handleCancelComplete}
        aria-labelledby="confirm-complete-title"
      >
        <DialogTitle id="confirm-complete-title">Did you mean to complete workout?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this workout as completed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelComplete} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmComplete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Exiting the Workout */}
      <Dialog
        open={openExitDialog}
        onClose={handleCancelExit}
        aria-labelledby="confirm-exit-title"
      >
        <DialogTitle id="confirm-exit-title">Do you want to leave this workout?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to leave this page? Your workout progress will not be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelExit} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmExit} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkoutDetail;
