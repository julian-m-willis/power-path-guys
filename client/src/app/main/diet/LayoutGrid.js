import React, { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, IconButton } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import { styled } from '@mui/system';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const mealTypes = ["Breakfast", "Lunch", "Dinner"];

const CardContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '350px',
  perspective: '1000px',
}));

const Card = styled(Box)(({ theme, flipped }) => ({
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
  boxShadow: theme.shadows[3],
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
  padding: '16px',
  textAlign: 'center',
}));




const HeartButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.secondary.main, // Default color
    position: 'relative',
    '&:hover': {
      color: '#32CD32', // Replace with the exact green shade from your theme
      transform: 'scale(1.1)', // Slightly scale up on hover
    },
    '&:hover::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#32CD32', // Green color for the "shadow"
      clipPath: 'path("M24 42s-13-8-13-21 11.3-13 13-6.6C25.7 8 37 10 37 21S24 42 24 42z")', // Heart shape in clip-path
      opacity: 0.2, // Light opacity for shadow effect
      zIndex: -1, // Positioned behind the icon
      borderRadius: '50%', // Keep it rounded to look clean
    },
  }));
  
  

const LayoutGrid = () => {
  const [flipped, setFlipped] = useState({});
  const [open, setOpen] = useState(true);
  const [dietPreference, setDietPreference] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [chosenDiet, setChosenDiet] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );
  const [showChosenDiet, setShowChosenDiet] = useState(false);

  const handleFlip = (key) => {
    setFlipped((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDietChange = (event) => {
    setDietPreference(event.target.value);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowChosenDiet(false);
  };

  const handleSelect = () => {
    setChosenDiet((prev) => ({
      ...prev,
      [selectedDay]: mealTypes.map((mealType) => ({
        mealType,
        flipped: false,
      })),
    }));
  };

  const toggleChosenDiet = () => {
    setShowChosenDiet((prev) => !prev);
  };

  return (
    <>
      {/* Popup for diet preference */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Your Diet Preference</DialogTitle>
        <DialogContent>
          <Select
            value={dietPreference}
            onChange={handleDietChange}
            displayEmpty
            fullWidth
            variant="outlined"
          >
            <MenuItem value="" disabled>Select Diet</MenuItem>
            <MenuItem value="vegetarian">Vegetarian</MenuItem>
            <MenuItem value="vegan">Vegan</MenuItem>
            <MenuItem value="pescatarian">Pescatarian</MenuItem>
            <MenuItem value="keto">Keto</MenuItem>
            <MenuItem value="gluten-free">Gluten-Free</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={!dietPreference}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Day tabs and Chosen Diet button */}
      <Box display="flex" justifyContent="center" gap={1} mt={2}>
        {daysOfWeek.map((day) => (
          <Button
            key={day}
            variant={selectedDay === day ? "contained" : "outlined"}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </Button>
        ))}
        <Button variant="outlined" color="secondary" onClick={toggleChosenDiet}>
          Chosen Diet
        </Button>
      </Box>

      {/* Display Chosen Diet Page or Meal Selection */}
      {showChosenDiet ? (
        <Box mt={5} p={3} bgcolor="background.paper" borderRadius={2}>
          <Typography variant="h4" gutterBottom>
            Chosen Diet
          </Typography>
          {daysOfWeek.map((day) => (
            <Box key={day} mb={4}>
              <Typography variant="h5">{day}</Typography>
              {chosenDiet[day].length ? (
                <Box display="flex" gap={3} mt={2}>
                  {chosenDiet[day].map((meal, index) => {
                    const flipKey = `${day}-${meal.mealType}`;
                    return (
                      <CardContainer key={index} onClick={() => handleFlip(flipKey)}>
                        <Card flipped={flipped[flipKey]}>
                          <FrontFace>
                            <Box
                              component="img"
                              src="https://i.imgur.com/u2w5qpi.jpg" // Replace with an appropriate image URL
                              alt={`${day} - ${meal.mealType}`}
                              sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px',
                              }}
                            />
                          </FrontFace>
                          <BackFace>
                            <Typography variant="h6">{meal.mealType} Meal</Typography>
                            <Typography variant="body2">Calories: 250 kcal</Typography>
                            <Typography variant="body2">Fat: 10g</Typography>
                            <Typography variant="body2">Protein: 15g</Typography>
                            <Typography variant="body2">Carbs: 30g</Typography>
                          </BackFace>
                        </Card>
                      </CardContainer>
                    );
                  })}
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No meals selected.
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        selectedDay && (
          <Box display="flex" flexDirection="column" alignItems="center" mt={3} gap={3}>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <Box key={rowIndex} display="flex" gap={3} justifyContent="center">
                {mealTypes.map((mealType) => {
                  const flipKey = `${selectedDay}-${mealType}-${rowIndex}`;
                  return (
                    <CardContainer key={mealType} onClick={() => handleFlip(flipKey)}>
                      <Card flipped={flipped[flipKey]}>
                        <FrontFace>
                          <Box
                            component="img"
                            src="https://i.imgur.com/6fFhXfT.jpg" // Replace with your image URL
                            alt={`${selectedDay} - ${mealType}`}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                        </FrontFace>
                        <BackFace>
                          <Typography variant="h6">{mealType} Meal</Typography>
                          <Typography variant="subtitle1">{selectedDay}</Typography>
                          <Box mt={2}>
                            <Typography variant="body2">Calories: 250 kcal</Typography>
                            <Typography variant="body2">Fat: 10g</Typography>
                            <Typography variant="body2">Protein: 15g</Typography>
                            <Typography variant="body2">Carbs: 30g</Typography>
                          </Box>
                        </BackFace>
                      </Card>
                    </CardContainer>
                  );
                })}
                {/* Heart icon with hover effect */}
                <HeartButton onClick={handleSelect}>
                  <FavoriteBorder />
                </HeartButton>
              </Box>
            ))}
          </Box>
        )
      )}
    </>
  );
};

export default LayoutGrid;
