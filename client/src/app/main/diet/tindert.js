import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Paper,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Hammer from 'hammerjs';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

/* <link rel="stylesheet" href="MealSwipeComponent.css"></link> */
// import './MealSwipeComponent.css'; 

const mealsData = {
  
  Monday: {
    meals: [
      [
        { meal: "Breakfast", title: "Fluffy Pancakes", calories: 420, macros: { protein: 10, fats: 14, carbs: 45 }, image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a" },
        { meal: "Lunch", title: "Grilled Salmon Salad", calories: 520, macros: { protein: 30, fats: 20, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Pasta Carbonara", calories: 700, macros: { protein: 25, fats: 30, carbs: 70 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],
      [
        { meal: "Breakfast", title: "Fruit Smoothie", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "Chicken Caesar Salad", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Grilled Steak with Vegetables", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ], [
        { meal: "Breakfast", title: "soda", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "chicken rice", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "steak", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ]
    ]
  },
  
  
  Tuesday: {
    meals: [
      [
        { meal: "Breakfast", title: "Fluffy Pancakes", calories: 420, macros: { protein: 10, fats: 14, carbs: 45 }, image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a" },
        { meal: "Lunch", title: "Grilled Salmon Salad", calories: 520, macros: { protein: 30, fats: 20, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Pasta Carbonara", calories: 700, macros: { protein: 25, fats: 30, carbs: 70 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],
      [
        { meal: "Breakfast", title: "Fruit Smoothie", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "Chicken Caesar Salad", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Grilled Steak with Vegetables", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],[
        { meal: "Breakfast", title: "soda", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "chicken rice", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "steak", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ]
    ]
  },


  Wednesday: {
    meals: [
      [
        { meal: "Breakfast", title: "Fluffy Pancakes", calories: 420, macros: { protein: 10, fats: 14, carbs: 45 }, image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a" },
        { meal: "Lunch", title: "Grilled Salmon Salad", calories: 520, macros: { protein: 30, fats: 20, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Pasta Carbonara", calories: 700, macros: { protein: 25, fats: 30, carbs: 70 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],
      [
        { meal: "Breakfast", title: "Fruit Smoothie", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "Chicken Caesar Salad", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Grilled Steak with Vegetables", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],[
        { meal: "Breakfast", title: "soda", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "chicken rice", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "steak", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ]
    ]
  },

  Thursday: {
    meals: [
      [
        { meal: "Breakfast", title: "Fluffy Pancakes", calories: 420, macros: { protein: 10, fats: 14, carbs: 45 }, image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a" },
        { meal: "Lunch", title: "Grilled Salmon Salad", calories: 520, macros: { protein: 30, fats: 20, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Pasta Carbonara", calories: 700, macros: { protein: 25, fats: 30, carbs: 70 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],
      [
        { meal: "Breakfast", title: "Fruit Smoothie", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "Chicken Caesar Salad", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Grilled Steak with Vegetables", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],[
        { meal: "Breakfast", title: "soda", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "chicken rice", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "steak", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ]
    ]
  },


  Friday: {
    meals: [
      [
        { meal: "Breakfast", title: "Fluffy Pancakes", calories: 420, macros: { protein: 10, fats: 14, carbs: 45 }, image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a" },
        { meal: "Lunch", title: "Grilled Salmon Salad", calories: 520, macros: { protein: 30, fats: 20, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Pasta Carbonara", calories: 700, macros: { protein: 25, fats: 30, carbs: 70 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],
      [
        { meal: "Breakfast", title: "Fruit Smoothie", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "Chicken Caesar Salad", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Grilled Steak with Vegetables", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],[
        { meal: "Breakfast", title: "soda", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "chicken rice", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "steak", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ]
    ]
  },


  Saturday: {
    meals: [
      [
        { meal: "Breakfast", title: "Fluffy Pancakes", calories: 420, macros: { protein: 10, fats: 14, carbs: 45 }, image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a" },
        { meal: "Lunch", title: "Grilled Salmon Salad", calories: 520, macros: { protein: 30, fats: 20, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Pasta Carbonara", calories: 700, macros: { protein: 25, fats: 30, carbs: 70 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],
      [
        { meal: "Breakfast", title: "Fruit Smoothie", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "Chicken Caesar Salad", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "Grilled Steak with Vegetables", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],[
        { meal: "Breakfast", title: "soda", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "chicken rice", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74" },
        { meal: "Dinner", title: "steak", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ]
    ]
  },


  Sunday: {
    meals: [
      [
        { meal: "Breakfast", title: "Fluffy Pancakes", calories: 420, macros: { protein: 10, fats: 14, carbs: 45 }, image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a" },
        { meal: "Lunch", title: "Grilled Salmon Salad", calories: 520, macros: { protein: 30, fats: 20, carbs: 40 }, image: "" },
        { meal: "Dinner", title: "Pasta Carbonara", calories: 700, macros: { protein: 25, fats: 30, carbs: 70 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],
      [
        { meal: "Breakfast", title: "Fruit Smoothie", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "Chicken Caesar Salad", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "" },
        { meal: "Dinner", title: "Grilled Steak with Vegetables", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ],[
        { meal: "Breakfast", title: "soda", calories: 300, macros: { protein: 8, fats: 5, carbs: 50 }, image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8" },
        { meal: "Lunch", title: "chicken rice", calories: 450, macros: { protein: 25, fats: 15, carbs: 40 }, image: "" },
        { meal: "Dinner", title: "steak", calories: 700, macros: { protein: 40, fats: 30, carbs: 35 }, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" }
      ]
    ]
  },
  
  
  
  
  
  
  // Other days with meals
};

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TinderComponent = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [tinderVisible, setTinderVisible] = useState(false);
  const [chosenMeals, setChosenMeals] = useState({
    Sunday: [], Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [],
  });
  const [openRedoPopup, setOpenRedoPopup] = useState(false);
  const [tinderCards, setTinderCards] = useState([]);
  const [showChosenMeals, setShowChosenMeals] = useState(false);
  const [swipedDays, setSwipedDays] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [lastSwipeDirection, setLastSwipeDirection] = useState(null);
  const [redoFromChosenDiet, setRedoFromChosenDiet] = useState(false);
  const [enteredFromRedoButton, setEnteredFromRedoButton] = useState(false);
  const [swipingDisabled, setSwipingDisabled] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0); // Track the swipe index

  const [selectedCard, setSelectedCard] = useState(null);


  useEffect(() => {
    if (!swipingDisabled) setupHammerEvents();
    return cleanupHammerEvents;
  }, [tinderCards, swipingDisabled]);

  useEffect(() => {
    console.log("Tinder cards updated:", tinderCards);
  }, [tinderCards] );

  const setupHammerEvents = () => {
    const allCards = Array.from(document.querySelectorAll('.tinder--card'));
    allCards.forEach((el) => {
      const hammertime = new Hammer(el);
      hammertime.on('pan', (event) => {
        if (swipingDisabled) return;

        if (event.deltaX < -15) {
          handleLeftSwipe(el);
          hammertime.stop();
        }
        if (event.deltaX > 15) {
          handleRightSwipe(el);
          hammertime.stop();
        }
      });
    });
  };

  const cleanupHammerEvents = () => {
    const allCards = Array.from(document.querySelectorAll('.tinder--card'));
    allCards.forEach((el) => {
      const hammertime = new Hammer(el);
      hammertime.off('pan panend');

    });
  };

  const handleLeftSwipe = (el) => {
    setLastSwipeDirection('left');
    el.style.transition = 'transform 0.2s ease';
    el.style.transform = 'translate(-300px, 0) rotate(-15deg)';
  
    setTimeout(() => {
      setTinderCards((prev) => {
        const newCards = prev.slice(1);
        setSwipeCount((count) => count + 1);
        if (newCards.length > 0) {
          const nextCard = document.querySelector('.tinder--card');
          if (nextCard) {
            nextCard.style.transform = 'translate(0, 0) rotate(0deg)';
            nextCard.style.zIndex = 1;
          }
        }
        if (newCards.length === 0) {
          setOpenRedoPopup(true);
          setSwipingDisabled(true);
        }
        return newCards;
      });
    }, 200);
  };

  const handleRightSwipe = (el) => {
    setLastSwipeDirection('right');
    el.style.transition = 'transform 0.3s ease';
    el.style.transform = 'translate(300px, 0) rotate(15deg)';
  
    setTimeout(() => {
      const selectedMeals = tinderCards[swipeCount] || []; // All meals for the current day
      setChosenMeals((prev) => ({
        ...prev,
        [currentDay]: [...prev[currentDay], ...selectedMeals], // Add all meals for the day
      }));
      setSelectedDays((prev) => [...new Set([...prev, currentDay])]);
      setSwipeCount((count) => count + 1);
      setTinderCards([]);
      setSwipingDisabled(true);
  
      goToNextDay();
    }, 300);  
  };

  const goToNextDay = () => {
    const currentIndex = weekDays.indexOf(currentDay);
    const nextDay = (currentIndex === weekDays.length - 1) ? weekDays[0] : weekDays[currentIndex + 1];
  
    setCurrentDay(nextDay);
  
    setTimeout(() => {
      if (chosenMeals[nextDay].length > 0) {
        showChosenPlan();
      } else {
        showTinderCard(nextDay);
      }
    }, 300);
  };

  const showTinderCard = (day) => {
    console.log("Showing Tinder card for:", day);
    setCurrentDay(day);
    setTinderVisible(true);
    setTinderCards(mealsData[day]?.meals || []);
    setShowChosenMeals(false);
    setOpenRedoPopup(false);
    setEnteredFromRedoButton(false);
    setSwipingDisabled(false);
    setSelectedCard(null);
    setSwipeCount(0); 
  };

  const closeRedoPopup = (noClicked = false) => {
    setOpenRedoPopup(false);
    setSwipingDisabled(true);
  
    if (noClicked) {
      setSwipedDays((prev) => [...prev, currentDay]);
      goToNextDay();
    } else if (enteredFromRedoButton) {
      showChosenPlan();
    } else {
      goToNextDay();
    }
    setEnteredFromRedoButton(false);
  };

  const redoDay = (day) => {
    setOpenRedoPopup(false);
    setChosenMeals((prev) => ({ ...prev, [day]: [] }));
    setTinderCards(mealsData[day]?.meals || []);
    setCurrentDay(day);
    setTinderVisible(true);
    setShowChosenMeals(false);
    setSwipedDays((prev) => prev.filter((d) => d !== day));
    setSelectedDays((prev) => prev.filter((d) => d !== day));
    setRedoFromChosenDiet(true);
    setEnteredFromRedoButton(true);
    setSwipingDisabled(false);
    setSelectedCard(null);
    setSwipeCount(0); 
  };

  const showChosenPlan = () => {
    setShowChosenMeals(true);
    setTinderVisible(false);
    setOpenRedoPopup(false);
    setEnteredFromRedoButton(false);
  };

  return (
    <Box>
   
     <style>
      {`
  .day-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
  }
  .day-button {
    background: #00838F;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  .active-day {
    background-color: #004D40;
    border: 2px solid #FFFFFF;
  }
 .tinder {
      display: ${tinderVisible ? 'flex' : 'none'};
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 300px;
      gap: 20px;
      margin-top: 50px; /* Increase this value to move it further down */
    }
  .tinder--card {
    background-color:  #000000;
    border-radius: 15px;
     box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3), 
              0 4px 15px rgba(255, 255, 255, 0.2), 
              0 4px 10px rgba(255, 255, 255, 0.5);
    width: 100%;
    max-width: 800px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
    justify-content: center;
  }
  .mini-card {
  background-color: #FFF;
  border-radius: 10px;
    0 6px 10px rgba(255, 255, 255, 0.25),  /* Medium shadow for depth */
    0 2px 4px rgba(255, 255, 255, 0.35); 
  width: 300px; /* Set fixed width for mini-card */
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.meal-image-container {
  width: 100%; /* Make it take the full width of the mini-card */
  height: auto; /* Let height adjust automatically */
  aspect-ratio: 1 / 1; /* Maintain a square aspect ratio */
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.meal-image {
  width: 100%; /* Make the image fill the container width */
  height: 100%; /* Adjust height to fit the container */
  object-fit: cover; /* Ensure the image covers the container without distortion */
}

  .calorie-badge {
    position: absolute;
    top: 5px;
    left: 5px;
    background: #4CAF50;
    color: white;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
  }
  .meal-title {
  font-weight: bold;
  margin-top: 5px;
  display: block;
  color: black; /* Ensures visibility on a dark background */
  font-size: 16px; /* Slightly larger for visibility */
}
  .meal-info {
    margin-top: 8px;
    text-align: center;
    display: block;
    color: black;
     /* Ensure block display for visibility */
  }
 .macros {
  color: #AAAAAA; /* Lighter gray for readability */
  font-size: 14px;
  margin-top: 5px;
  margin-right:1px;
}
 /* General dot styling for size and shape */
.dot {
  width: 8px; /* Define the size */
  height: 8px; /* Define the size */
  border-radius: 50%; /* Make it circular */
  display: inline-block; /* Allows it to appear next to text */
  margin-right: 2px; /* Space between the dot and text */
}

/* Specific colors for each macro type */
.protein-dot {
  background-color: red; /* Red for protein */
}

.fats-dot {
  background-color: yellow; /* Yellow for fats */
}

.carbs-dot {
  background-color: green; /* Green for carbs */
}

`}

      </style>
            
          
       
          
       
 

      <Box className="day-buttons">
        {Object.keys(mealsData).map((day) => (
          <Button
            key={day}
            className={`day-button ${currentDay === day ? 'active-day' : ''}`}
            onClick={() => showTinderCard(day)}
            disabled={swipedDays.includes(day) || selectedDays.includes(day)}
          >
            {day}
            {selectedDays.includes(day) && <span style={{ color: 'green', fontSize: '16px' }}>✔️</span>}
            {swipedDays.includes(day) && !selectedDays.includes(day) && (
              <span style={{ color: 'red', fontSize: '16px' }}>✘</span>
            )}
          </Button>
        ))}
        <Button variant="contained" onClick={showChosenPlan}>Chosen Diet Plan</Button>
      </Box>

      <Box className="tinder">
  {tinderCards.length > 0 && (
    <>
      <IconButton onClick={() => handleLeftSwipe(document.querySelector('.tinder--card'))} size="large">
  <HeartBrokenIcon sx={{ color: '#c1ff72' }} />
</IconButton>
      <Box className="tinder--card">
        {tinderCards[0].map((meal, index) => (
          <div key={index} className="mini-card">
            <div className="meal-image-container">
              {meal.image ? (
                <img src={meal.image} alt={meal.title || 'Meal'} className="meal-image" />
              ) : (
                <div>No Image</div>
              )}
              <div className="calorie-badge">{meal.calories || 'N/A'} Calories</div>
            </div>
            <div className="meal-info">
              <div className="meal-title">{meal.meal || 'Meal Type'}</div> {/* Fallback for missing meal type */}
              <Typography variant="body2" color="textSecondary">{meal.title || 'Meal Title'}</Typography> {/* Fallback for missing meal title */}
              <div className="macros">
  <span className="dot protein-dot"></span> {meal.macros?.protein}g Protein
  <span className="dot fats-dot"></span> {meal.macros?.fats}g Fats
  <span className="dot carbs-dot"></span> {meal.macros?.carbs}g Carbs
</div>

            </div>
          </div>
        ))}
      </Box>
      <IconButton onClick={() => handleRightSwipe(document.querySelector('.tinder--card'))} size="large">
  <FavoriteIcon sx={{ color: '#c1ff72' }} />
</IconButton>

    </>
  )}
</Box>

               
            

      {showChosenMeals && (
        <Box sx={{ marginTop: 2 }}>
          {Object.entries(chosenMeals).map(([day, meals]) => (
            <Box key={day} sx={{ marginBottom: 2 }}>
              <Typography variant="h6">
                {day}
                <Button onClick={() => redoDay(day)} style={{ marginLeft: '10px' }}>Redo</Button>
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {meals.map((meal, index) => (
                  <Box key={index} className="mini-card">
                    <div className="meal-image-container">
                      {meal.image ? (
                        <img src={meal.image} alt={meal.title || 'Meal'} className="meal-image" />
                      ) : (
                        <div>No Image</div>
                      )}
                      <div className="calorie-badge">{meal.calories || 'N/A'} Calories</div>
                    </div>
                    <div className="meal-info">
                      <div className="meal-title">{meal.meal}</div>
                      <Typography variant="body2" color="textSecondary">{meal.title}</Typography>
                    
                      <div className="macros">
  <span className="dot protein-dot"></span> {meal.macros?.protein}g Protein
  <span className="dot fats-dot"></span> {meal.macros?.fats}g Fats
  <span className="dot carbs-dot"></span> {meal.macros?.carbs}g Carbs
</div>


                    
                    </div>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Modal open={openRedoPopup} onClose={closeRedoPopup}>
        <Paper sx={{ 
          padding: 2, 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '90%', 
          maxWidth: '350px',
          zIndex: 3000,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}>
          <IconButton onClick={() => closeRedoPopup()} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>Select Your Option</Typography>
          <Typography variant="body1" gutterBottom>Do you want to redo?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="primary" onClick={() => redoDay(currentDay)}>Yes</Button>
            <Button variant="outlined" color="secondary" onClick={() => closeRedoPopup(true)}>No</Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default TinderComponent;
