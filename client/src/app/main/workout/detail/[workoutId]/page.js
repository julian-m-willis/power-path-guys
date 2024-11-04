// src/app/main/workout/detail/[workoutId]/page.js

"use client";

import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';

// Sample workout data
const workoutsData = [
  { id: 1, category: 'Cardio', bodyPart: 'Legs', difficulty: 'Beginner', duration: '30 min', details: ['Running', 'Cycling', 'Jump Rope'] },
  { id: 2, category: 'Strength', bodyPart: 'Arms', difficulty: 'Intermediate', duration: '45 min', details: ['Push-ups', 'Bicep Curls', 'Tricep Dips'] },
  // ... more workout data
];

const WorkoutDetail = ({ params }) => {
  const router = useRouter();
  const [workoutId, setWorkoutId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openExitDialog, setOpenExitDialog] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0); // State to track carousel index

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

  const handleCompleteClick = () => setOpenDialog(true);

  const handleConfirmComplete = () => {
    setOpenDialog(false);
    router.push('/main/workout');
  };

  const handleCancelComplete = () => setOpenDialog(false);

  const handleBackClick = () => setOpenExitDialog(true);

  const handleConfirmExit = () => {
    setOpenExitDialog(false);
    router.back();
  };

  const handleCancelExit = () => setOpenExitDialog(false);

  // Carousel navigation with limits
  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.details.length - 1) {
      setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prevIndex) => prevIndex - 1);
    }
  };

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

      {/* Carousel Section */}
      <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
        <IconButton onClick={handlePreviousExercise} disabled={currentExerciseIndex === 0}>
          <ArrowBackIosIcon />
        </IconButton>
        <Card variant="outlined" style={{ width: '60%', textAlign: 'center' }}>
          <Box p={2}>
            <img
              src="https://via.placeholder.com/150"
              alt={workout.details[currentExerciseIndex]}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
          </Box>
          <CardContent>
            <Typography variant="h6">
              {currentExerciseIndex + 1}. {workout.details[currentExerciseIndex]}
            </Typography>
          </CardContent>
        </Card>
        <IconButton onClick={handleNextExercise} disabled={currentExerciseIndex === workout.details.length - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Complete ordered list of exercises below the carousel */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>All Exercises</Typography>
        <ol>
          {workout.details.map((exercise, index) => (
            <li key={index}>
              <Card variant="outlined" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
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
            </li>
          ))}
        </ol>
      </Box>

      {/* Complete Workout Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCompleteClick}
        style={{ position: 'fixed', bottom: 20, right: 20 }}
      >
        Complete Workout
      </Button>

      {/* Dialogs for complete and exit confirmation */}
      <Dialog open={openDialog} onClose={handleCancelComplete} aria-labelledby="confirm-complete-title">
        <DialogTitle id="confirm-complete-title">Did you mean to complete workout?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to mark this workout as completed?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelComplete} color="secondary">No</Button>
          <Button onClick={handleConfirmComplete} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openExitDialog} onClose={handleCancelExit} aria-labelledby="confirm-exit-title">
        <DialogTitle id="confirm-exit-title">Do you want to leave this workout?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to leave this page? Your workout progress will not be saved.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelExit} color="secondary">No</Button>
          <Button onClick={handleConfirmExit} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkoutDetail;
