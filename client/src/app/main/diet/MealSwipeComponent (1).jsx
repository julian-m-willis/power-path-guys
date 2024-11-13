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
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';



/* console.log('mealsData === ', mealsData);

Object.keys(mealsData).map((day) => {
  console.log('mealsData[day] === ', mealsData[day]);
  mealsData[day].map((aDay, index) => {
    console.log('aDay.meals === ', aDay.meals);
  });
});

console.log(
  'Object.keys(mealsData).map((day) => day) === ', 
  Object.keys(mealsData).map((day) => day)
); */

const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];

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

const StyledDayButton2 = styled(Button)({
  backgroundColor: "#00838F",
  color: "black",
  paddingTop: '10px',
  paddingBottom: '10px',
  marginTop: '10px',
  marginBottom: '10px',
  gap: 2,
  pointerEvents: 'none'
});

const TinderCard = styled(Paper)(({ removed }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  maxWidth: "1000px",      // Adjust this to set a maximum width if needed
  maxHeight: "500px",
  // backgroundColor: "#fff",
  backgroundColor: "black",
  borderRadius: "10px",
  boxShadow: "0 5px 10px rgba(255, 255, 255, 0.15), 0 3px 3px rgba(255, 255, 255, 0.1)",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  cursor: "grab",
  display: "flex",
  // flexDirection: "column",
  flexDirection: "row",
  justifyContent: "space-evenly",
  padding: "20px",
  ...(removed && {
    display: "none",
  }),
}));

const StyledMiniCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "180px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  fontSize: "14px",
  margin: "10px",
  border: '1px solid #006064',
  backgroundColor:"white",
  color:'black',

}));

const StyledMiniCard2 = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "180px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  fontSize: "14px",
  marginRight: "10px",
  border: '1px solid #006064'
}));

const ImageContainer = styled(Box)({
  width: "50%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
});

const CalorieBadge = styled(Box)({
  position: "absolute",
  top: "10px",
  left: "10px",
  background: "linear-gradient(135deg, #4CAF50, #83e68c)",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
});

const MealInfo = styled(Box)({
  width: "50%",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const MacroItem = styled(Box)(({ dotcolor, ...otherProps }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  "&::before": {
    content: '""',
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: dotcolor,
    display: "inline-block",
  },
}));

const TinderContainer = styled(Box)({
  width: "90vw",
  maxWidth: "800px",
  height: "230px",
  // width: "90vw",
  // maxWidth: "450px",
  // height: "500px",
  position: "relative",
  margin: "0 auto",
  // marginTop: "10px",
});

const MealPlanner = () => {
  const [currentDay, setCurrentDay] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
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

  useEffect(() => {
    if (currentDay && mealsData[currentDay]) {
      setTinderCards(mealsData[currentDay]);
    }
  }, [currentDay]);

  useEffect(() => {
    if (tinderCards.length > 0) {
      initializeCards();
    }
  }, [tinderCards]);

  useEffect(() => {
    setCurrentDay(WeekDays[0]);
  }, []);

  const initializeCards = () => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const hammertime = new Hammer(card, { enable: true });
        hammertime.get("pan").set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100 });
  
        hammertime.on("pan", (event) => {
          if (card) {
            console.log("Hammer instance initialized for card", index);
            card.classList.add("moving");
            card.style.transform = (event.deltaX > 0)
              ? 'translateX(75%) rotate(15deg)' 
              : 'translateX(-75%) rotate(-15deg)';
            card.style.opacity = '0';
          } else {
            const xMulti = event.deltaX * 0.03;
            const yMulti = event.deltaY / 80;
            const rotate = xMulti * yMulti;
            card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
          }
          setSwipingStarted(true);
        });
  
        hammertime.on("panend", (event) => {
          console.log("Pan end event detected on card:", index);
          card.classList.remove("moving");
          
          if (event.deltaX > 0) {
            setChosenMeals((prev) => ({
              ...prev,
              [currentDay]: [...prev[currentDay], tinderCards[index].meals],
            }));
            
            card.style.transition = "transform 0.3s ease-out";
            card.style.transform = "translate(0px, 0px) rotate(0deg)";
            card.style.pointerEvents = "none";

            const currentIndex = WeekDays.indexOf(currentDay);

            handleShowNextDay(currentIndex);
            // return;
          } else {
            const keep = Math.abs(event.deltaX) < 100 && Math.abs(event.velocityX) < 0.5;
            if (keep) {
              card.style.transform = "";
            } else {
              const endX = event.deltaX > 0 ? 1000 : -1000;
              const rotate = (event.deltaX * 0.03) * (event.deltaY / 80);
    
              if (event.deltaX < 0) { // Swipe left logic
                console.log('left');
                card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
                card.style.transform = `translate(${endX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
                card.style.opacity = '0';
                card.classList.add('removed');
                // card.remove();
                setTimeout(() => card.remove(), 300); // Remove card after animation
                setTinderCards((prev) => prev.filter((_, i) => i !== index));
              }
    
              if (index === tinderCards.length - 1 && swipingStarted) {
                setOpenDialog(true);
              }
            }
          }
        });
      }
    });
  };
  
  const handleDayClick = (day, daySwitch = true) => {
    setShowChosenMeals(false);
    setSwipingStarted(false);

    setCurrentDay("");
    setTinderCards([]);

    console.log(
      'chosenMeals[nextDay].length'
    );

    setTimeout(() => {
      setCurrentDay(day);
      if (mealsData[day]) {
        setChosenMeals((prev) => ({
          ...prev,
          [day]: [],
        }));
  
        setRejectedMeals((prev) => ({
          ...prev,
          [day]: [],
        }));
  
        if(day == currentDay) {
          setTinderCards(mealsData[day]);
          initializeCards();
        }
      }
    }, 200);

  };

  const handleShowChosenPlan = () => {
    console.log(tinderCards);
    console.log(chosenMeals);

    Object.entries(chosenMeals).map((chosenMeal) => {
      console.log(chosenMeal);
    })
    
    setShowChosenMeals(true);
  };

  const handleRedo = () => {
    setOpenDialog(false);
    if (currentDay && mealsData[currentDay]) {
      setTinderCards(mealsData[currentDay]);
      setSwipingStarted(false);
    }
  };

  const handleCloseRedo = () => {
    const currentIndex = WeekDays.indexOf(currentDay);
    setOpenDialog(false);
    setRejectedMeals((prev) => ({
      ...prev,
      [currentDay]: [...prev[currentDay], WeekDays[currentIndex]],
    }));

    handleShowNextDay(currentIndex);
  };

  const handleShowNextDay = (currentIndex) => {
    if (currentDay === 'Sunday') {
      console.log(currentDay);
      
      setCurrentDay("");
      setTinderCards([]);
      handleShowChosenPlan();
    } else {
      const nextDay = (currentIndex >= 0 && currentIndex < (WeekDays.length - 1)) ? WeekDays[currentIndex + 1] : null;
      
      if (nextDay && (chosenMeals[nextDay].length == 0 && rejectedMeals[nextDay].length == 0)) {
        handleDayClick(nextDay);
      } else {
        handleShowChosenPlan();
      }
    }
  }

  const handleSwipeButton = (direction) => {
    if (tinderCards.length > 0) {
      const card = cardsRef.current[0];

      if (card) {

        card.style.transform = (direction === "right")
          ? 'translateX(75%) rotate(15deg)' 
          : 'translateX(-75%) rotate(-15deg)';
        cardsRef.current[0].style.opacity = '0';

        if (direction === "right") {
          setChosenMeals((prev) => ({
            ...prev,
            [currentDay]: [...prev[currentDay], tinderCards[0].meals],
          }));

          card.style.transition = "transform 0.3s ease-out";
          card.style.transform = "translate(0px, 0px) rotate(0deg)";
          card.style.pointerEvents = "none";

          const currentIndex = WeekDays.indexOf(currentDay);
          handleShowNextDay(currentIndex);

          return;
        } else if(direction === "left") {
          const endX = direction === "right" ? 1000 : -1000;
          card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
          card.style.transform = `translate(${endX}px, 0) rotate(${endX}deg)`;
          card.style.opacity = '0';
          card.classList.add("removed");
          setTinderCards((prev) => prev.slice(1));
          setSwipingStarted(true);
          if (tinderCards.length === 1) {
            setOpenDialog(true);
          }
        }
        // card.style.transform = `translate(${endX}px, 0)`;
        // card.classList.add("removed");
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {/* Day Buttons */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              p: 2,
              backgroundColor: "#121212",
            }}
          >
            {WeekDays.map((day) => (
              <StyledDayButton
                key={day}
                onClick={() => handleDayClick(day)}
                disabled={(chosenMeals[day].length > 0) || (rejectedMeals[day].length > 0)}
                style={{
                  backgroundColor: (currentDay == day) && "#00ACC1"
                }}
              >
                {day}
                {chosenMeals[day].length > 0 && (
                  <span
                    style={{
                      color: "green",
                      fontSize: "16px",
                      marginLeft: "5px",
                    }}
                  >
                    ✔
                  </span>
                )}
                {rejectedMeals[day].length > 0 && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "16px",
                      marginLeft: "5px",
                    }}
                  >
                    ✘
                  </span>
                )}
              </StyledDayButton>
            ))}
            <StyledDayButton onClick={handleShowChosenPlan}>
              Chosen Diet Plan
            </StyledDayButton>
          </Box>
        </Grid>

        {!showChosenMeals && currentDay && (
          <Grid item xs={12}>
            <TinderContainer>
              {tinderCards.map((tinderCard, index) => (
                <TinderCard
                  key={Math.random() + index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  style={{
                    zIndex: tinderCards.length - index,
                  }}
                >
                  {
                    tinderCard?.meals?.map((aMeal) => (
                      <StyledMiniCard key={Math.random()}>
                        <ImageContainer>
                          <img
                            src={aMeal.img}
                            alt={aMeal.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <CalorieBadge>🔥 {aMeal.calories} Calories</CalorieBadge>
                        </ImageContainer>
                        <MealInfo>
                          <Typography variant="h6">{aMeal.type}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {aMeal.title}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.5,
                            }}
                          >
                            <MacroItem dotcolor="#F3A830">
                              {aMeal.protein} Protein
                            </MacroItem>
                            <MacroItem dotcolor="#5C85D6">
                              {aMeal.fats} Fats
                            </MacroItem>
                            <MacroItem dotcolor="#68B168">
                              {aMeal.carbs} Carbs
                            </MacroItem>
                          </Box>
                        </MealInfo>
                      </StyledMiniCard>
                    ))
                  }
                </TinderCard>
              ))}
            </TinderContainer>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 6 }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => handleSwipeButton("left")}
                sx={{
                  minWidth: 48, 
                  minHeight: 48,
                  backgroundColor: "c1ff72",  // Color for broken heart icon
                  borderRadius: "50%",
                  '&:hover': { backgroundColor: "#FF5252" }, // Hover color
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HeartBrokenIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSwipeButton("right")}

                sx={{
                  minWidth: 48, 
                  minHeight: 48,
                  backgroundColor: "#c1ff72",  // Color for heart icon
                  borderRadius: "50%",
                  '&:hover': { backgroundColor: "#F50057" }, // Hover color
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                 <FavoriteIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
              </Button>
            </Box>
          </Grid>
        )}

        {/* Chosen Meals View */}
        {showChosenMeals && (
          <Grid item xs={12}>
            {Object.entries(chosenMeals).map(
              ([day, chosenMeal]) => (
                <div key={day + Math.random()}>
                  <StyledDayButton2>
                    <Typography variant="h6">{day}</Typography>
                  </StyledDayButton2>
                  <Button style={{
                    border: '1px solid',
                    marginLeft: "10px"
                  }} onClick={() => handleDayClick(day)}>Redo</Button>
                  <br/>
                  {
                    (chosenMeal.length > 0) && (
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2}>
                          {chosenMeal.map((aChosenMealMeal, index) => (
                            <Grid
                              item xs={12} sm={6} md={12} 
                              key={`${day}-${index}`}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              {
                                aChosenMealMeal.map((aMeal, aIndex) => (
                                  <StyledMiniCard2 key={`${day}-${index}-${aIndex}`}>
                                    <ImageContainer>
                                      <img
                                        src={aMeal.img}
                                        alt={aMeal.title}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                        }}
                                      />
                                      <CalorieBadge>
                                        🔥 {aMeal.calories} Calories
                                      </CalorieBadge>
                                    </ImageContainer>
                                    <MealInfo>
                                      <Typography variant="h6">{aMeal.type}</Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        {aMeal.title}
                                      </Typography>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: 0.5,
                                        }}
                                      >
                                        <MacroItem dotcolor="#F3A830">
                                          {aMeal.protein} Protein
                                        </MacroItem>
                                        <MacroItem dotcolor="#5C85D6">
                                          {aMeal.fats} Fats
                                        </MacroItem>
                                        <MacroItem dotcolor="#68B168">
                                          {aMeal.carbs} Carbs
                                        </MacroItem>
                                      </Box>
                                    </MealInfo>
                                  </StyledMiniCard2>
                                ))
                              }
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )
                  }
                </div>
              )
            )}
          </Grid>
        )}
      </Grid>

      {/* Redo Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Your Option</DialogTitle>
        <DialogContent>
          <Typography>Do you want to redo?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRedo}>Yes</Button>
          <Button onClick={handleCloseRedo}>No</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MealPlanner;
