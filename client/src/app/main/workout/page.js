"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, List, ListItem, Collapse, Select, MenuItem, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const WorkoutList = () => {
  const [workoutCards, setWorkoutCards] = useState([]);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [theme, setTheme] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get('http://3.107.192.183:5006/workout/suggest-exercises/random');
        setTheme(response.data.theme || "General Fitness");
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    };

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

    fetchTheme();
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
    setSelectedBodyPart(event.target.value);
  };

  return (
    <div>
      <Typography variant="h3" align="left" gutterBottom>
        Workout Page
      </Typography>
      <Typography variant="h5" align="left" color="textSecondary" paragraph>
        Today's main focus will be {theme}
      </Typography>

      {/* Filter by Body Part */}
      <FormControl sx={{ float: 'right', marginBottom: 2 }}>
        <Select
          value={selectedBodyPart}
          onChange={handleBodyPartChange}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">
            <em>All Body Parts</em>
          </MenuItem>
          {bodyParts.map((bodyPart, index) => (
            <MenuItem key={index} value={bodyPart}>
              {bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} {/* Capitalize the first letter */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Personalize Your Workout Card using Link */}
      <Grid container justifyContent="center" style={{ marginBottom: 24 }}>
        <Grid item xs={12}>
        <Link href={`workout/swipe?theme=${encodeURIComponent(theme)}`} passHref>
            <Card
              sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ccc',
                boxShadow: 'none',
                padding: 1,
                width: '100%',
              }}
            >
              <CardContent sx={{ padding: '8px' }}>
                <Typography variant="h5" align="center">
                  Personalize Your Workout
                </Typography>
                <Typography align="center" color="textSecondary">
                  Click here to personalize your workout plan
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
      
      {/* Suggested Workouts Cards */}
      <Grid container spacing={3}>
        {workoutCards.map((cardExercises, cardIndex) => {
          // Create a Set to store unique body parts
          const uniqueBodyParts = new Set(cardExercises.map(exercise => exercise.bodyPart));

          return (
            <Grid item xs={12} sm={6} md={4} key={cardIndex}>
              <Card
                sx={{
                  border: '1px solid #ccc',
                  boxShadow: 'none',
                }}
              >
                <CardContent
                  onClick={() => toggleExpand(cardIndex)}
                  style={{ cursor: 'pointer', paddingLeft: '16px', paddingRight: '16px' }}
                >
                  <Typography variant="h5" gutterBottom>
                    Workout {cardIndex + 1}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {/* Show unique body parts */}
                    Body Parts: {Array.from(uniqueBodyParts).join(', ')}
                  </Typography>
                </CardContent>
                <Collapse in={expandedCardIndex === cardIndex} timeout="auto" unmountOnExit>
                  <CardContent sx={{ paddingLeft: '16px', paddingRight: '16px' }}>
                    <List component="ol" sx={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                      {cardExercises.map((exercise) => (
                        <ListItem component="li" key={exercise.id} sx={{ display: 'list-item' }}>
                          {exercise.name.replace(/\b\w/g, char => char.toUpperCase())}
                        </ListItem>
                      ))}
                    </List>
                    <Button variant="contained" color="primary" onClick={handleStartNow}>
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
