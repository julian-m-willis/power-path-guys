// export default function Workout() {
//   return <h1>WORKOUT PAGE</h1>;
// }

"use client"; 

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WorkoutSelection.css'; // Include this CSS file for styling

// Mock workout data
const workouts = [
  { id: 1, name: 'HIIT', category: 'Cardio', bodyPart: 'Full Body', level: 'Intermediate', duration: 30 },
  { id: 2, name: 'Yoga Flow', category: 'Flexibility', bodyPart: 'Core', level: 'Beginner', duration: 45 },
  { id: 3, name: 'Strength Circuit', category: 'Strength', bodyPart: 'Upper Body', level: 'Advanced', duration: 60 },
  { id: 4, name: 'Balance Basics', category: 'Balance', bodyPart: 'Lower Body', level: 'Beginner', duration: 15 },
  // Add more workout objects as needed
];

function WorkoutSelection() {
  const [category, setCategory] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [level, setLevel] = useState('');
  const [duration, setDuration] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

  // Filter function
  const filterWorkouts = () => {
    const results = workouts.filter((workout) => {
      return (
        (category === '' || workout.category === category) &&
        (bodyPart === '' || workout.bodyPart === bodyPart) &&
        (level === '' || workout.level === level) &&
        (duration === '' || workout.duration <= parseInt(duration))
      );
    });
    setFilteredWorkouts(results);
  };
  
  {/* Link to Swipe.js as Personalized Workout Plan */}
  
  return (
    <div className="workout-selection">
      {/* Personalized Plan Card */}
      <div className="personalized-card">
        <h2>Your Personalized Workout Plan</h2>
        <Link to="/swipe">
          <button>Go to Your Plan</button>
        </Link>
      </div>

      {/* Filter Options in Card */}
      <div className="filter-card">
        <h2>Select Your Workout</h2>
        <label>Category:</label>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Balance">Balance</option>
        </select>

        <label>Body Part:</label>
        <select onChange={(e) => setBodyPart(e.target.value)} value={bodyPart}>
          <option value="">All</option>
          <option value="Full Body">Full Body</option>
          <option value="Upper Body">Upper Body</option>
          <option value="Lower Body">Lower Body</option>
          <option value="Core">Core</option>
        </select>

        <label>Level:</label>
        <select onChange={(e) => setLevel(e.target.value)} value={level}>
          <option value="">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Duration (min):</label>
        <select onChange={(e) => setDuration(e.target.value)} value={duration}>
          <option value="">All</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
          <option value="60">60</option>
        </select>

        <button onClick={filterWorkouts}>Filter Workouts</button>
      </div>

      {/* Workout List Display as Cards */}
      <div className="workout-list">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <div className="workout-card" key={workout.id}>
              <h3>{workout.name}</h3>
              <p>Category: {workout.category}</p>
              <p>Body Part: {workout.bodyPart}</p>
              <p>Level: {workout.level}</p>
              <p>Duration: {workout.duration} min</p>
            </div>
          ))
        ) : (
          <p>No workouts found for selected criteria.</p>
        )}
      </div>
    </div>
  );
}

export default WorkoutSelection;
