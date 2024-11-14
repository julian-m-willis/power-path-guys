"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Modal,
  Box,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from '@mui/system';
import { useRouter } from "next/navigation";
import axios from "axios";
import "./swipestyle.css";

const NoSelectTypography = styled(Typography)({
  userSelect: 'none', // Prevents text selection
  cursor: 'default',  // Optional: sets cursor to default
});

const capitalizeFirstLetterOfEachWord = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const Workout = () => {
  const router = useRouter();
  const workoutContainerRef = useRef(null);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    outline: 'none',
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://13.54.17.246:5006/workout/suggest-exercises/random"
      );
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data.suggested_exercises);
      } else {
        console.error("Failed to fetch workouts");
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const workoutElement = document.querySelector(".workout");
      if (workoutElement) {
        workoutElement.classList.add("loaded");
      }
    }
  }, []);

  const [disableSwiping, setDisableSwiping] = useState(false);

useEffect(() => {
  const cards = workoutContainerRef.current?.querySelectorAll(".workout--card");
  let activeCard = null;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  if (cards) {
    const handleStart = (e) => {
      if (disableSwiping) return;  // Prevent swiping if disabled
      if (isDragging) return;
      activeCard = e.currentTarget;
      startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      isDragging = true;
      activeCard.style.transition = "none";
      const index = activeCard.getAttribute("data-index");
      setActiveCardIndex(index);
    };

    const handleMove = (e) => {
      if (disableSwiping) return;  // Prevent swiping if disabled
      if (!isDragging || !activeCard) return;
      currentX =
        (e.type.includes("mouse") ? e.clientX : e.touches[0].clientX) - startX;
      activeCard.style.transform = `translateX(calc(-50% + ${currentX}px))`;
    };

    const handleEnd = () => {
      if (disableSwiping) return;  // Prevent swiping if disabled
      if (!isDragging || !activeCard) return;
      isDragging = false;
      activeCard.style.transition = "transform 0.3s ease-out";

      const index = activeCard.getAttribute("data-index");

      if (activeCard) {
        if (currentX > 100) {
          activeCard.style.transform = `translateX(100vw)`;
          setTimeout(() => {
            if (index !== -1 && workouts[index]) {
              const workoutToAdd = workouts[index];
              setSelectedWorkouts((prev) => {
                const alreadyExists = prev.some(workout => workout.id === workoutToAdd.id);
                return alreadyExists ? prev : [...prev, workoutToAdd];
              });
              setWorkouts((prev) => prev.filter((_, i) => i !== index));
            } else {
              console.error("Invalid index or undefined workout");
            }
            activeCard = null;
          }, 300);
        } else if (currentX < -100) {
          activeCard.style.transform = `translateX(-200vw)`;
          setTimeout(() => {
            if (index !== -1) {
              setWorkouts((prev) => prev.filter((_, i) => i !== index));
            }
            activeCard = null;
          }, 300);
        } else {
          activeCard.style.transform = `translateX(-50%)`;
          activeCard = null;
        }
      } else {
        console.error("activeCard is null");
      }

      // Check if selectedWorkouts length is 12, and open the modal if true
      if (selectedWorkouts.length === 11) {
        // Automatically trigger the modal
        handleOpenModal();
        setDisableSwiping(true);  // Disable further swiping after 12 selections
      }
    };

    cards.forEach((card) => {
      card.addEventListener("mousedown", handleStart);
      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseup", handleEnd);
      card.addEventListener("mouseleave", handleEnd);
      card.addEventListener("touchstart", handleStart);
      card.addEventListener("touchmove", handleMove);
      card.addEventListener("touchend", handleEnd);

      return () => {
        card.removeEventListener("mousedown", handleStart);
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseup", handleEnd);
        card.removeEventListener("mouseleave", handleEnd);
        card.removeEventListener("touchstart", handleStart);
        card.removeEventListener("touchmove", handleMove);
        card.removeEventListener("touchend", handleEnd);
      };
    });
  }
}, [workouts, selectedWorkouts, disableSwiping]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleStartWorkout = async () => {
    const userId = localStorage.getItem("user_id");
    const workout_ids = selectedWorkouts.map(workout => workout.id);
    const totalCalories = selectedWorkouts.length * 30 + 200;
    console.log(selectedWorkouts);

    try {
      const response = await axios.post(
        "http://13.54.17.246:5006/workout/save",
        {
          user_id: userId,
          workout_ids: workout_ids,
          calories: totalCalories,
          status: "Not Completed",
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      const workoutId = response.data.workout_plan.id;
      router.push(`/main/workout/detail?id=${workoutId}`);
    } catch (error) {
      console.error("Error starting the workout:", error);
    }
  };

  return (
    <div className="workout" ref={workoutContainerRef}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <IconButton
            className="close-button"
            onClick={handleOpenDialog}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1000,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Are you sure you want to leave?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                If you leave, any unsaved changes will be lost.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>No</Button>
              <Button color="primary" onClick={() => router.back()} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <div className="workout--cards">
            {workouts.length > 0 ? (
              workouts.map((workout, index) => (
                <Card
                  className="workout--card"
                  key={index}
                  data-index={index}
                  style={{
                    position: "absolute",
                    top: "75px",  // Changed from 0 to 50px to move cards down
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "300px",
                    margin: "10px",
                    zIndex: workouts.length - index,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      workout.gifUrl || "https://placeimg.com/600/300/tech"
                    }
                    alt={capitalizeFirstLetterOfEachWord(workout.name)}
                  />
                  <CardContent>
                    <NoSelectTypography variant="h5" component="div">
                      {capitalizeFirstLetterOfEachWord(workout.name)}
                    </NoSelectTypography>
                    <Divider style={{ margin: "10px 0" }} />
                    <NoSelectTypography variant="body2" color="text.secondary">
                      <strong>Body Part:</strong> {workout.bodyPart}
                    </NoSelectTypography>
                    <NoSelectTypography variant="body2" color="text.secondary">
                      <strong>Target:</strong> {workout.target}
                    </NoSelectTypography>
                    <NoSelectTypography variant="body2" color="text.secondary">
                      <strong>Secondary Muscles:</strong> {workout.secondaryMuscles.join(", ")}
                    </NoSelectTypography>
                    <NoSelectTypography variant="body2" color="text.secondary">
                      <strong>Equipment:</strong> {workout.equipment}
                    </NoSelectTypography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography>No workouts available.</Typography>
            )}
          </div>
        </>
      )}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="workout-modal-title"
        aria-describedby="workout-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="workout-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Confirm Your Workout
          </Typography>
          <List
            component="ol"
            sx={{
              listStyleType: "decimal",
              paddingLeft: "20px",
              color: "text.primary",
            }}
          >
            {selectedWorkouts.map((exercise) => (
              <ListItem
                component="li"
                key={exercise.id}
                sx={{ display: "list-item", padding: "4px 0" }}
              >
                {exercise.name.replace(/\b\w/g, (char) => char.toUpperCase())}
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            onClick={handleStartWorkout}
            sx={{ marginTop: "16px" }}
          >
            Start Now
          </Button>
        </Box>
      </Modal>

      {selectedWorkouts.length > 7 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          style={{
            position: "fixed",
            bottom: "100px", // Changed from marginTop to bottom position (moved up 70px from typical 20px bottom position)
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1001
          }}
        >
          Start Workout
        </Button>
      )}
    </div>
  );
};

export default Workout;
