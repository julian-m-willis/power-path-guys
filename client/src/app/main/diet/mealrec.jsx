import React, { useState } from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

const daysOfWeek = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",'Sunday'];

const recommendations = {
  Monday: [
    [
      { mealType: "Breakfast", name: "Greek Yogurt with Berries and Almonds", img: "https://www.daisybeet.com/wp-content/uploads/2023/06/Frozen-Greek-Yogurt-5.jpg", calories: 300, fat: 10, protein: 20, carbs: 35 },
      { mealType: "Lunch", name: "Grilled Chicken Salad", img: "https://live.staticflickr.com/65535/54139036096_a785c55463_h.jpg", calories: 500, fat: 20, protein: 30, carbs: 45 },
      { mealType: "Dinner", name: "Salmon with Veggies", img: "https://live.staticflickr.com/65535/54139039071_c6dc8159c4_h.jpg", calories: 500, fat: 20, protein: 30, carbs: 45 },
    ],
  ],
  Tuesday: [
    [
      { mealType: "Breakfast", name: "Avocado Toast with Eggs", img: "https://live.staticflickr.com/65535/54139500075_dc3fadc96f_h.jpg", calories: 350, fat: 15, protein: 12, carbs: 30 },
      { mealType: "Lunch", name: "Quinoa and Roasted Vegetable Bowl", img: "https://live.staticflickr.com/65535/54139372149_16635b4f70_m.jpg", calories: 450, fat: 12, protein: 20, carbs: 60 },
      { mealType: "Dinner", name: "Shrimp Stir-Fry with Brown Rice", img: "https://live.staticflickr.com/65535/54139504750_7d1b743671_m.jpg", calories: 500, fat: 15, protein: 25, carbs: 55 },
    ],
  ],
  Wednesday: [
    [
      { mealType: "Breakfast", name: "Protein Smoothie with Spinach and Banana", img: "https://live.staticflickr.com/65535/54139506540_f5c10c32aa_m.jpg", calories: 280, fat: 5, protein: 25, carbs: 40 },
      { mealType: "Lunch", name: "Turkey and Hummus Wrap", img: "https://live.staticflickr.com/65535/54139508060_1c92b47494_m.jpg", calories: 400, fat: 14, protein: 30, carbs: 40 },
      { mealType: "Dinner", name: "Baked Cod with Asparagus", img: "https://live.staticflickr.com/65535/54139328108_80fb46404f_m.jpg", calories: 450, fat: 12, protein: 28, carbs: 40 },
    ],
  ],
  Thursday: [
    [
      { mealType: "Breakfast", name: "Chia Pudding with Mango and Coconut", img: "https://live.staticflickr.com/65535/54139385824_041201fc81_m.jpg", calories: 290, fat: 10, protein: 15, carbs: 40 },
      { mealType: "Lunch", name: "Lentil and Spinach Soup", img: "https://live.staticflickr.com/65535/54139387374_1665044a22_m.jpg", calories: 350, fat: 8, protein: 18, carbs: 45 },
      { mealType: "Dinner", name: "Beef Stir-Fry with Mixed Vegetables", img: "https://live.staticflickr.com/65535/54139337948_71e3b56e0c_m.jpg", calories: 520, fat: 18, protein: 32, carbs: 50 },
    ],
  ],
  Friday: [
    [
      { mealType: "Breakfast", name: "Whole Grain Pancakes with Berries", img: "https://live.staticflickr.com/65535/54138206872_83e3406662_m.jpg", calories: 320, fat: 8, protein: 10, carbs: 50 },
      { mealType: "Lunch", name: "Chicken Wrap with Veggies and Hummus", img: "https://live.staticflickr.com/65535/54139392539_6620aa99ce_m.jpg", calories: 450, fat: 12, protein: 28, carbs: 55 },
      { mealType: "Dinner", name: "Grilled Steak with Sweet Potato", img: "https://live.staticflickr.com/65535/54139525660_2ecd4f0bab_m.jpg", calories: 550, fat: 20, protein: 35, carbs: 45 },
    ],
  ],
  Saturday: [
    [
      { mealType: "Breakfast", name: "Smoothie Bowl with Mixed Fruits and Nuts", img: "https://www.veggiesdontbite.com/wp-content/uploads/2020/05/vegan-smoothie-bowl-29-750x1125.jpg", calories: 330, fat: 12, protein: 15, carbs: 45 },
      { mealType: "Lunch", name: "Grilled Tuna Salad with Avocado", img: "https://www.platingsandpairings.com/wp-content/uploads/2019/09/avocado-tuna-salad-7-1-scaled.jpg", calories: 480, fat: 18, protein: 35, carbs: 40 },
      { mealType: "Dinner", name: "Chicken Stir-Fry with Zucchini Noodles", img: "https://www.howsweeteats.com/wp-content/uploads/2015/11/drunken-zoodles-I-howsweeteats.com-5.jpg", calories: 500, fat: 14, protein: 30, carbs: 35 },
    ],
  ],
  Sunday: [
    [
      { mealType: "Breakfast", name: "Egg White Omelette with Veggies", img: "https://www.garlicandzest.com/wp-content/uploads/2023/07/egg-white-omelet-17-768x960.jpg", calories: 250, fat: 5, protein: 20, carbs: 25 },
      { mealType: "Lunch", name: "Shrimp Caesar Salad", img: "https://www.cottercrunch.com/wp-content/uploads/2022/06/Spicy-Shrimp-Ceasar-Salad-Update_-9.jpg", calories: 420, fat: 14, protein: 28, carbs: 30 },
      { mealType: "Dinner", name: "Spaghetti Squash with Turkey Meatballs", img: "https://www.halfbakedharvest.com/wp-content/uploads/2017/10/Instant-Pot-Turkey-Meatballs-and-Spaghetti-Squash-1.jpg", calories: 470, fat: 16, protein: 30, carbs: 50 },
    ],
  ],
};


const CardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '250px',
  height: '300px',
  perspective: '1000px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100px',
    height: '150px',
  },
}));

const Card = styled(Box)(({ flipped }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  transition: 'transform 0.6s',
}));

const CardFace = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backfaceVisibility: 'hidden',
  borderRadius: '8px',
}));

const FrontFace = styled(CardFace)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  overflow: 'hidden',
}));

const BackFace = styled(CardFace)(({ theme }) => ({
  backgroundColor: '#c1ff72',
  color: '#000000',
  // color: theme.palette.secondary.contrastText,
  transform: 'rotateY(180deg)',
  flexDirection: 'column',
  padding: '8px',
  textAlign: 'center',
  overflow: 'hidden', // Ensure content is contained within the card
  [theme.breakpoints.down('sm')]: {
    padding: '4px', // Adjust padding for mobile view
  },
}));

const LayoutGrid = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [flipped, setFlipped] = useState({});
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleFlip = (key) => {
    setFlipped((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Box display="flex" justifyContent="center" gap={1} mt={2}>
        {daysOfWeek.map((day) => (
          <Button
            key={day}
            variant={selectedDay === day ? "contained" : "outlined"}
            onClick={() => setSelectedDay(day)}
            sx={{
              border: '0px',
              color: day === selectedDay ? "black" : "#888",
              backgroundColor: day === selectedDay ? "#c1ff72" : "transparent",
              fontWeight: "normal",
              "&:hover": {
                backgroundColor: "#2ecc71",
                color: "white",
              },
              borderRadius: 1,
              minWidth: isMobile ? '30px' : 'auto',
              padding: isMobile ? '4px 6px' : '6px 12px',
              fontSize: isMobile ? '0.7rem' : '1rem',
            }}
          >
            {isMobile ? day[0] : day}
          </Button>
        ))}
      </Box>

      {selectedDay && (
        <Box mt={5} p={3} bgcolor="background.paper" borderRadius={2}>
          <Typography variant="h4">{selectedDay}</Typography>
          {recommendations[selectedDay] && recommendations[selectedDay].map((row, rowIndex) => (
            <Box key={rowIndex} display="flex" flexDirection="row" justifyContent="center" gap={2} mb={3}>
              {row.map((meal, index) => {
                const flipKey = `${selectedDay}-${rowIndex}-${meal.mealType}`;
                return (
                  <CardContainer key={index} onClick={() => handleFlip(flipKey)}>
                    <Card flipped={flipped[flipKey]}>
                      <FrontFace>
                        <Box
                          component="img"
                          src={meal.img}
                          alt={`${meal.mealType}`}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                          }}
                        />
                      </FrontFace>
                      <BackFace>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.8rem' : '1rem' }}>
                          {meal.mealType}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textDecoration: 'underline',
                            mt: 1,
                            mb: 1,
                            fontSize: isMobile ? '0.7rem' : '0.9rem',
                            whiteSpace: 'normal', // Allow text to wrap to the next line
                            lineHeight: isMobile ? '1rem' : '1.2rem',
                            overflow: 'hidden',
                            color: 'black',
                          }}
                        >
                          {meal.name}
                        </Typography>
                        <Box mt={2}>
                          <Typography variant="body2" sx={{ fontSize: isMobile ? '0.6rem' : '0.8rem' }}>Calories: {meal.calories} kcal</Typography>
                          <Typography variant="body2" sx={{ fontSize: isMobile ? '0.6rem' : '0.8rem' }}>Fat: {meal.fat}g</Typography>
                          <Typography variant="body2" sx={{ fontSize: isMobile ? '0.6rem' : '0.8rem' }}>Protein: {meal.protein}g</Typography>
                          <Typography variant="body2" sx={{ fontSize: isMobile ? '0.6rem' : '0.8rem' }}>Carbs: {meal.carbs}g</Typography>
                        </Box>
                      </BackFace>
                    </Card>
                  </CardContainer>
                );
              })}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default LayoutGrid;
