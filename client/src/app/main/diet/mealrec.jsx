import React, { useState } from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const recommendations = {
  Monday: [
    [
      { mealType: "Breakfast", name: "Oatmeal", img: "https://i.imgur.com/u2w5qpi.jpg", calories: 250, fat: 10, protein: 15, carbs: 30 },
      { mealType: "Lunch", name: "Grilled Chicken Salad", img: "https://i.imgur.com/6fFhXfT.jpg", calories: 500, fat: 20, protein: 30, carbs: 45 },
      { mealType: "Dinner", name: "Salmon with Veggies", img: "https://i.imgur.com/6fFhXfT.jpg", calories: 500, fat: 20, protein: 30, carbs: 45 },
    ],
    // Additional rows...
  ],
  // Additional days...
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
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
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
              minWidth: isMobile ? '35px' : 'auto',
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
