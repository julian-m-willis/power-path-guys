// // NO ANIMATION

"use client"; // This line enables the component to use hooks

import React, { useEffect, useRef, useState } from 'react';
import Hammer from 'hammerjs'; // Import Hammer.js
import './swipestyle.css';

const Workout = () => {
    const [cards, setCards] = useState(Array.from({ length: 5 }, (_, index) => index));
    const workoutContainerRef = useRef(null);
    const isSwiping = useRef(false); // Use a ref to track if a swipe is in progress

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
        const cardsArray = document.querySelectorAll('.workout--card:not(.removed)');
        if (cardsArray.length === 0 || isSwiping.current) return; // Prevent swiping if already swiping

        const card = cardsArray[0];
        card.classList.add('removed');

        const moveOutWidth = document.body.clientWidth * 1.5;
        card.style.transform = direction === 'left'
            ? `translate(-${moveOutWidth}px, -100px) rotate(-30deg)`
            : `translate(${moveOutWidth}px, -100px) rotate(30deg)`;

        // Update cards state
        setCards((prevCards) => prevCards.slice(1)); // Remove the first card from the array
        initCards();
        isSwiping.current = false; // Reset the swiping state
    };

    const handlePan = (event) => {
        const card = event.target;
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
        workoutContainerRef.current.classList.toggle('tinder_love', event.deltaX > 0);
        workoutContainerRef.current.classList.toggle('tinder_nope', event.deltaX < 0);
    };

    const handlePanEnd = (event) => {
        const card = event.target;
        workoutContainerRef.current.classList.remove('tinder_love', 'tinder_nope');

        const moveOutWidth = document.body.clientWidth;
        const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        if (keep) {
            card.style.transform = ''; // Reset the position
        } else {
            isSwiping.current = true; // Set swiping state to true
            const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
            const toX = event.deltaX > 0 ? endX : -endX;
            const endY = Math.abs(event.velocityY) * moveOutWidth;
            const toY = event.deltaY > 0 ? endY : -endY;

            card.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${event.deltaX * 0.03 * event.deltaY / 80}deg)`;
            handleSwipe(event.deltaX > 0 ? 'right' : 'left'); // Trigger swipe function
        }
    };

    useEffect(() => {
        initCards();

        // Add Hammer.js support for swipe gestures
        const cardsElements = workoutContainerRef.current.querySelectorAll('.workout--card');
        cardsElements.forEach((el) => {
            const hammertime = new Hammer(el);
            hammertime.on('pan', handlePan);
            hammertime.on('panend', handlePanEnd);
        });
    }, [cards]);

    return (
        <div className="workout" ref={workoutContainerRef}>
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















