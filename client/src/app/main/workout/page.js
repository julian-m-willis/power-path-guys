"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, List, ListItem, Collapse, Select, MenuItem, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const WorkoutList = () => {
  const [workoutCards, setWorkoutCards] = useState([]);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const router = useRouter();

  // Fetch the workout data
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://3.107.192.183:5006/workout/suggest-exercises/random');
      const exercises = response.data.suggested_exercises;

      const uniqueCards = [];
      while (uniqueCards.length < 10) {
        const usedExerciseIds = new Set();
        const randomExercises = [];

        while (randomExercises.length < 10) {
          const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
          if (!usedExerciseIds.has(randomExercise.id)) {
            randomExercises.push(randomExercise);
            usedExerciseIds.add(randomExercise.id);
          }
        }

        uniqueCards.push(randomExercises);
      }

      setWorkoutCards(uniqueCards);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  // Fetch the list of body parts
  const fetchBodyParts = async () => {
    try {
      const response = await axios.get('http://3.107.192.183:5006/workout/bodyPartList');
      if (response.data.bodyPartList && Array.isArray(response.data.bodyPartList)) {
        setBodyParts(response.data.bodyPartList);
      } else {
        console.error("Invalid body parts data format", response.data);
      }
    } catch (error) {
      console.error("Error fetching body parts:", error);
    }
  };

  // Run both fetches on initial load
  useEffect(() => {
    fetchWorkouts();
    fetchBodyParts();
  }, []);

  const handleStartNow = () => {
    router.push('/placeholder');
  };

  const toggleExpand = (index) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  const handleBodyPartChange = (event) => {
    const bodyPart = event.target.value;
    setSelectedBodyPart(bodyPart);

    if (bodyPart) {
      // Filter workout cards based on the selected body part
      const filteredCards = workoutCards.filter(cardExercises =>
        cardExercises.some(exercise => exercise.bodyPart === bodyPart)
      );
      setWorkoutCards(filteredCards);
    } else {
      // Reset to show all workouts if no body part is selected
      fetchWorkouts();
    }
  };

  return (
    <div style={{ padding: '24px 48px' }}>
      {/* Filter Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Typography variant="h4" style={{ fontWeight: 'normal' }}>
          Workout Page
        </Typography>
        
        <FormControl>
          <Select
            value={selectedBodyPart}
            onChange={handleBodyPartChange}
            displayEmpty
            sx={{
              minWidth: 200,
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              color: 'white',
            }}
          >
            <MenuItem value="">
              <em>All Body Parts</em>
            </MenuItem>
            {bodyParts.map((bodyPart, index) => (
              <MenuItem key={index} value={bodyPart}>
                {bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

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
            <Typography variant="h5" style={{ color: 'white', marginBottom: '8px', textAlign: 'center' }}>
              Personalize Your Workout
            </Typography>
            <Typography style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
              Click here to personalize your workout plan
            </Typography>
          </CardContent>
        </Card>
      </Link>

      {/* Workout Cards Grid */}
      <Grid container spacing={3} columns={12}>
        {workoutCards.map((cardExercises, cardIndex) => {
          const uniqueBodyParts = new Set(cardExercises.map(exercise => exercise.bodyPart));

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
              >
                <CardContent
                  onClick={() => toggleExpand(cardIndex)}
                  style={{ cursor: 'pointer', padding: '24px' }}
                >
                  <Typography variant="h6" style={{ color: 'white', marginBottom: '8px' }}>
                    Workout {cardIndex + 1}
                  </Typography>
                  <Typography style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Body Parts: {Array.from(uniqueBodyParts).join(', ')}
                  </Typography>
                </CardContent>
                <Collapse in={expandedCardIndex === cardIndex} timeout="auto" unmountOnExit>
                  <CardContent sx={{ padding: '0 24px 24px 24px' }}>
                    <List component="ol" sx={{ 
                      listStyleType: 'decimal',
                      paddingLeft: '20px',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      {cardExercises.map((exercise) => (
                        <ListItem component="li" key={exercise.id} sx={{ 
                          display: 'list-item',
                          padding: '4px 0',
                        }}>
                          {exercise.name.replace(/\b\w/g, char => char.toUpperCase())}
                        </ListItem>
                      ))}
                    </List>
                    <Button 
                      variant="outlined" 
                      onClick={handleStartNow}
                      sx={{
                        marginTop: '16px',
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                        color: 'white',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                      }}
                    >
                      Start Now
                    </Button>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default WorkoutList;
