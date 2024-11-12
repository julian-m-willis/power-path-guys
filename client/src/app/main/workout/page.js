"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, List, ListItem, Modal, Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const WorkoutList = () => {
  const [workoutCards, setWorkoutCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Modal style
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

  // Fetch workouts for three specific body parts
  const fetchWorkouts = async () => {
    setLoading(true);
    const endpoints = [
      'http://3.107.192.183:5006/workout/bodyPartList/back',
      'http://3.107.192.183:5006/workout/bodyPartList/chest',
      'http://3.107.192.183:5006/workout/bodyPartList/lower legs'
    ];

    try {
      const workoutPromises = endpoints.map(endpoint => axios.get(endpoint));
      const responses = await Promise.all(workoutPromises);

      // Extract and trim the data to 8 items per response
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

  const handleStartNow = () => {
    router.push('workout/detail');
  };

  const handleCardClick = (cardExercises) => {
    setSelectedCard(cardExercises);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  return (
    <div style={{ padding: '24px 48px' }}>
      {/* Personalize Workout Card */}
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
            <Typography variant="h5" color = "primary" style={{ marginBottom: '8px', textAlign: 'center' }}>
              Personalize Your Workout
            </Typography>
            <Typography style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
              Click here to personalize your workout plan
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
        <Grid container spacing={3} columns={12}>
          {workoutCards.map((cardExercises, cardIndex) => {
            // Assign a theme and arbitrary calories burnt based on index
            const themes = ["Back Workout", "Chest Workout", "Leg Workout"];
            const caloriesBurnt = (cardExercises.length * 30) + 200; // Arbitrary calculation

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
                    <Typography variant="h6" color='primary'>
                      Suggested Workout {cardIndex + 1}:
                    </Typography>
                    <Typography color='secondary'>
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
                onClick={handleStartNow}
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
