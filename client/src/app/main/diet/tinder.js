import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Hammer from 'hammerjs';

const mealsData = {
  // Sample data structure for meals
  Monday: [
    {
      meal: "Breakfast",
      title: "Fluffy Pancakes",
      calories: 420,
      macros: { protein: 10, fats: 14, carbs: 45 },
      image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a",
    },
    {
      meal: "Lunch",
      title: "Grilled Salmon Salad",
      calories: 520,
      macros: { protein: 30, fats: 20, carbs: 40 },
      image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74",
    },
    {
      meal: "Dinner",
      title: "Pasta Carbonara",
      calories: 700,
      macros: { protein: 25, fats: 30, carbs: 70 },
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    },
  ],
  Tuesday: [
    {
      meal: "Breakfast",
      title: "Greek Yogurt Parfait",
      calories: 350,
      macros: { protein: 20, fats: 5, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Chicken Caesar Wrap",
      calories: 600,
      macros: { protein: 35, fats: 25, carbs: 45 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Stir-Fried Tofu and Vegetables",
      calories: 450,
      macros: { protein: 20, fats: 15, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Wednesday: [
    {
      meal: "Breakfast",
      title: "Oatmeal with Berries",
      calories: 250,
      macros: { protein: 10, fats: 5, carbs: 45 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Quinoa Salad",
      calories: 400,
      macros: { protein: 15, fats: 10, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Beef Stir-Fry",
      calories: 700,
      macros: { protein: 40, fats: 30, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Thursday: [
    {
      meal: "Breakfast",
      title: "Smoothie Bowl",
      calories: 300,
      macros: { protein: 15, fats: 8, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Turkey Sandwich",
      calories: 500,
      macros: { protein: 30, fats: 15, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Vegetable Curry",
      calories: 600,
      macros: { protein: 15, fats: 20, carbs: 85 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Friday: [
    {
      meal: "Breakfast",
      title: "Egg and Spinach Wrap",
      calories: 350,
      macros: { protein: 20, fats: 15, carbs: 30 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Poke Bowl",
      calories: 600,
      macros: { protein: 30, fats: 20, carbs: 65 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Shrimp Tacos",
      calories: 500,
      macros: { protein: 25, fats: 15, carbs: 55 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Saturday: [
    {
      meal: "Breakfast",
      title: "French Toast",
      calories: 400,
      macros: { protein: 12, fats: 18, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Caprese Salad",
      calories: 350,
      macros: { protein: 15, fats: 20, carbs: 30 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "BBQ Chicken",
      calories: 700,
      macros: { protein: 40, fats: 30, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Sunday: [
    {
      meal: "Breakfast",
      title: "Avocado Toast",
      calories: 300,
      macros: { protein: 8, fats: 12, carbs: 40 },
      image: "https://images.unsplash.com/photo-1555685812-4f7e1b0e1b58",
    },
  ],

  // Other days' data...
};

const TinderComponent = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [tinderVisible, setTinderVisible] = useState(false);
  const [chosenMeals, setChosenMeals] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [swipingStarted, setSwipingStarted] = useState(false);
  const [tinderCards, setTinderCards] = useState([]);
  const [showChosenMeals, setShowChosenMeals] = useState(false);
  const [swipedDays, setSwipedDays] = useState([]); // Track days that have been swiped right

  useEffect(() => {
    if (tinderCards.length > 0) {
      const allCards = Array.from(document.querySelectorAll('.tinder--card'));
      allCards.forEach((el) => {
        const hammertime = new Hammer(el);
        hammertime.on('pan', function (event) {
          el.classList.add('moving');
          const xMulti = event.deltaX * 0.03;
          const yMulti = event.deltaY / 80;
          const rotate = xMulti * yMulti;
          el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
          setSwipingStarted(true);
        });
        hammertime.on('panend', function (event) {
          el.classList.remove('moving');
          const keep = Math.abs(event.deltaX) < 100 && Math.abs(event.velocityX) < 0.5;
          if (keep) {
            el.style.transform = '';
          } else {
            const endX = event.deltaX > 0 ? 1000 : -1000;
            el.style.transform = `translate(${endX}px, ${event.deltaY}px)`;
            el.classList.add('removed');
            setTinderCards((prev) => prev.slice(1));
            if (event.deltaX > 0) {
              setChosenMeals((prev) => ({
                ...prev,
                [currentDay]: [...prev[currentDay], ...mealsData[currentDay]],
              }));
              setSwipedDays((prev) => [...prev, currentDay]); // Add current day to swipedDays
            }
            updateCards();
          }
        });
      });
    }
  }, [tinderCards]);

  const showTinderCard = (day) => {
    setCurrentDay(day);
    setSwipingStarted(false);
    setTinderVisible(true);
    setTinderCards([mealsData[day] || []]);
    setShowChosenMeals(false);
  };

  const updateCards = () => {
    const allCards = Array.from(document.querySelectorAll('.tinder--card:not(.removed)'));
    allCards.forEach((card, index) => {
      card.style.zIndex = allCards.length - index;
      card.style.opacity = '1';
    });

    if (allCards.length === 0 && currentDay && swipingStarted) {
      showRedoPopup();
    }
  };

  const showRedoPopup = () => {
    setOpenDialog(true);
  };

  const closeRedoPopup = () => {
    setOpenDialog(false);
    const dayButton = document.getElementById(currentDay);
    if (dayButton) {
      dayButton.disabled = true;
      dayButton.innerHTML += ` <span style="color: red; font-size: 16px;">✘</span>`;
    }
  };

  const redoDay = (day) => {
    setOpenDialog(false);
    setSwipingStarted(false); // Reset swiping state

    setChosenMeals((prev) => ({
      ...prev,
      [day]: [], // Clear the selected meals for the specific day
    }));
    setTinderCards([mealsData[day]]);
    setCurrentDay(day); // Ensure the currentDay is updated
    setTinderVisible(true); // Display tinder cards again for the specified day
    setShowChosenMeals(false); // Hide chosen meals view

    setSwipedDays((prev) => prev.filter(d => d !== day)); // Remove day from swipedDays
  };

  const showChosenPlan = () => {
    setShowChosenMeals(true);
    setTinderVisible(false);
  };

  const handleSwipeButton = (direction) => {
    const allCards = Array.from(document.querySelectorAll('.tinder--card:not(.removed)'));
    if (allCards.length > 0) {
      const card = allCards[0];
      const endX = direction === 'right' ? 1000 : -1000;
      card.style.transform = `translate(${endX}px, 0)`;
      card.classList.add('removed');
      setTinderCards((prev) => prev.slice(1));
      if (direction === 'right') {
        setChosenMeals((prev) => ({
          ...prev,
          [currentDay]: [...prev[currentDay], ...mealsData[currentDay]],
        }));
        setSwipedDays((prev) => [...prev, currentDay]); // Add current day to swipedDays
      }
      updateCards();
    }
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
            background-color: #006064;
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
            background-color: #004D40; /* Darker background for active day */
            border: 2px solid #FFFFFF; /* White border to highlight active day */
          }
          .tinder {
            display: ${tinderVisible ? 'flex' : 'none'};
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: auto;
            gap: 20px;
            margin-top: 20px;
          }
          .tinder--card {
            background-color: #FFF;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
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
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            width: 30%;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .meal-image-container {
            width: 100px;
            height: 100px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
          }
          .meal-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
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
        `}
      </style>

      <Box className="day-buttons">
        {Object.keys(mealsData).map(day => (
          <Button
            key={day}
            className={`day-button ${currentDay === day ? 'active-day' : ''}`} // Apply active-day class if this is the current day
            onClick={() => showTinderCard(day)}
            disabled={swipedDays.includes(day)} // Disable if swiped right
          >
            {day} {swipedDays.includes(day) && <span style={{ color: 'green', fontSize: '16px' }}>✔️</span>}
          </Button>
        ))}
        <Button variant="contained" onClick={showChosenPlan}>Chosen Diet Plan</Button>
      </Box>

      <Box className="tinder">
        {tinderCards.length > 0 && (
          <>
            <Button onClick={() => handleSwipeButton('left')}>Nope</Button>
            <Box className="tinder--card">
              {tinderCards[0].map((meal, index) => (
                <div key={index} className="mini-card">
                  <div className="meal-image-container">
                    <img src={meal.image} alt={meal.title} className="meal-image" />
                    <div className="calorie-badge">{meal.calories} Calories</div>
                  </div>
                  <div className="meal-info">
                    <div className="meal-title">{meal.meal}</div>
                    <Typography variant="body2" color="textSecondary">{meal.title}</Typography>
                    <div className="macros">
                      {meal.macros.protein}g Protein • {meal.macros.fats}g Fats • {meal.macros.carbs}g Carbs
                    </div>
                  </div>
                </div>
              ))}
            </Box>
            <Button onClick={() => handleSwipeButton('right')}>Love</Button>
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
                      <img src={meal.image} alt={meal.title} className="meal-image" />
                      <div className="calorie-badge">{meal.calories} Calories</div>
                    </div>
                    <div className="meal-info">
                      <div className="meal-title">{meal.meal}</div>
                      <Typography variant="body2" color="textSecondary">{meal.title}</Typography>
                      <div className="macros">
                        {meal.macros.protein}g Protein • {meal.macros.fats}g Fats • {meal.macros.carbs}g Carbs
                      </div>
                    </div>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TinderComponent;
