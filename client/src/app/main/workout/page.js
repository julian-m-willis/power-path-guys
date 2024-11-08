// "use client";

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Grid,
//   Typography,
//   TextField,
//   MenuItem,
// } from '@mui/material';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// // Sample workout data
// const workoutsData = [
//   { id: 1, category: 'Cardio', bodyPart: 'Legs', difficulty: 'Beginner', duration: '30 min', details: ['Running', 'Cycling', 'Jump Rope'] },
//   { id: 2, category: 'Strength', bodyPart: 'Arms', difficulty: 'Intermediate', duration: '45 min', details: ['Push-ups', 'Bicep Curls', 'Tricep Dips'] },
//   { id: 3, category: 'Flexibility', bodyPart: 'Full Body', difficulty: 'Advanced', duration: '60 min', details: ['Yoga', 'Stretching', 'Pilates'] },
//   { id: 4, category: 'Balance', bodyPart: 'Core', difficulty: 'Beginner', duration: '20 min', details: ['Tai Chi', 'Stability Ball', 'Single-leg Stand'] },
//   { id: 5, category: 'Cardio', bodyPart: 'Full Body', difficulty: 'Intermediate', duration: '40 min', details: ['HIIT', 'Jumping Jacks', 'Burpees'] },
//   { id: 6, category: 'Strength', bodyPart: 'Legs', difficulty: 'Advanced', duration: '50 min', details: ['Squats', 'Deadlifts', 'Leg Press'] },
//   { id: 7, category: 'Flexibility', bodyPart: 'Upper Body', difficulty: 'Beginner', duration: '30 min', details: ['Shoulder Stretch', 'Triceps Stretch', 'Chest Opener'] },
//   { id: 8, category: 'Balance', bodyPart: 'Full Body', difficulty: 'Intermediate', duration: '25 min', details: ['Tree Pose', 'Warrior III', 'Heel-to-Toe Walk'] },
// ];

// const WorkoutSelection = () => {
//   const [category, setCategory] = useState('');
//   const [bodyPart, setBodyPart] = useState('');
//   const [difficulty, setDifficulty] = useState('');
//   const [duration, setDuration] = useState('');
//   const [expandedWorkoutId, setExpandedWorkoutId] = useState(null);
//   const [filteredWorkouts, setFilteredWorkouts] = useState(workoutsData);
//   const router = useRouter();

//   // Effect to filter workouts whenever any filter changes
//   useEffect(() => {
//     const results = workoutsData.filter((workout) => {
//       return (
//         (category ? workout.category === category : true) &&
//         (bodyPart ? workout.bodyPart === bodyPart : true) &&
//         (difficulty ? workout.difficulty === difficulty : true) &&
//         (duration ? workout.duration === duration : true)
//       );
//     });
//     setFilteredWorkouts(results);
//   }, [category, bodyPart, difficulty, duration]);

//   const handleWorkoutClick = (workoutId) => {
//     setExpandedWorkoutId((prevId) => (prevId === workoutId ? null : workoutId));
//   };

//   const handleStartWorkout = (workout) => {
//     // Construct the URL with query parameters
//     const workoutDetailPath = `workout/detail/${workout.id}?workoutId=${workout.id}&category=${workout.category}`;
//     router.push(workoutDetailPath);
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>
//         Workout Selection
//       </Typography>

//       <Grid container spacing={2} marginBottom={3}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             select
//             label="Category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="Cardio">Cardio</MenuItem>
//             <MenuItem value="Strength">Strength</MenuItem>
//             <MenuItem value="Flexibility">Flexibility</MenuItem>
//             <MenuItem value="Balance">Balance</MenuItem>
//           </TextField>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             select
//             label="Body Part"
//             value={bodyPart}
//             onChange={(e) => setBodyPart(e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="Legs">Legs</MenuItem>
//             <MenuItem value="Arms">Arms</MenuItem>
//             <MenuItem value="Full Body">Full Body</MenuItem>
//             <MenuItem value="Core">Core</MenuItem>
//           </TextField>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             select
//             label="Difficulty"
//             value={difficulty}
//             onChange={(e) => setDifficulty(e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="Beginner">Beginner</MenuItem>
//             <MenuItem value="Intermediate">Intermediate</MenuItem>
//             <MenuItem value="Advanced">Advanced</MenuItem>
//           </TextField>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             select
//             label="Duration"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="20 min">20 min</MenuItem>
//             <MenuItem value="30 min">30 min</MenuItem>
//             <MenuItem value="45 min">45 min</MenuItem>
//             <MenuItem value="60 min">60 min</MenuItem>
//           </TextField>
//         </Grid>
//       </Grid>

//       <Button variant="contained" color="primary" onClick={() => {}}>
//         Filter
//       </Button>

//       <Link href="workout/swipe" passHref>
//         <Card variant="outlined" style={{ marginTop: '20px', cursor: 'pointer' }}>
//           <CardContent style={{ textAlign: 'center' }}>
//             <Typography variant="h5">Personalise Your Workout Plan</Typography>
//           </CardContent>
//         </Card>
//       </Link>

//       <Grid container spacing={3} mt={3}>
//         {filteredWorkouts.map((workout) => (
//           <Grid item xs={12} sm={6} md={4} key={workout.id}>
//             <Card variant="outlined" onClick={() => handleWorkoutClick(workout.id)} style={{ cursor: 'pointer' }}>
//               <CardContent>
//                 <Typography variant="h5">{workout.category}</Typography>
//                 <Typography variant="body2">Body Part: {workout.bodyPart}</Typography>
//                 <Typography variant="body2">Difficulty: {workout.difficulty}</Typography>
//                 <Typography variant="body2">Duration: {workout.duration}</Typography>
//                 {/* Show details if this workout is expanded */}
//                 {expandedWorkoutId === workout.id && (
//                   <Box mt={2}>
//                     <Typography variant="body1">Exercises:</Typography>
//                     <ul>
//                       {workout.details.map((exercise, index) => (
//                         <li key={index}>{exercise}</li>
//                       ))}
//                     </ul>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleStartWorkout(workout)} // Pass the entire workout object
//                     >
//                       Start Now
//                     </Button>
//                   </Box>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default WorkoutSelection;




























































































































"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, List, ListItem, Collapse, Select, MenuItem, FormControl } from '@mui/material';
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
