"use client";

import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/navigation';

// Placeholder workouts data
const workouts = [
  {
    bodyPart: "back",
    equipment: "cable",
    gifUrl: "https://v2.exercisedb.io/image/r1kI366xtcX9nq",
    id: "0007",
    name: "alternate lateral pulldown",
    target: "lats",
    secondaryMuscles: ["biceps", "rhomboids"],
    instructions: [
      "Sit on the cable machine with your back straight and feet flat on the ground.",
      "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
      "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
      "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    bodyPart: "back",
    equipment: "body weight",
    gifUrl: "https://v2.exercisedb.io/image/vejfyd7nwxV73a",
    id: "3293",
    name: "archer pull up",
    target: "lats",
    secondaryMuscles: ["biceps", "forearms"],
    instructions: [
      "Start by hanging from a pull-up bar with an overhand grip, slightly wider than shoulder-width apart.",
      "Engage your core and pull your shoulder blades down and back.",
      "As you pull yourself up, bend one arm and bring your elbow towards your side, while keeping the other arm straight.",
      "Continue pulling until your chin is above the bar and your bent arm is fully flexed.",
      "Lower yourself back down with control, straightening the bent arm and repeating the movement on the other side.",
      "Alternate sides with each repetition."
    ]
  },
  {
    bodyPart: "back",
    equipment: "leverage machine",
    gifUrl: "https://v2.exercisedb.io/image/J7z-p4PnzSIdLb",
    id: "0015",
    name: "assisted parallel close grip pull-up",
    target: "lats",
    secondaryMuscles: ["biceps", "forearms"],
    instructions: [
      "Adjust the machine to your desired weight and height.",
      "Place your hands on the parallel bars with a close grip, palms facing each other.",
      "Hang from the bars with your arms fully extended and your feet off the ground.",
      "Engage your back muscles and pull your body up towards the bars, keeping your elbows close to your body.",
      "Continue pulling until your chin is above the bars.",
      "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  }
];

const WorkoutCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < workouts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCompleteClick = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleSummaryOpen = () => {
    setSummaryOpen(true);
    setConfirmationOpen(false);
  };

  const handleSummaryClose = () => {
    router.push('/main/goal'); // Redirect to the "goal" page
  };

  const currentWorkout = workouts[currentIndex];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Workout: {currentWorkout.name}
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
          <ArrowBackIosIcon />
        </IconButton>

        <Card variant="outlined" style={{ width: '60%', textAlign: 'center' }}>
          <Box p={2}>
            <img
              src={currentWorkout.gifUrl}
              alt={currentWorkout.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
          </Box>
          <CardContent>
            <Typography variant="h6">
              {currentWorkout.name}
            </Typography>
            <Typography variant="body1" mt={2}>
              Target: {currentWorkout.target}
            </Typography>
            <Typography variant="body2" mt={2}>
              <strong>Instructions:</strong>
              <ol>
                {currentWorkout.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </Typography>
          </CardContent>
        </Card>

        <IconButton onClick={handleNext} disabled={currentIndex === workouts.length - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCompleteClick}
          style={{ position: 'fixed', bottom: 20, right: 20 }}
        >
          Complete Workout
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Complete Workout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to complete the workout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>No</Button>
          <Button onClick={handleSummaryOpen} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>

      {/* Summary Dialog */}
      <Dialog open={summaryOpen} onClose={handleSummaryClose}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Congrats on finishing your workout! Here is your workout summary:
          </DialogContentText>
          <Box mt={2}>
            <strong>Exercises Completed:</strong>
            <ol style={{ paddingLeft: '20px', margin: 0, listStyleType: 'decimal' }}>
              {workouts.map((workout, index) => (
                <li key={index}>{workout.name}</li>
              ))}
            </ol>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSummaryClose} color="primary">Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkoutCarousel;
