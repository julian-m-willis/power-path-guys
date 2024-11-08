// "use client";

// import React, { useEffect, useRef, useState } from 'react';
// import Hammer from 'hammerjs'; // Directly import Hammer
// import { useRouter } from 'next/navigation';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
// import './swipestyle.css';

// const Workout = () => {
//     const router = useRouter();
//     const [cards, setCards] = useState(Array.from({ length: 5 }, (_, index) => index));
//     const workoutContainerRef = useRef(null);
//     const [isHovered, setIsHovered] = useState(false);
//     const [openDialog, setOpenDialog] = useState(false);

//     const initCards = () => {
//         const newCards = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
//         newCards.forEach((card, index) => {
//             card.style.zIndex = cards.length - index;
//             card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
//             card.style.opacity = (10 - index) / 10;
//         });
//         workoutContainerRef.current.classList.add('loaded');
//     };

//     const handleSwipe = (direction) => {
//         const cardsArray = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
//         if (cardsArray.length === 0) return;

//         const card = cardsArray[0];
//         card.classList.add('removed');

//         const moveOutWidth = document.body.clientWidth * 1.5;
//         card.style.transform = direction === 'left'
//             ? `translate(-${moveOutWidth}px, -100px) rotate(-30deg)`
//             : `translate(${moveOutWidth}px, -100px) rotate(30deg)`;

//         setCards((prevCards) => prevCards.slice(1));
//         initCards();
//     };

//     const handlePan = (event) => {
//         const cardsArray = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
//         if (cardsArray.length === 0 || event.target !== cardsArray[0]) return;

//         const card = event.target;
//         const xMulti = event.deltaX * 0.03;
//         const yMulti = event.deltaY / 80;
//         const rotate = xMulti * yMulti;

//         card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
//         workoutContainerRef.current.classList.toggle('tinder_love', event.deltaX > 0);
//         workoutContainerRef.current.classList.toggle('tinder_nope', event.deltaX < 0);
//     };

//     const handlePanEnd = (event) => {
//         const cardsArray = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
//         if (cardsArray.length === 0 || event.target !== cardsArray[0]) return;

//         const card = event.target;
//         workoutContainerRef.current.classList.remove('tinder_love', 'tinder_nope');

//         const moveOutWidth = document.body.clientWidth;
//         const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

//         if (keep) {
//             card.style.transform = '';
//         } else {
//             const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
//             const toX = event.deltaX > 0 ? endX : -endX;
//             const endY = Math.abs(event.velocityY) * moveOutWidth;
//             const toY = event.deltaY > 0 ? endY : -endY;

//             card.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${event.deltaX * 0.03 * event.deltaY / 80}deg)`;
//             handleSwipe(event.deltaX > 0 ? 'right' : 'left');
//         }
//     };

//     const handleOpenDialog = () => {
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//     };

//     const handleConfirmLeave = () => {
//         setOpenDialog(false);
//         router.back();
//     };

//     useEffect(() => {
//         initCards();

//         const hammers = []; // Store Hammer instances here
//         const cardsElements = workoutContainerRef.current.querySelectorAll('.workout--card');

//         cardsElements.forEach((el) => {
//             const hammertime = new Hammer(el); // Create Hammer instance for each card
//             hammertime.on('pan', handlePan);
//             hammertime.on('panend', handlePanEnd);
//             hammers.push(hammertime); // Store the instance for cleanup
//         });

//         return () => {
//             // Cleanup Hammer instances
//             hammers.forEach((hammertime) => {
//                 hammertime.off('pan', handlePan);
//                 hammertime.off('panend', handlePanEnd);
//             });
//         };
//     }, [cards]);

//     return (
//         <div className="workout" ref={workoutContainerRef}>
//             <div
//                 className={`floating-button ${isHovered ? 'hovered' : ''}`}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 onClick={handleOpenDialog}
//             >
//                 <span className="icon-container">
//                     <span className="icon-line rotate45"></span>
//                     <span className="icon-line rotate-45"></span>
//                 </span>
//             </div>

//             {/* Confirmation Dialog */}
//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>Are you sure you want to leave?</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         If you leave, any unsaved changes will be lost.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog} className="cancel-button">
//                         No
//                     </Button>
//                     <Button onClick={handleConfirmLeave} color="primary" autoFocus>
//                         Yes
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <div className="workout--status">
//                 <i className="fa fa-remove"></i>
//                 <i className="fa fa-heart"></i>
//             </div>
//             <div className="workout--cards">
//                 {cards.map((index) => (
//                     <div className="workout--card" key={index}>
//                         <img src={`https://placeimg.com/600/300/${index % 2 === 0 ? 'people' : 'nature'}`} alt={`Demo card ${index + 1}`} />
//                         <h3>Demo card {index + 1}</h3>
//                         <p>This is a demo for Tinder-like swipe cards</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="workout--buttons">
//                 <button onClick={() => handleSwipe('left')} id="nope"><i className="fa fa-remove"></i> Nope</button>
//                 <button onClick={() => handleSwipe('right')} id="love"><i className="fa fa-heart"></i> Love</button>
//             </div>
//         </div>
//     );
// };

// export default Workout;









































// "use client";

// import React, { useEffect, useRef, useState } from 'react';
// import Hammer from 'hammerjs';
// import { useRouter } from 'next/navigation';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
// import './swipestyle.css';

// const Workout = () => {
//     const router = useRouter();
//     const [cards, setCards] = useState(Array.from({ length: 5 }, (_, index) => index));
//     const workoutContainerRef = useRef(null);
//     const [swipeRightCount, setSwipeRightCount] = useState(0);
//     const [openDialog, setOpenDialog] = useState(false);

//     const initCards = () => {
//         const newCards = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
//         newCards.forEach((card, index) => {
//             card.style.zIndex = cards.length - index;
//             card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
//             card.style.opacity = (10 - index) / 10;
//         });
//         workoutContainerRef.current.classList.add('loaded');
//     };

//     const handleSwipe = (direction) => {
//         const cardsArray = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
//         if (cardsArray.length === 0) return;

//         const card = cardsArray[0];
//         card.classList.add('removed');

//         const moveOutWidth = document.body.clientWidth * 1.5;
//         card.style.transform = direction === 'left'
//             ? `translate(-${moveOutWidth}px, -100px) rotate(-30deg)`
//             : `translate(${moveOutWidth}px, -100px) rotate(30deg)`;

//         if (direction === 'right') {
//             setSwipeRightCount(prevCount => prevCount + 1);
//         }

//         setCards((prevCards) => prevCards.slice(1));
//         initCards();
//     };

//     useEffect(() => {
//         if (swipeRightCount >= 3) {
//             setOpenDialog(true);
//         }
//     }, [swipeRightCount]);

//     const handlePan = (event) => {
//         const cardsArray = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
//         if (cardsArray.length === 0 || event.target !== cardsArray[0]) return;

//         const card = event.target;
//         const xMulti = event.deltaX * 0.03;
//         const yMulti = event.deltaY / 80;
//         const rotate = xMulti * yMulti;

//         card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
//         workoutContainerRef.current.classList.toggle('tinder_love', event.deltaX > 0);
//         workoutContainerRef.current.classList.toggle('tinder_nope', event.deltaX < 0);
//     };

//     const handlePanEnd = (event) => {
//         const cardsArray = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
//         if (cardsArray.length === 0 || event.target !== cardsArray[0]) return;

//         const card = event.target;
//         workoutContainerRef.current.classList.remove('tinder_love', 'tinder_nope');

//         const moveOutWidth = document.body.clientWidth;
//         const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

//         if (keep) {
//             card.style.transform = '';
//         } else {
//             const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
//             const toX = event.deltaX > 0 ? endX : -endX;
//             const endY = Math.abs(event.velocityY) * moveOutWidth;
//             const toY = event.deltaY > 0 ? endY : -endY;

//             card.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${event.deltaX * 0.03 * event.deltaY / 80}deg)`;
//             handleSwipe(event.deltaX > 0 ? 'right' : 'left');
//         }
//     };

//     const handleConfirm = () => {
//         setOpenDialog(false);
//         router.push('/your-confirmation-page'); // Replace with your target path
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setSwipeRightCount(0); // Reset the swipe counter if "No" is clicked
//     };

//     useEffect(() => {
//         initCards();

//         const hammers = [];
//         const cardsElements = workoutContainerRef.current.querySelectorAll('.workout--card');

//         cardsElements.forEach((el) => {
//             const hammertime = new Hammer(el);
//             hammertime.on('pan', handlePan);
//             hammertime.on('panend', handlePanEnd);
//             hammers.push(hammertime);
//         });

//         return () => {
//             hammers.forEach((hammertime) => {
//                 hammertime.off('pan', handlePan);
//                 hammertime.off('panend', handlePanEnd);
//             });
//         };
//     }, [cards]);

//     return (
//         <div className="workout" ref={workoutContainerRef}>
//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>This is the list of workouts</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Do you want to confirm your workout?
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog}>No</Button>
//                     <Button onClick={handleConfirm} color="primary" autoFocus>
//                         Yes
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <div className="workout--status">
//                 <i className="fa fa-remove"></i>
//                 <i className="fa fa-heart"></i>
//             </div>
//             <div className="workout--cards">
//                 {cards.map((index) => (
//                     <div className="workout--card" key={index}>
//                         <img src={`https://placeimg.com/600/300/${index % 2 === 0 ? 'people' : 'nature'}`} alt={`Demo card ${index + 1}`} />
//                         <h3>Demo card {index + 1}</h3>
//                         <p>This is a demo for Tinder-like swipe cards</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="workout--buttons">
//                 <button onClick={() => handleSwipe('left')} id="nope"><i className="fa fa-remove"></i> Nope</button>
//                 <button onClick={() => handleSwipe('right')} id="love"><i className="fa fa-heart"></i> Love</button>
//             </div>
//         </div>
//     );
// };

// export default Workout;














































































































































// "use client";

// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import { Card, CardContent, CardMedia, Typography, Divider, CircularProgress } from "@mui/material";

// const Workout = () => {
//     const searchParams = useSearchParams();
//     const [workouts, setWorkouts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [theme, setTheme] = useState(null);

//     useEffect(() => {
//         const themeFromQuery = searchParams.get("theme");
//         console.log("Theme from query:", themeFromQuery); // Log the theme

//         if (themeFromQuery) {
//             setTheme(themeFromQuery);

//             // Fetch workouts data if theme exists
//             axios.get(`http://3.107.192.183:5006/workout/suggest-exercises/${themeFromQuery}`)
//                 .then((response) => {
//                     console.log("Fetched full response:", response); // Log the entire response
//                     console.log("Fetched response data:", response.data); // Log the data portion

//                     // Check if response.data is an array
//                     if (Array.isArray(response.data.suggested_exercises)) {
//                         // If the data is an array, set it to state
//                         setWorkouts(response.data.suggested_exercises);
//                     } else {
//                         console.error("Fetched data does not contain a valid array of exercises:", response.data);
//                         setWorkouts([]); // Set workouts as an empty array if the data is not valid
//                     }

//                     setLoading(false); // Set loading to false once data is fetched
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching workouts:', error);
//                     setWorkouts([]); // Set workouts as an empty array in case of error
//                     setLoading(false); // Set loading to false even in case of an error
//                 });
//         } else {
//             console.log("No theme parameter in query.");
//         }
//     }, [searchParams]); // Re-run effect when query parameters change

//     if (loading) {
//         return <div><CircularProgress /></div>;
//     }

//     return (
//         <div className="workout">
//             <div className="workout--status">
//                 <i className="fa fa-remove"></i>
//                 <i className="fa fa-heart"></i>
//             </div>
//             <div className="workout--cards">
//                 {/* Ensure workouts is an array before calling map */}
//                 {Array.isArray(workouts) && workouts.length > 0 ? (
//                     workouts.map((workout, index) => (
//                         <Card key={index} sx={{ maxWidth: 345, marginBottom: 2 }}>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image={workout.gifUrl || 'https://placeimg.com/600/300/tech'}
//                                 alt={`Gif for ${workout.name}`}
//                             />
//                             <CardContent>
//                                 <Typography variant="h6" component="div">
//                                     {workout.name}
//                                 </Typography>
//                                 <Divider sx={{ my: 1 }} />
//                                 <Typography variant="body2" color="text.secondary">
//                                     <strong>Body Part:</strong> {workout.bodyPart}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     <strong>Target:</strong> {workout.target}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     <strong>Secondary Muscles:</strong> {workout.secondaryMuscles}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     <strong>Equipment:</strong> {workout.equipment}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     <strong>Instructions:</strong> {workout.instructions}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     ))
//                 ) : (
//                     <p>No workouts available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Workout;













































































"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Card, CardContent, CardMedia, Typography, Divider, Button,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import Hammer from "hammerjs";
import { useRouter } from "next/navigation";
import './swipestyle.css';

const Workout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workoutContainerRef = useRef(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const themeFromQuery = searchParams.get("theme");
      if (themeFromQuery) {
        setTheme(themeFromQuery);
        axios
          .get(`http://3.107.192.183:5006/workout/suggest-exercises/${themeFromQuery}`)
          .then((response) => {
            const exercises = Array.isArray(response.data.suggested_exercises) ? response.data.suggested_exercises : [];
            setWorkouts(exercises);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching workouts:", error);
            setWorkouts([]);
            setLoading(false);
          });
      }
    }
  }, [isClient, searchParams]);

  useEffect(() => {
    if (workouts.length > 0 && isClient) {
      const hammers = [];
      const cardsElements = workoutContainerRef.current.querySelectorAll(".workout--card");

      cardsElements.forEach((el) => {
        const hammertime = new Hammer(el);
        hammertime.on("pan", handlePan);
        hammertime.on("panend", handlePanEnd);
        hammers.push(hammertime);
      });

      return () => {
        hammers.forEach((hammertime) => {
          hammertime.off("pan", handlePan);
          hammertime.off("panend", handlePanEnd);
        });
      };
    }
  }, [workouts, isClient]);

  const handleSwipe = (direction) => {
    const cardsArray = workoutContainerRef.current.querySelectorAll(".workout--card:not(.removed)");
    if (cardsArray.length === 0) return;

    const card = cardsArray[0];
    card.classList.add("removed");

    const moveOutWidth = document.body.clientWidth * 1.5;
    card.style.transition = "transform 0.3s ease";  // Add smooth transition
    card.style.transform = direction === "left"
      ? `translate(-${moveOutWidth}px, -100px) rotate(-30deg)`
      : `translate(${moveOutWidth}px, -100px) rotate(30deg)`;

    setWorkouts((prevCards) => prevCards.slice(1));
  };

  const handlePan = (event) => {
    const cardsArray = workoutContainerRef.current.querySelectorAll(".workout--card:not(.removed)");
    if (cardsArray.length === 0 || event.target !== cardsArray[0]) return;

    const card = event.target;
    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    card.style.transition = "none";  // Disable transition during pan
    card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
  };

  const handlePanEnd = (event) => {
    const cardsArray = workoutContainerRef.current.querySelectorAll(".workout--card:not(.removed)");
    if (cardsArray.length === 0 || event.target !== cardsArray[0]) return;

    const card = event.target;
    const moveOutWidth = document.body.clientWidth;
    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    if (keep) {
      card.style.transition = "transform 0.3s ease";  // Enable smooth transition again
      card.style.transform = "";  // Reset transform
    } else {
      const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      const toX = event.deltaX > 0 ? endX : -endX;
      card.style.transition = "transform 0.3s ease";  // Add smooth transition
      card.style.transform = `translate(${toX}px, 0) rotate(${event.deltaX * 0.03}deg)`;
      handleSwipe(event.deltaX > 0 ? "right" : "left");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmLeave = () => {
    setOpenDialog(false);
    router.back();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isClient) {
    return null;
  }

  return (
    <div className="workout" ref={workoutContainerRef}>
      <div className="floating-button" onClick={handleOpenDialog}>
        <span>Exit</span>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure you want to leave?</DialogTitle>
        <DialogContent>
          <DialogContentText>If you leave, any unsaved changes will be lost.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button onClick={handleConfirmLeave} color="primary" autoFocus>Yes</Button>
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
                height="140"
                image={workout.gifUrl || 'https://placeimg.com/600/300/tech'}
                alt={workout.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">{workout.name}</Typography>
                <Divider style={{ margin: '10px 0' }} />
                <Typography variant="body2" color="text.secondary">
                  <strong>Body Part:</strong> {workout.bodyPart}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Target:</strong> {workout.target}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Secondary Muscles:</strong> {workout.secondaryMuscles}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Equipment:</strong> {workout.equipment}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Instructions:</strong> {workout.instructions}
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
