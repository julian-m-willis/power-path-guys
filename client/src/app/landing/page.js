// src/app/landing/page.js
"use client";

import "animate.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Utility function to add animation on scroll
function useAnimateOnScroll(ref, animationClass) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate__animated", animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, animationClass]);
}

// RotatingTextImageCarousel component to display animated text and images in sync
function RotatingTextImageCarousel() {
  const items = [
    { text: "Strength", image: "/images/strength.jpg" },
    { text: "Flexibility", image: "/images/flexible.jpg" },
    { text: "Endurance", image: "/images/endurance.jpg" },
    { text: "Wellness", image: "/images/wellness.jpg" },
    { text: "Motivation", image: "/images/motivation.jpg" },
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  const currentText = items[currentIndex].text;
  const currentImage = items[currentIndex].image;

  return (
    <div className="flex flex-col items-center justify-center animate__animated animate__fadeIn">
      <img
        src={currentImage}
        alt={currentText}
        className="w-150 h-80 mb-4 rounded-lg shadow-lg object-cover"
      />
      <h2 className="text-4xl font-bold">{currentText}</h2>
    </div>
  );
}


// StatisticCounter component for each statistic
function StatisticCounter({ endValue, label }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useAnimateOnScroll(counterRef, "animate__fadeInUp");

  useEffect(() => {
    let start = 0;
    const increment = endValue / 100;
    const interval = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        clearInterval(interval);
        setCount(endValue);
      } else {
        setCount(Math.ceil(start));
      }
    }, 20);
    return () => clearInterval(interval);
  }, [endValue]);

  return (
    <div ref={counterRef} className="text-center p-4">
      <h3 className="text-5xl font-bold mb-2">{count}+</h3>
      <p className="text-lg text-gray-300">{label}</p>
    </div>
  );
}

// StatisticsSection component for the entire section
function StatisticsSection() {
  return (
    <div className="flex justify-around py-10 bg-gray-800">
      <StatisticCounter endValue={10000} label="Users" />
      <StatisticCounter endValue={200} label="Workout Plans" />
      <StatisticCounter endValue={5} label="5-Star Reviews" />
    </div>
  );
}

// FeatureCard component for displaying key features
function FeatureCard({ title, description, icon }) {
  const cardRef = useRef(null);
  useAnimateOnScroll(cardRef, "animate__fadeInUp");

  return (
    <div
      ref={cardRef}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        color: "#39FF14",
      }}
      className="flex flex-col items-center p-6 rounded-lg shadow-md text-center"
    >
      <img src={icon} alt={`${title} icon`} className="h-12 w-12 mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p style={{ color: "#d1d5db" }}>{description}</p>
    </div>
  );
}

// Main LandingPage component
export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const rotatingTextImageRef = useRef(null);
  const statisticsRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);

  useAnimateOnScroll(heroRef, "animate__fadeIn");
  useAnimateOnScroll(featuresRef, "animate__fadeInUp");
  useAnimateOnScroll(rotatingTextImageRef, "animate__fadeIn");
  useAnimateOnScroll(statisticsRef, "animate__fadeIn");
  useAnimateOnScroll(testimonialRef, "animate__fadeIn");
  useAnimateOnScroll(ctaRef, "animate__fadeInUp");

  return (
    <div style={{ backgroundColor: "#1a1a1a", color: "#39FF14", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div ref={heroRef} className="flex flex-col items-center justify-center py-10 px-4 text-center">
        <h1 className="text-6xl font-extrabold mb-6">Kickstart Your Fitness Journey</h1>
        <p style={{ color: "#d1d5db" }} className="text-lg max-w-lg mb-8">
          Designed specifically for students, our app provides all the tools you need to stay motivated, achieve your goals, and track your progress with ease.
        </p>
        <Link href="/auth/register">
          <button
            className="bg-[#39FF14] text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#2ecc71] hover:text-white transition duration-300"
          >
            Get Started
          </button>
        </Link>
      </div>

      {/* Key Features Section */}
      <div ref={featuresRef} className="flex flex-col items-center py-10 px-4">
        <h2 className="text-4xl font-bold mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Personalized Plans"
            description="Customized exercise and diet plans tailored to your fitness goals."
            icon="/icons/plan.png"
          />
          <FeatureCard
            title="Flexible Scheduling"
            description="Swap exercises and meals to fit your busy schedule."
            icon="/icons/schedule.png"
          />
          <FeatureCard
            title="Progress Blog"
            description="Share your fitness journey with friends and stay motivated."
            icon="/icons/progress.png"
          />
        </div>
      </div>

      {/* Rotating Text and Image Carousel Section */}
      <div ref={rotatingTextImageRef} className="flex justify-center py-10">
        <RotatingTextImageCarousel />
      </div>

      {/* Statistics Section with animated counters */}
      <div ref={statisticsRef} className="animate__animated animate__fadeIn">
        <StatisticsSection />
      </div>

      {/* Testimonial Section */}
      <div ref={testimonialRef} className="py-20 px-4 text-center" style={{ backgroundColor: "#333333" }}>
        <h2 className="text-4xl font-bold mb-8">What Our Users Say</h2>
        <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg" style={{ backgroundColor: "#2a2a2a" }}>
          <p className="text-lg mb-4">
            "I was always intimidated by fitness apps, but this one is so easy to use! The personalized plans and flexibility fit perfectly into my busy schedule. I can finally see real progress, and I’m motivated to keep going!"
          </p>
          <p className="font-semibold" style={{ color: "#cccccc" }}>— Jamie, University Student</p>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div ref={ctaRef} className="flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold mb-6">Ready to Achieve Your Fitness Goals?</h2>
        <div className="space-x-4">
        <Link href="/auth/register">
          <button
            className="bg-[#39FF14] text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#2ecc71] hover:text-white transition duration-300"
          >
            Join Now
          </button>
        </Link>
          <Link href="/auth/signin">
            <button
              style={{
                backgroundColor: "#1a1a1a",
                color: "#39FF14",
                border: "2px solid #39FF14",
              }}
              className="font-bold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-80 transition duration-300"
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
