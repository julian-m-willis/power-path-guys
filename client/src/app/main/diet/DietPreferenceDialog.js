import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Hammer from "hammerjs";
import { mealsData } from "./meals";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
// import DietPreferenceDialog from "./DietPreferenceDialog";

const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Styles
const StyledDayButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#c1ff72",
  color: "black",
  "&:hover": {
    backgroundColor: "#00ACC1",
  },
  "&:disabled": {
    backgroundColor: "#004d5a",
    cursor: "not-allowed",
    color: "gray",
  },
}));

const MealPlanner = () => {
  const [currentDay, setCurrentDay] = useState("");
  const [dietPreferenceDialogOpen, setDietPreferenceDialogOpen] = useState(true);
  // const [dietPreference, setDietPreference] = useState("");
  // const [openDialog, setOpenDialog] = useState(false);
  const [showChosenMeals, setShowChosenMeals] = useState(false);
  const [tinderCards, setTinderCards] = useState([]);
  const [swipingStarted, setSwipingStarted] = useState(false);
  const [chosenMeals, setChosenMeals] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [rejectedMeals, setRejectedMeals] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

  const cardsRef = useRef([]);

  // Load meals for the current day
  useEffect(() => {
    if (currentDay && mealsData[currentDay]) {
      setTinderCards(mealsData[currentDay]);
    }
  }, [currentDay]);

  // Initialize swipe behavior for cards
  useEffect(() => {
    if (tinderCards.length > 0) {
      initializeCards();
    }
  }, [tinderCards]);

  // Set initial day to Monday
  useEffect(() => {
    setCurrentDay(WeekDays[0]);
  }, []);

  const initializeCards = () => {
    // Swipe logic for Tinder-like cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const hammertime = new Hammer(card, { enable: true });
        hammertime.get("pan").set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100 });
        hammertime.on("panend", (event) => {
          card.classList.remove("moving");
          if (event.deltaX > 0) {
            setChosenMeals((prev) => ({
              ...prev,
              [currentDay]: [...prev[currentDay], tinderCards[index].meals],
            }));
            handleShowNextDay(WeekDays.indexOf(currentDay));
          } else {
            setTinderCards((prev) => prev.filter((_, i) => i !== index));
          }
        });
      }
    });
  };

  const handleDayClick = (day) => {
    setShowChosenMeals(false);
    setSwipingStarted(false);
    setCurrentDay(day);
    setTinderCards(mealsData[day]);
  };

  const handleShowChosenPlan = () => {
    setShowChosenMeals(true);
  };

  const handleRedo = () => {
    setOpenDialog(false);
    if (currentDay && mealsData[currentDay]) {
      setTinderCards(mealsData[currentDay]);
      setSwipingStarted(false);
    }
  };

  const handleShowNextDay = (currentIndex) => {
    const nextDay = WeekDays[(currentIndex + 1) % WeekDays.length];
    setCurrentDay(nextDay);
  };

  // Handle closing the diet preference dialog and reset to Monday
  // const handleDietPreferenceClose = () => {
  //   setDietPreferenceDialogOpen(false);
  //   setCurrentDay("Monday"); // Reset to Monday's view
  // };

  return (
    // <Container maxWidth="lg">
    //   <DietPreferenceDialog
    //     open={dietPreferenceDialogOpen}
    //     onClose={handleDietPreferenceClose}
    //     onConfirmAndReload={handleDietPreferenceClose} // Calls handleDietPreferenceClose after confirmation
    //     dietPreference={dietPreference}
    //     setDietPreference={setDietPreference}
    //   />

      <Grid container spacing={2}>
        {/* Day Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, p: 2, backgroundColor: "#121212" }}>
            {WeekDays.map((day) => (
              <StyledDayButton
                key={day}
                onClick={() => handleDayClick(day)}
                disabled={chosenMeals[day].length > 0 || rejectedMeals[day].length > 0}
                style={{ backgroundColor: currentDay === day ? "#00ACC1" : "" }}
              >
                {day}
              </StyledDayButton>
            ))}
            <StyledDayButton onClick={handleShowChosenPlan}>Chosen Diet Plan</StyledDayButton>
          </Box>
        </Grid>

        {/* Meal Cards */}
        {!showChosenMeals && currentDay && (
          <Grid item xs={12}>
            <Box sx={{ position: "relative", margin: "0 auto", marginTop: "50px", width: "90vw", maxWidth: "800px", height: "230px" }}>
              {tinderCards.map((tinderCard, index) => (
                <Paper
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    maxWidth: "1000px",
                    maxHeight: "500px",
                    backgroundColor: "black",
                    borderRadius: "10px",
                    boxShadow: "0 5px 10px rgba(255, 255, 255, 0.15), 0 3px 3px rgba(255, 255, 255, 0.1)",
                    zIndex: tinderCards.length - index,
                  }}
                >
                  <img src={tinderCard.img} alt={tinderCard.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <Box sx={{ position: "absolute", top: "10px", left: "10px", background: "#4CAF50", color: "#fff", padding: "5px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
                    🔥 {tinderCard.calories} Calories
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>
        )}

        {/* Chosen Meals View */}
        {showChosenMeals && (
          <Grid item xs={12}>
            {Object.entries(chosenMeals).map(([day, chosenMeal]) => (
              <div key={day}>
                <StyledDayButton2>
                  <Typography variant="h6">{day}</Typography>
                </StyledDayButton2>
                <br />
                {chosenMeal.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2}>
                      {chosenMeal.map((meal, index) => (
                        <Grid item xs={12} sm={6} md={12} key={index}>
                          <Paper sx={{ display: "flex", fontSize: "14px", marginRight: "10px", border: '1px solid #006064' }}>
                            <img src={meal.img} alt={meal.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </div>
            ))}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default MealPlanner;
