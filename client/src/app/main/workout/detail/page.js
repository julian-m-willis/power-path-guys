"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const mockData = [
  {
    bodyPart: "back",
    equipment: "leverage machine",
    gifUrl: "https://v2.exercisedb.io/image/ZincLZH4Yp81Ty",
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
      "Repeat for the desired number of repetitions.",
    ],
  },
];

const capitalizeFirstLetterOfEachWord = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const WorkoutCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [workouts, setWorkouts] = useState(mockData);
  const [closeConfirmationOpen, setCloseConfirmationOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://3.107.192.183:5006/workout/workout_plan/${id}`)
        .then((response) => {
          setWorkouts(response.data.detailed_exercises);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching workout data:", error);
          setLoading(false);
        });
    }
  }, [id]);

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

  const handleSummaryClose = async () => {
    try {
      const response = await axios.post(
        `http://3.107.192.183:5006/workout/workout_plan/${id}/complete`
      );
      console.log("Workout plan marked as completed:", response.data);
      router.push("/main/goal");
    } catch (error) {
      console.error("Error marking the workout plan as completed:", error);
      alert(
        "An error occurred while completing the workout plan. Please try again."
      );
    }
  };

  const currentWorkout = workouts[currentIndex];

  const handleCloseConfirmationOpen = () => {
    setCloseConfirmationOpen(true);
  };

  const handleCloseConfirmationClose = () => {
    setCloseConfirmationOpen(false);
  };

  const handleLeavePage = () => {
    setCloseConfirmationOpen(false);
    router.push("/main/workout"); // Redirect to placeholder on confirmation
  };


  return (
    <Box p={3}>
    <IconButton
        onClick={handleCloseConfirmationOpen}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <CloseIcon />
      </IconButton>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            variant={{ xs: "h5", sm: "h4" }} // Change variant for different screen sizes
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" }, // Adjust font size for responsiveness
            }}
          >
            Workout
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
              <ArrowBackIosIcon />
            </IconButton>

            <Card
              variant="outlined"
              sx={{
                width: { xs: "90%", sm: "70%", md: "60%" }, // Adjust width for different screen sizes
                textAlign: "center",
              }}
            >
              <Box p={2}>
                <img
                  src={currentWorkout.gifUrl}
                  alt={capitalizeFirstLetterOfEachWord(currentWorkout.name)}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain", // Change to "contain" to prevent stretching
                  }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6">{capitalizeFirstLetterOfEachWord(currentWorkout.name)}</Typography>
                <Typography variant="body1" mt={2}>
                  Target: {currentWorkout.target}
                </Typography>
                <Typography variant="body2" mt={2}>
                  <strong>Instructions:</strong>
                  <List dense>
                    {currentWorkout.instructions.map((instruction, index) => (
                      <ListItem key={index} sx={{ pl: 2 }}>
                        <ListItemText primary={`• ${instruction}`} />
                      </ListItem>
                    ))}
                  </List>
                </Typography>
              </CardContent>
            </Card>

            <IconButton
              onClick={handleNext}
              disabled={currentIndex === workouts.length - 1}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </>
      )}

      <Box mt={4}>
        <Button
          variant="contained"
          color={currentIndex === workouts.length - 1 ? "primary" : "secondary"}
          onClick={
            currentIndex === workouts.length - 1
              ? handleCompleteClick
              : handleNext
          }
          sx={{
            position: "fixed",
            top: { xs: 20, sm: "auto" },
            bottom: { xs: "auto", sm: 80 },
            right: 20,
            zIndex: 1000,
          }}
        >
          {currentIndex === workouts.length - 1 ? "Complete Workout" : "Next"}
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
          <Button onClick={handleSummaryOpen} color="primary">
            Yes
          </Button>
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
            <List
              component="ol"
              sx={{ pl: 2, listStyleType: "decimal", margin: 0 }}
            >
              {workouts.map((workout, index) => (
                <ListItem
                  key={index}
                  component="li"
                  sx={{ display: "list-item", pl: 0 }}
                >
                  <ListItemText primary={capitalizeFirstLetterOfEachWord(workout.name)} />
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSummaryClose} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={closeConfirmationOpen} onClose={handleCloseConfirmationClose}>
        <DialogTitle>Leave Page</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to leave the page?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationClose}>No</Button>
          <Button onClick={handleLeavePage} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkoutCarousel;