// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Divider,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import "./swipestyle.css";

// const Workout = () => {
//   const router = useRouter();
//   const workoutContainerRef = useRef(null);
//   const [workouts, setWorkouts] = useState([])
//   const [openDialog, setOpenDialog] = useState(false);

  
//   const fetchWorkouts = async () => {
//     try {
//       const response = await fetch("http://3.107.192.183:5006/workout/suggest-exercises/random");
//       if (response.ok) {
//         const data = await response.json();
//         setWorkouts(data.suggested_exercises);
//       } else {
//         console.error("Failed to fetch workouts");
//       }
//     } catch (error) {
//       console.error("Error fetching workouts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchWorkouts();
//   }, []);

//   useEffect(() => {
//     if (typeof document !== "undefined") {
//       const workoutElement = document.querySelector(".workout");
//       if (workoutElement) {
//         workoutElement.classList.add("loaded");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (workouts == []){
//       fetchWorkouts();
//     }
//     const cards = workoutContainerRef.current?.querySelectorAll(".workout--card");
//     let activeCard = null;
//     let startX = 0;
//     let currentX = 0;
//     let isDragging = false;
  
//     if (cards) {
//       const handleStart = (e) => {
//         if (isDragging) return; // Only allow one active drag
//         activeCard = e.currentTarget;
//         startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
//         isDragging = true;
//         activeCard.style.transition = "none";
//       };
  
//       const handleMove = (e) => {
//         if (!isDragging || !activeCard) return;
//         currentX = (e.type.includes("mouse") ? e.clientX : e.touches[0].clientX) - startX;
//         activeCard.style.transform = `translateX(calc(-50% + ${currentX}px))`;
//       };
  
//       const handleEnd = () => {
//         if (!isDragging || !activeCard) return;
//         isDragging = false;
//         activeCard.style.transition = "transform 0.3s ease-out";
  
//         if (currentX > 100) {
//           // Swiped right
//           activeCard.style.transform = `translateX(100vw)`;
//           setTimeout(() => {
//             setWorkouts((prev) => prev.filter((_, i) => i !== Array.from(cards).indexOf(activeCard)));
//             activeCard = null;
//           }, 300);
//         } else if (currentX < -100) {
//           // Swiped left
//           activeCard.style.transform = `translateX(-200vw)`;
//           setTimeout(() => {
//             setWorkouts((prev) => prev.filter((_, i) => i !== Array.from(cards).indexOf(activeCard)));
//             activeCard = null;
//           }, 300);
//         } else {
//           // Reset to the true original center position
//           activeCard.style.transform = `translateX(-50%)`;
//         }
  
//         activeCard = null;
//       };
  
//       cards.forEach((card) => {
//         card.addEventListener("mousedown", handleStart);
//         card.addEventListener("mousemove", handleMove);
//         card.addEventListener("mouseup", handleEnd);
//         card.addEventListener("mouseleave", handleEnd);
//         card.addEventListener("touchstart", handleStart);
//         card.addEventListener("touchmove", handleMove);
//         card.addEventListener("touchend", handleEnd);
  
//         // Clean up event listeners on component unmount
//         return () => {
//           card.removeEventListener("mousedown", handleStart);
//           card.removeEventListener("mousemove", handleMove);
//           card.removeEventListener("mouseup", handleEnd);
//           card.removeEventListener("mouseleave", handleEnd);
//           card.removeEventListener("touchstart", handleStart);
//           card.removeEventListener("touchmove", handleMove);
//           card.removeEventListener("touchend", handleEnd);
//         };
//       });
//     }
//   }, [workouts]);
  

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <div className="workout" ref={workoutContainerRef}>
//       <div className="floating-button" onClick={handleOpenDialog}>
//         <span>Exit</span>
//       </div>

//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Are you sure you want to leave?</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             If you leave, any unsaved changes will be lost.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>No</Button>
//           <Button color="primary" onClick={() => router.back()} autoFocus>
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <div className="workout--cards">
//         {workouts.length > 0 ? (
//           workouts.map((workout, index) => (
//             <Card
//               className="workout--card"
//               key={index}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 width: "300px",
//                 margin: "10px",
//                 zIndex: workouts.length - index,
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 image={workout.gifUrl || "https://placeimg.com/600/300/tech"}
//                 alt={workout.name}
//               />
//               <CardContent>
//                 <Typography variant="h5" component="div">
//                   {workout.name}
//                 </Typography>
//                 <Divider style={{ margin: "10px 0" }} />
//                 <Typography variant="body2" color="text.secondary">
//                   <strong>Body Part:</strong> {workout.bodyPart}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   <strong>Target:</strong> {workout.target}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   <strong>Secondary Muscles:</strong>{" "}
//                   {workout.secondaryMuscles.join(", ")}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   <strong>Equipment:</strong> {workout.equipment}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Typography>No workouts available.</Typography>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Workout;






































"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import "./swipestyle.css";

const Workout = () => {
  const router = useRouter();
  const workoutContainerRef = useRef(null);
  const [workouts, setWorkouts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch("http://3.107.192.183:5006/workout/suggest-exercises/random");
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data.suggested_exercises);
      } else {
        console.error("Failed to fetch workouts");
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const workoutElement = document.querySelector(".workout");
      if (workoutElement) {
        workoutElement.classList.add("loaded");
      }
    }
  }, []);

  useEffect(() => {
    if (workouts == []) {
      fetchWorkouts();
    }
    const cards = workoutContainerRef.current?.querySelectorAll(".workout--card");
    let activeCard = null;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    if (cards) {
      const handleStart = (e) => {
        if (isDragging) return;
        activeCard = e.currentTarget;
        startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
        isDragging = true;
        activeCard.style.transition = "none";
      };

      const handleMove = (e) => {
        if (!isDragging || !activeCard) return;
        currentX = (e.type.includes("mouse") ? e.clientX : e.touches[0].clientX) - startX;
        activeCard.style.transform = `translateX(calc(-50% + ${currentX}px))`;
      };

      const handleEnd = () => {
        if (!isDragging || !activeCard) return;
        isDragging = false;
        activeCard.style.transition = "transform 0.3s ease-out";

        if (currentX > 100) {
          activeCard.style.transform = `translateX(100vw)`;
          setTimeout(() => {
            setWorkouts((prev) => prev.filter((_, i) => i !== Array.from(cards).indexOf(activeCard)));
            activeCard = null;
          }, 300);
        } else if (currentX < -100) {
          activeCard.style.transform = `translateX(-200vw)`;
          setTimeout(() => {
            setWorkouts((prev) => prev.filter((_, i) => i !== Array.from(cards).indexOf(activeCard)));
            activeCard = null;
          }, 300);
        } else {
          activeCard.style.transform = `translateX(-50%)`;
        }

        activeCard = null;
      };

      cards.forEach((card) => {
        card.addEventListener("mousedown", handleStart);
        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseup", handleEnd);
        card.addEventListener("mouseleave", handleEnd);
        card.addEventListener("touchstart", handleStart);
        card.addEventListener("touchmove", handleMove);
        card.addEventListener("touchend", handleEnd);

        return () => {
          card.removeEventListener("mousedown", handleStart);
          card.removeEventListener("mousemove", handleMove);
          card.removeEventListener("mouseup", handleEnd);
          card.removeEventListener("mouseleave", handleEnd);
          card.removeEventListener("touchstart", handleStart);
          card.removeEventListener("touchmove", handleMove);
          card.removeEventListener("touchend", handleEnd);
        };
      });
    }
  }, [workouts]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="workout" ref={workoutContainerRef}>
      <IconButton
        className="close-button"
        onClick={handleOpenDialog}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure you want to leave?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you leave, any unsaved changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button color="primary" onClick={() => router.back()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <div className="workout--cards">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <Card
              className="workout--card"
              key={index}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "300px",
                margin: "10px",
                zIndex: workouts.length - index,
              }}
            >
              <CardMedia
                component="img"
                image={workout.gifUrl || "https://placeimg.com/600/300/tech"}
                alt={workout.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {workout.name}
                </Typography>
                <Divider style={{ margin: "10px 0" }} />
                <Typography variant="body2" color="text.secondary">
                  <strong>Body Part:</strong> {workout.bodyPart}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Target:</strong> {workout.target}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Secondary Muscles:</strong>{" "}
                  {workout.secondaryMuscles.join(", ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Equipment:</strong> {workout.equipment}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No workouts available.</Typography>
        )}
      </div>
    </div>
  );
};

export default Workout;
