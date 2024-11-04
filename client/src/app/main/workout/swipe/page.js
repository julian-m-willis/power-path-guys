// "use client";

// import React, { useEffect, useRef, useState } from 'react';
// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/navigation';
// import './swipestyle.css';

// const Hammer = dynamic(() => import('hammerjs').then((mod) => mod.default || mod), { ssr: false });

// const Workout = () => {
//     const router = useRouter();
//     const [cards, setCards] = useState(Array.from({ length: 5 }, (_, index) => index));
//     const workoutContainerRef = useRef(null);
//     const [isHovered, setIsHovered] = useState(false);

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

//     const backButton = () => {
//         router.back();
//     };

//     useEffect(() => {
//         initCards();

//         if (typeof window !== 'undefined' && Hammer) {
//             const cardsElements = workoutContainerRef.current.querySelectorAll('.workout--card');
//             cardsElements.forEach((el) => {
//                 const hammertime = new Hammer(el);
//                 if (hammertime && typeof hammertime.on === 'function') {
//                     hammertime.on('pan', handlePan);
//                     hammertime.on('panend', handlePanEnd);
//                 }
//             });
//         }
//     }, [cards]);

//     return (
//         <div className="workout" ref={workoutContainerRef}>
//             <div
//                 style={{
//                     position: 'fixed',
//                     top: '16px', // Adjusted for slight shift upwards
//                     right: '16px', // Adjusted for slight shift to the right
//                     cursor: 'pointer',
//                     zIndex: 10,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     width: '44px', // Container size adjusted
//                     height: '48px',
//                     borderRadius: '50%',
//                     backgroundColor: isHovered ? 'rgba(128, 128, 128, 0.1)' : 'transparent',
//                     transition: 'background-color 0.3s ease',
//                 }}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 onClick={backButton}
//             >
//                 <span
//                     style={{
//                         position: 'relative',
//                         display: 'block',
//                         width: '20px', // Size of cross
//                         height: '24px',
//                     }}
//                 >
//                     <span
//                         style={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             width: '20px',
//                             height: '2px', // Thinner line for lighter appearance
//                             backgroundColor: 'grey',
//                             opacity: 0.8, // Lower opacity for a lighter look
//                             transform: 'translate(-50%, -50%) rotate(45deg)',
//                             transformOrigin: 'center',
//                         }}
//                     ></span>
//                     <span
//                         style={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             width: '20px',
//                             height: '2px', // Thinner line for lighter appearance
//                             backgroundColor: 'grey',
//                             opacity: 0.8, // Lower opacity for a lighter look
//                             transform: 'translate(-50%, -50%) rotate(-45deg)',
//                             transformOrigin: 'center',
//                         }}
//                     ></span>
//                 </span>
//             </div>

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
// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/navigation';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
// import './swipestyle.css';

// const Hammer = dynamic(() => import('hammerjs').then((mod) => mod.default || mod), { ssr: false });

// const Workout = () => {
//     const router = useRouter();
//     const [cards, setCards] = useState(Array.from({ length: 5 }, (_, index) => index));
//     const workoutContainerRef = useRef(null);
//     const [isHovered, setIsHovered] = useState(false);
//     const [openDialog, setOpenDialog] = useState(false); // State for controlling the dialog

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
//         setOpenDialog(true); // Open the confirmation dialog
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false); // Close the confirmation dialog
//     };

//     const handleConfirmLeave = () => {
//         setOpenDialog(false); // Close the dialog and navigate back
//         router.back();
//     };

//     useEffect(() => {
//         initCards();

//         if (typeof window !== 'undefined' && Hammer) {
//             const cardsElements = workoutContainerRef.current.querySelectorAll('.workout--card');
//             cardsElements.forEach((el) => {
//                 const hammertime = new Hammer(el);
//                 if (hammertime && typeof hammertime.on === 'function') {
//                     hammertime.on('pan', handlePan);
//                     hammertime.on('panend', handlePanEnd);
//                 }
//             });
//         }
//     }, [cards]);

//     return (
//         <div className="workout" ref={workoutContainerRef}>
//             <div
//                 style={{
//                     position: 'fixed',
//                     top: '16px',
//                     right: '16px',
//                     cursor: 'pointer',
//                     zIndex: 10,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     width: '48px',
//                     height: '48px',
//                     borderRadius: '50%',
//                     backgroundColor: isHovered ? 'rgba(128, 128, 128, 0.1)' : 'transparent',
//                     transition: 'background-color 0.3s ease',
//                 }}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 onClick={handleOpenDialog} // Open dialog on button click
//             >
//                 <span
//                     style={{
//                         position: 'relative',
//                         display: 'block',
//                         width: '24px',
//                         height: '24px',
//                     }}
//                 >
//                     <span
//                         style={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             width: '20px',
//                             height: '2px',
//                             backgroundColor: 'grey',
//                             opacity: 0.8,
//                             transform: 'translate(-50%, -50%) rotate(45deg)',
//                             transformOrigin: 'center',
//                         }}
//                     ></span>
//                     <span
//                         style={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             width: '20px',
//                             height: '2px',
//                             backgroundColor: 'grey',
//                             opacity: 0.8,
//                             transform: 'translate(-50%, -50%) rotate(-45deg)',
//                             transformOrigin: 'center',
//                         }}
//                     ></span>
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
//                     <Button onClick={handleCloseDialog} style={{ color: '#8e3aac' }}>
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
// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/navigation';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
// import './swipestyle.css';

// const Hammer = dynamic(() => import('hammerjs').then((mod) => mod.default || mod), { ssr: false });

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

//         if (typeof window !== 'undefined' && Hammer) {
//             const cardsElements = workoutContainerRef.current.querySelectorAll('.workout--card');
//             cardsElements.forEach((el) => {
//                 const hammertime = new Hammer(el);
//                 if (hammertime && typeof hammertime.on === 'function') {
//                     hammertime.on('pan', handlePan);
//                     hammertime.on('panend', handlePanEnd);
//                 }
//             });
//         }
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































































"use client";

import React, { useEffect, useRef, useState } from 'react';
import Hammer from 'hammerjs'; // Directly import Hammer
import { useRouter } from 'next/navigation';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import './swipestyle.css';

const Workout = () => {
    const router = useRouter();
    const [cards, setCards] = useState(Array.from({ length: 5 }, (_, index) => index));
    const workoutContainerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const initCards = () => {
        const newCards = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
        newCards.forEach((card, index) => {
            card.style.zIndex = cards.length - index;
            card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
            card.style.opacity = (10 - index) / 10;
        });
        workoutContainerRef.current.classList.add('loaded');
    };

    const handleSwipe = (direction) => {
        const cardsArray = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
        if (cardsArray.length === 0) return;

        const card = cardsArray[0];
        card.classList.add('removed');

        const moveOutWidth = document.body.clientWidth * 1.5;
        card.style.transform = direction === 'left'
            ? `translate(-${moveOutWidth}px, -100px) rotate(-30deg)`
            : `translate(${moveOutWidth}px, -100px) rotate(30deg)`;

        setCards((prevCards) => prevCards.slice(1));
        initCards();
    };

    const handlePan = (event) => {
        const cardsArray = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
        if (cardsArray.length === 0 || event.target !== cardsArray[0]) return;

        const card = event.target;
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
        workoutContainerRef.current.classList.toggle('tinder_love', event.deltaX > 0);
        workoutContainerRef.current.classList.toggle('tinder_nope', event.deltaX < 0);
    };

    const handlePanEnd = (event) => {
        const cardsArray = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
        if (cardsArray.length === 0 || event.target !== cardsArray[0]) return;

        const card = event.target;
        workoutContainerRef.current.classList.remove('tinder_love', 'tinder_nope');

        const moveOutWidth = document.body.clientWidth;
        const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        if (keep) {
            card.style.transform = '';
        } else {
            const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
            const toX = event.deltaX > 0 ? endX : -endX;
            const endY = Math.abs(event.velocityY) * moveOutWidth;
            const toY = event.deltaY > 0 ? endY : -endY;

            card.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${event.deltaX * 0.03 * event.deltaY / 80}deg)`;
            handleSwipe(event.deltaX > 0 ? 'right' : 'left');
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

    useEffect(() => {
        initCards();

        const hammers = []; // Store Hammer instances here
        const cardsElements = workoutContainerRef.current.querySelectorAll('.workout--card');

        cardsElements.forEach((el) => {
            const hammertime = new Hammer(el); // Create Hammer instance for each card
            hammertime.on('pan', handlePan);
            hammertime.on('panend', handlePanEnd);
            hammers.push(hammertime); // Store the instance for cleanup
        });

        return () => {
            // Cleanup Hammer instances
            hammers.forEach((hammertime) => {
                hammertime.off('pan', handlePan);
                hammertime.off('panend', handlePanEnd);
            });
        };
    }, [cards]);

    return (
        <div className="workout" ref={workoutContainerRef}>
            <div
                className={`floating-button ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleOpenDialog}
            >
                <span className="icon-container">
                    <span className="icon-line rotate45"></span>
                    <span className="icon-line rotate-45"></span>
                </span>
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Are you sure you want to leave?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you leave, any unsaved changes will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} className="cancel-button">
                        No
                    </Button>
                    <Button onClick={handleConfirmLeave} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="workout--status">
                <i className="fa fa-remove"></i>
                <i className="fa fa-heart"></i>
            </div>
            <div className="workout--cards">
                {cards.map((index) => (
                    <div className="workout--card" key={index}>
                        <img src={`https://placeimg.com/600/300/${index % 2 === 0 ? 'people' : 'nature'}`} alt={`Demo card ${index + 1}`} />
                        <h3>Demo card {index + 1}</h3>
                        <p>This is a demo for Tinder-like swipe cards</p>
                    </div>
                ))}
            </div>
            <div className="workout--buttons">
                <button onClick={() => handleSwipe('left')} id="nope"><i className="fa fa-remove"></i> Nope</button>
                <button onClick={() => handleSwipe('right')} id="love"><i className="fa fa-heart"></i> Love</button>
            </div>
        </div>
    );
};

export default Workout;
