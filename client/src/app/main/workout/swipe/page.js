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
} from "@mui/material";
import { useRouter } from "next/navigation";
import "./swipestyle.css";

const Workout = () => {
  const router = useRouter();
  const workoutContainerRef = useRef(null);
  const [workouts, setWorkouts] = useState([
    {
      bodyPart: "back",
      equipment: "cable",
      gifUrl: "https://v2.exercisedb.io/image/8PGpzBGvMcRA5z",
      id: "0007",
      name: "alternate lateral pulldown",
      target: "lats",
      secondaryMuscles: ["biceps", "rhomboids"],
      instructions: [
        "Sit on the cable machine with your back straight and feet flat on the ground.",
        "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
        "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
        "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
        "Repeat for the desired number of repetitions.",
      ],
    },
    {
      bodyPart: "back",
      equipment: "body weight",
      gifUrl: "https://v2.exercisedb.io/image/7Y7KA8xSAskhxX",
      id: "3293",
      name: "archer pull up",
      target: "lats",
      secondaryMuscles: ["biceps", "forearms"],
      instructions: [
        "Start by hanging from a pull-up bar with an overhand grip, slightly wider than shoulder-width apart.",
        "Engage your core and pull your shoulder blades down and back.",
        "As you pull yourself up, bend one arm and bring your elbow towards your side, while keeping the other arm straight.",
        "Continue pulling until your chin is above the bar and your bent arm is fully flexed.",
        "Lower yourself back down with control, straightening the bent arm and repeating the movement on the other side.",
        "Alternate sides with each repetition.",
      ],
    },
    {
      bodyPart: "back",
      equipment: "leverage machine",
      gifUrl: "https://v2.exercisedb.io/image/GCeT-LOdYDXZEp",
      id: "0015",
      name: "assisted parallel close grip pull-up",
      target: "lats",
      secondaryMuscles: ["biceps", "forearms"],
      instructions: [
        "Adjust the machine to your desired weight and height.",
        "Place your hands on the parallel bars with a close grip, palms facing each other.",
        "Hang from the bars with your arms fully extended and your feet off the ground.",
        "Engage your back muscles and pull your body up towards the bars, keeping your elbows close to your body.",
        "Continue pulling until your chin is above the bars.",
        "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
        "Repeat for the desired number of repetitions.",
      ],
    },
    {
      bodyPart: "back",
      equipment: "leverage machine",
      gifUrl: "https://v2.exercisedb.io/image/E2l1DL4NRFPwvA",
      id: "0017",
      name: "assisted pull-up",
      target: "lats",
      secondaryMuscles: ["biceps", "forearms"],
      instructions: [
        "Adjust the machine to your desired weight and height settings.",
        "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
        "Hang with your arms fully extended and your feet off the ground.",
        "Engage your back muscles and pull your body up towards the handles, keeping your elbows close to your body.",
        "Continue pulling until your chin is above the handles.",
        "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
        "Repeat for the desired number of repetitions.",
      ],
    },
    {
      bodyPart: "back",
      equipment: "leverage machine",
      gifUrl: "https://v2.exercisedb.io/image/OygIOPnGN-kp34",
      id: "1431",
      name: "assisted standing chin-up",
      target: "lats",
      secondaryMuscles: ["biceps", "forearms"],
      instructions: [
        "Adjust the machine to your desired assistance level.",
        "Stand on the foot platform and grip the handles with an overhand grip, slightly wider than shoulder-width apart.",
        "Keep your chest up and shoulders back, engage your core, and slightly bend your knees.",
        "Pull your body up by flexing your elbows and driving your elbows down towards your sides.",
        "Continue pulling until your chin is above the bar.",
        "Pause for a moment at the top, then slowly lower your body back down to the starting position.",
        "Repeat for the desired number of repetitions.",
      ],
    },
    {
      bodyPart: "back",
      equipment: "leverage machine",
      gifUrl: "https://v2.exercisedb.io/image/-fp8koKewu4mAW",
      id: "1432",
      name: "assisted standing pull-up",
      target: "lats",
      secondaryMuscles: ["biceps", "forearms"],
      instructions: [
        "Adjust the machine to your desired weight and height settings.",
        "Stand facing the machine with your feet shoulder-width apart.",
        "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
        "Engage your lats and biceps, and pull yourself up towards the handles.",
        "Pause for a moment at the top, squeezing your back muscles.",
        "Slowly lower yourself back down to the starting position.",
        "Repeat for the desired number of repetitions.",
      ],
    },
    {
      bodyPart: "back",
      equipment: "stability ball",
      gifUrl: "https://v2.exercisedb.io/image/jx09sUmoUY9kj1",
      id: "1314",
      name: "back extension on exercise ball",
      target: "spine",
      secondaryMuscles: ["glutes", "hamstrings"],
      instructions: [
        "Place the stability ball on the ground and lie face down on top of it, with your hips resting on the ball and your feet against a wall or other stable surface.",
        "Position your hands behind your head or crossed over your chest.",
        "Engage your core and slowly lift your upper body off the ball, extending your back until your body forms a straight line from your head to your heels.",
        "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
        "Repeat for the desired number of repetitions.",
      ],
    },
    {
      bodyPart: "back",
      equipment: "body weight",
      gifUrl: "https://v2.exercisedb.io/image/rjsuja77b3F5Ld",
      id: "3297",
      name: "back lever",
      target: "upper back",
      secondaryMuscles: ["biceps", "forearms", "core"],
      instructions: [
        "Start by hanging from a pull-up bar with an overhand grip, hands slightly wider than shoulder-width apart.",
        "Engage your core and pull your shoulder blades down and back.",
        "Bend your knees and tuck them towards your chest.",
        "Slowly lift your legs up, keeping them straight, until your body is parallel to the ground.",
        "Hold this position for a few seconds, then slowly lower your legs back down to the starting position.",
        "Repeat for the desired number of repetitions.",
      ],
    },
    {
      bodyPart: "back",
      equipment: "body weight",
      gifUrl: "https://v2.exercisedb.io/image/HIjgJgR8pNWN1i",
      id: "1405",
      name: "back pec stretch",
      target: "lats",
      secondaryMuscles: ["shoulders", "chest"],
      instructions: [
        "Stand tall with your feet shoulder-width apart.",
        "Extend your arms straight out in front of you, parallel to the ground.",
        "Cross your arms in front of your body, with your right arm over your left arm.",
        "Interlock your fingers and rotate your palms away from your body.",
        "Slowly raise your arms up and away from your body, feeling a stretch in your back and chest.",
        "Hold the stretch for 15-30 seconds, then release.",
        "Repeat on the opposite side.",
      ],
    },
    {
      bodyPart: "back",
      equipment: "band",
      gifUrl: "https://v2.exercisedb.io/image/2hvLLJZU00B19G",
      id: "0970",
      name: "band assisted pull-up",
      target: "lats",
      secondaryMuscles: ["biceps", "forearms"],
      instructions: [
        "Attach the band to a pull-up bar or sturdy anchor point.",
        "Step onto the band and grip the bar with your palms facing away from you, hands slightly wider than shoulder-width apart.",
        "Hang with your arms fully extended, keeping your core engaged and your shoulders down and back.",
        "Pull your body up towards the bar by squeezing your shoulder blades together and driving your elbows down towards your hips.",
        "Continue pulling until your chin is above the bar, then slowly lower yourself back down to the starting position.",
        "Repeat for the desired number of repetitions.",
      ],
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    if (typeof document !== "undefined") {
      const workoutElement = document.querySelector(".workout");
      if (workoutElement) {
        workoutElement.classList.add("loaded");
      }
    }
  }, []);

  useEffect(() => {
    const cards = workoutContainerRef.current?.querySelectorAll(".workout--card");
    let activeCard = null;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
  
    if (cards) {
      const handleStart = (e) => {
        if (isDragging) return; // Only allow one active drag
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
          // Swiped right
          activeCard.style.transform = `translateX(100vw)`;
          setTimeout(() => {
            setWorkouts((prev) => prev.filter((_, i) => i !== Array.from(cards).indexOf(activeCard)));
            activeCard = null;
          }, 300);
        } else if (currentX < -100) {
          // Swiped left
          activeCard.style.transform = `translateX(-100vw)`;
          setTimeout(() => {
            setWorkouts((prev) => prev.filter((_, i) => i !== Array.from(cards).indexOf(activeCard)));
            activeCard = null;
          }, 300);
        } else {
          // Reset to the true original center position
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
  
        // Clean up event listeners on component unmount
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
      <div className="floating-button" onClick={handleOpenDialog}>
        <span>Exit</span>
      </div>

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
