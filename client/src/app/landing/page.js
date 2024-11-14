// src/app/landing/page.js
"use client";

import "animate.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { Carousel, Card } from "../../components/ui/apple-cards-carousel";
import Image from 'next/image';

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
// function RotatingTextImageCarousel() {
//   const items = [
//     { text: "Strength", image: "/images/strength.jpg" },
//     { text: "Flexibility", image: "/images/flexible.jpg" },
//     { text: "Endurance", image: "/images/endurance.jpg" },
//     { text: "Wellness", image: "/images/wellness.jpg" },
//     { text: "Motivation", image: "/images/motivation.jpg" },
//   ];
  
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
//     }, 3000); // Rotate every 3 seconds

//     return () => clearInterval(interval);
//   }, [items.length]);

//   const currentText = items[currentIndex].text;
//   const currentImage = items[currentIndex].image;

//   return (
//     <div className="flex flex-col items-center justify-center animate__animated animate__fadeIn">
//       <img
//         src={currentImage}
//         alt={currentText}
//         className="w-full max-w-[20rem] h-48 md:w-150 md:h-80 mb-4 rounded-lg shadow-lg object-cover"
//       />
//       <h2 className="text-2xl md:text-4xl font-bold">{currentText}</h2>
//     </div>
//   );
// }

// StatisticCounter component for each statistic
// function StatisticCounter({ endValue, label }) {
//   const [count, setCount] = useState(0);
//   const counterRef = useRef(null);

//   useAnimateOnScroll(counterRef, "animate__fadeInUp");

//   useEffect(() => {
//     let start = 0;
//     const increment = endValue / 100;
//     const interval = setInterval(() => {
//       start += increment;
//       if (start >= endValue) {
//         clearInterval(interval);
//         setCount(endValue);
//       } else {
//         setCount(Math.ceil(start));
//       }
//     }, 20);
//     return () => clearInterval(interval);
//   }, [endValue]);

//   return (
//     <div ref={counterRef} className="text-center p-4">
//       <h3 className="text-3xl md:text-5xl font-bold mb-2">{count}+</h3>
//       <p className="text-lg text-gray-300">{label}</p>
//     </div>
//   );
// }

// StatisticsSection component for the entire section
// function StatisticsSection() {
//   return (
//     <div className="flex flex-col md:flex-row justify-around py-10 bg-gray-800 text-center">
//       <StatisticCounter endValue={10000} label="Users" />
//       <StatisticCounter endValue={200} label="Workout Plans" />
//       <StatisticCounter endValue={5} label="5-Star Reviews" />
//     </div>
//   );
// }

// FeatureCard component for displaying key features
// function FeatureCard({ title, description, icon }) {
//   const cardRef = useRef(null);
//   useAnimateOnScroll(cardRef, "animate__fadeInUp");

//   return (
//     <div
//       ref={cardRef}
//       style={{
//         backgroundColor: "#0a141b",
//         color: "#c1ff72",
//       }}
//       className="flex flex-col items-center p-6 rounded-lg shadow-md text-center"
//     >
//       <img src={icon} alt={`${title} icon`} className="h-12 w-12 mb-4" />
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p style={{ color: "#d1d5db" }}>{description}</p>
//     </div>
//   );
// }







export function TestimonialSection(){
  const testimonials = [
    {
      quote:
        "Power-Path-Guys has really helped me plan out my daily meals. As a univeristy student, we sometimes forget to eat healthily admist the stress, but with Power-Path-Guys, ive managed to maintain my health",
      name: "Sarah Chen",
      designation: "Third year university student",
      src: "/testimonials/test1.jpeg",
    },
    {
      quote:
      "I was always intimidated by fitness apps, but this one is so easy to use! The personalized plans and flexibility fit perfectly into my busy schedule. I can finally see real progress, and I’m motivated to keep going!",
      name: "Jamie Simsons",
      designation: "First year university",
      src: "/testimonials/test2.jpeg",
    },
    {
      quote:
        "Power-Path-Guys is extremely beginner friendly, and through it, i finally managed to hit my ideal body!",
      name: "Isaac Lim",
      designation: "JC2 student",
      src: "/testimonials/test3.jpeg",
    },
    {
      quote:
        "Power-Path-Guys is like no other! With the workout and diet plans provided for me, I have never felt happier with the results",
      name: "Sandhya Sivakanthan",
      designation: "Fourth year university student",
      src: "/testimonials/test4.jpeg",
    },
    {
      quote:
        "Trying to keep fit is definitely a challenge for both the body and mind, but Power-Path-Guys has made that journey so much easier for me.",
      name: "Jack Smith",
      designation: "Second year university student",
      src: "/testimonials/test5.jpeg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}

// Main LandingPage component
export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const rotatingTextImageRef = useRef(null);
  const statisticsRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);
  const carouselRef = useRef(null);
  const DummyContent = () => {
    return (
      <>
        {[...new Array(3).fill(1)].map((_, index) => {
          return (
            <div
              key={"dummy-content" + index}
              className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
            >
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                  The first rule of Apple club is that you boast about Apple club.
                </span>{" "}
                Keep a journal, quickly jot down a grocery list, and take amazing
                class notes. Want to convert those notes to text? No problem.
                Langotiya jeetu ka mara hua yaar is ready to capture every
                thought.
              </p>
              <Image
                src="/logo.jpg"
                alt="Macbook mockup from Aceternity UI"
                height="500"
                width="500"
                className="w-full h-auto"
              />
            </div>
          );
        })}
      </>
    );
  };
  const data = [
    {
      category: "Personalised Plans",
      title: "Customised exercise and diet plans tailored to your fitness goals",
      src: "/applecarou/personalised.jpg",
      content: (
        <Image
          src="/applecarou/personalised.jpg"
          alt="Personalised Plans"
          layout="responsive"
          height={500}
          width={500}
          priority // For images above the fold
          className="w-full h-auto"
        />
      ),
    },
    {
      category: "Flexible Scheduling",
      title: "Swap exercises and meals to fit your busy schedule.",
      src: "/applecarou/new2.jpg",
      content: (
        <Image
          src="/applecarou/new2.jpg"
          alt="Flexible Scheduling"
          layout="responsive"
          height={500}
          width={500}
          priority // For images above the fold
          className="w-full h-auto"
        />
      ),
    },
    {
      category: "Progress Blog",
      title: "Share your fitness journey with friends and stay motivated",
      src: "/applecarou/newblog.tiff",
      content: (
        <Image
          src="/applecarou/newblog.tiff"
          alt="Progress Blog"
          layout="responsive"
          height={500}
          width={500}
          className="w-full h-auto"
        />
      ),
    },
    {
      category: "Calorie tracker",
      title: "Track your calories and macros to better understand your diet",
      src: "/applecarou/food.jpg",
      content: (
        <Image
          src="/applecarou/food.jpg"
          alt="Flexible Scheduling"
          layout="responsive"
          height={500}
          width={500}
          priority // For images above the fold
          className="w-full h-auto"
        />
      ),
    },
    {
      category: "Goal tracker",
      title: "Track how close you are to your goals",
      src: "/applecarou/goals.jpeg",
      content: (
        <Image
          src="/applecarou/goals.jpeg"
          alt="Progress Blog"
          layout="responsive"
          height={500}
          width={500}
          className="w-full h-auto"
        />
      ),
    },
  ];

   
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));



  

  useAnimateOnScroll(heroRef, "animate__fadeIn");
  useAnimateOnScroll(featuresRef, "animate__fadeInUp");
  useAnimateOnScroll(rotatingTextImageRef, "animate__fadeIn");
  useAnimateOnScroll(statisticsRef, "animate__fadeIn");
  useAnimateOnScroll(testimonialRef, "animate__fadeIn");
  useAnimateOnScroll(ctaRef, "animate__fadeInUp");

  return (
    <div style={{ backgroundColor: "#0a141b", color: "#c1ff72", minHeight: "100vh" }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

        h1, h2 {
          font-family: 'Anton', sans-serif;
          color: #c1ff72;
          letter-spacing: 0.03em;
          font-weight: 500;
        }
      `}</style>
      {/* sticky nav bar */}
      <div className="sticky top-0 bg-[#0a141b] shadow-md z-50">
        <nav className="flex items-center justify-between px-4 py-3">
          <img src='/icon.png' style={{ height: '50px' }}/>
          <div className="flex space-x-4">
            <button className="bg-[#c1ff72] text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#2ecc71] hover:text-white transition duration-300 focus:bg-[#2ecc71] focus:text-white">
              <a href='../auth/register'>Join Now</a>
            </button>
            <button className='bg-[#c1ff72] text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#2ecc71] hover:text-white transition duration-300 focus:bg-[#2ecc71] focus:text-white'>
              <a href='../auth/signin'>Sign In</a>
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden"> {/* pt-20 to adjust for navbar */}
        {/* Video Background */}
        <div className="absolute inset-0 h-full w-full overflow-hidden z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ maxHeight: "500px" }} 
          >
            <source src="/landing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overlay Content on Video */}
        <div className="relative z-10 flex flex-col items-center text-center py-20 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#c1ff72]">Kickstart Your Fitness Journey</h1>
          <p className="text-lg max-w-lg mb-8 text-gray-200">
            Designed specifically for students, our app provides all the tools you need to stay motivated, achieve your goals, and track your progress with ease.
          </p>
          <Link href="/auth/register">
            <button className="bg-[#c1ff72] text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#2ecc71] hover:text-white transition duration-300 focus:bg-[#2ecc71] focus:text-white">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Additional Sections */}
      <div ref={testimonialRef} className="py-20 px-4 text-center" style={{ backgroundColor: "#333333" }}>
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        What your fellow Power-Paths have to say
      </h2>
        <TestimonialSection />
      </div>


      {/* apple carou cards */}
      <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Heres what we have to offer
      </h2>
      <Carousel items={cards} />
    </div>

        {/* Divider */}
      <div className="w-full my-10 border-t border-gray-500 opacity-50"></div>

      <div ref={ctaRef} className="flex flex-col items-center py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Ready to Achieve Your Fitness Goals?</h2>
        <div className="space-x-4">
          <Link href="/auth/register">
            <button className="bg-[#c1ff72] text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#2ecc71] hover:text-white transition duration-300 focus:bg-[#2ecc71] focus:text-white">
              Join Now
            </button>
          </Link>
          <Link href="/auth/signin">
            <button className="bg-black text-[#c1ff72] font-bold py-3 px-8 rounded-full shadow-lg border-2 border-[#39FF14] hover:bg-[#2ecc71] hover:text-white transition duration-300 focus:bg-[#2ecc71] focus:text-white">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
