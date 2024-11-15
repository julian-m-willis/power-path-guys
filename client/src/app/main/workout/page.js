"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, List, ListItem, Modal, Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TypewriterEffect } from "../../../components/ui/typewriter-effect";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const WorkoutList = () => {
  const [workoutCards, setWorkoutCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const fetchWorkouts = async () => {
    setLoading(true);
    const endpoints = [
      'http://52.62.47.9:5006/workout/bodyPartList/back',
      'http://52.62.47.9:5006/workout/bodyPartList/chest',
      'http://52.62.47.9:5006/workout/bodyPartList/lower legs'
    ];

    try {
      const workoutPromises = endpoints.map(endpoint => axios.get(endpoint));
      const responses = await Promise.all(workoutPromises);

      const limitedWorkouts = responses.map(response => response.data.data.slice(0, 8));
      setWorkoutCards(limitedWorkouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleStartNow = async (selectedCard) => {
    try {
      const workout_ids = selectedCard.map(exercise => exercise.id);
      const totalCalories = 440; // Assuming each exercise has a `calories` property
      const userId = localStorage.getItem("user_id") || 2;

      const response = await axios.post('http://52.62.47.9:5006/workout/save', {
        user_id: userId,
        workout_ids: workout_ids,
        calories: totalCalories,
        status: "Not Completed"
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
  
      console.log(response.data);
      const workoutId = response.data.workout_plan.id;
      router.push(`workout/detail?id=${workoutId}`);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleCardClick = (cardExercises) => {
    setSelectedCard(cardExercises);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  return (
    <div>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');`}
      </style>
      <div className="flex flex-col justify-center h-[calc(40vh-20px)] items-center px-4 text-center bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/workoutbg.jpg')" }}>
      <p className="font-bold text-3xl md:text-6xl" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: "0.03em",
        fontWeight: 500, }}>Workout Page</p>
      <TypewriterEffect 
        words={[
          { text: "Time" },
          { text: "To" },
          { text: "Power" },
          { text: "Up" },
        ]}
        className="font-bold text-3xl md:text-5xl" 
        style={{ color: "#c1ff72", fontFamily: "'Anton', sans-serif", letterSpacing: "0.02em",
        fontWeight: 500, }}
      />

      </div>  


      {/* Personalise Workout Card */}
      <Link href="workout/swipe" passHref style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            cursor: 'pointer',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
          }}
        >
          <CardContent sx={{ padding: '24px !important', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h5" color="primary" style={{ marginBottom: '8px', textAlign: 'center' }}>
              Personalise Your Workout
            </Typography>
            <Typography style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
              Click here to personalise your workout plan
            </Typography>
          </CardContent>
        </Card>
      </Link>

      {/* Loading Indicator */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3} columns={12} className="pb-20 md:pb-0">
          {workoutCards.map((cardExercises, cardIndex) => {
            const themes = ["Back Workout", "Chest Workout", "Leg Workout"];
            const caloriesBurnt = (cardExercises.length * 30) + 200;

            return (
              <Grid item xs={12} sm={6} md={4} key={cardIndex}>
                <Card
                  sx={{
                    height: '100%',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '4px',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                  }}
                  onClick={() => handleCardClick(cardExercises)}
                >
                  <CardContent style={{ cursor: 'pointer', padding: '24px' }}>
                    <Typography variant="h6" color="primary">
                      Suggested Workout {cardIndex + 1}:
                    </Typography>
                    <Typography color="secondary">
                      {themes[cardIndex]}
                    </Typography>
                    <Typography style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Number of Exercises: {cardExercises.length}
                    </Typography>
                    <Typography style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Estimated Calories Burnt: {caloriesBurnt} kcal
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Modal for displaying workout details */}
      <Modal
        open={!!selectedCard}
        onClose={handleClose}
        aria-labelledby="workout-modal-title"
        aria-describedby="workout-modal-description"
      >
        <Box sx={modalStyle}>
          {selectedCard && (
            <>
              <Typography id="workout-modal-title" variant="h6" component="h2" gutterBottom>
                Workout Details
              </Typography>
              <List component="ol" sx={{ listStyleType: 'decimal', paddingLeft: '20px', color: 'text.primary' }}>
                {selectedCard.map((exercise) => (
                  <ListItem component="li" key={exercise.id} sx={{ display: 'list-item', padding: '4px 0' }}>
                    {exercise.name.replace(/\b\w/g, char => char.toUpperCase())}
                  </ListItem>
                ))}
              </List>
              <Button 
                variant="contained" 
                onClick={() => handleStartNow(selectedCard)}
                sx={{ marginTop: '16px' }}
              >
                Start Now
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default WorkoutList;
