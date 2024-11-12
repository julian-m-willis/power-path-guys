"use client"
import { TypewriterEffect } from "../../components/ui/typewriter-effect";
import React, { useState, useEffect }  from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Typography, Box } from "@mui/material";
ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);
import "./homepage.css"; // Import the CSS file
import { Compare } from "../../components/ui/compare";


export default function Home() {
  const backgroundImages = ["/gym1.jpg", "/gym2.jpg", "/gym3.jpg", "/gym4.jpg", "/gym5.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = [
    { text: " POWER " },
    { text: " PATH " },
    { text: " GUYS " },
  ];

  const features = [
    {
      title: "Track Your Diet",
      description: "Track and manage your water intake and calories daily",
      skeleton: <SkeletonOne />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Get Tips and Tricks",
      description: "Read through blogs from your fellow power-paths",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Want More Tutorials?",
      description: "Follow easy workout videos tailored to your needs",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
    },
    {
      title: "Plan Your Goals",
      description: "Let us help you take the next step towards power",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [backgroundImages.length]);

  return (
    <div>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');`}
      </style>
      <div
        className="bg-fixed bg-no-repeat bg-center bg-cover transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImages[currentIndex]})` }}
      >
        <div className="flex flex-col justify-center h-[calc(100vh-60px)] items-center px-4 text-center">
          <p className="font-bold text-5xl md:text-7xl" style={{ fontFamily: "'Anton', sans-serif" }}>Welcome to</p>
          <TypewriterEffect 
            words={words} 
            className="font-bold text-5xl md:text-7xl" 
            style={{ color: "#c1ff72", fontFamily: "'Anton', sans-serif" }}
          />
          <p className="text-lg md:text-2xl font-bold mt-2">Bringing you the right path to power up</p>
        </div>
      </div>

      <div className="relative px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ children, className }) => {
  return (
    <div className={`p-4 sm:p-8 relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }) => {
  return (
    <p 
      className="max-w-5xl mx-auto text-left text-lg md:text-4xl md:leading-snug"
      style={{ color: "#c1ff72", fontFamily: "'Anton', sans-serif" }}
    >
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }) => {
  return (
    <p
      className="text-sm md:text-base max-w-4xl text-left mx-auto text-neutral-500 font-normal dark:text-neutral-300 max-w-sm mx-0 my-2"
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex flex-col items-center py-8 px-2 gap-4 sm:gap-10 h-full">
      <div
        style={{
          transform: "rotateX(15deg) translateZ(80px)",
        }}
        className="p-1 md:p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800 mx-auto w-full sm:w-3/4 h-64 sm:h-3/4 flex flex-col items-center justify-center"
      >
        <Compare
          firstImage="/beforeppg.jpg"
          secondImage="/afterppg.jpg"
          firstImageClassName="object-cover object-left-top w-full h-full"
          secondImageClassname="object-cover object-left-top w-full h-full"
          className="w-full h-full rounded-[22px] md:rounded-lg mx-auto max-h-64 sm:max-h-[400px]"
          slideMode="hover"
          autoplay={true}
        />
        <div className='mt-4 pt-4 w-full text-left'>
          <span>
            <a href="main/diet" className="hover:text-[#c1ff72]"> See more</a>
          </span>
        </div>
      </div>
    </div>
  );
};




// SkeletonTwo, SkeletonThree, and SkeletonFour would follow similar adjustments
// Ensuring font sizes, paddings, and margins adapt to mobile views

export const SkeletonTwo = () => {
  const images = [
    "/Newsletter.png",
    "/Fitness Blog.png",
    "/Newsletter.png",
    "/Fitness Blog.png",
  ];
 
  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };

  return (
    <div className="relative flex flex-col items-start p-4 md:p-8 gap-6 md:gap-10 h-full overflow-hidden">
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        {images.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={"images-first" + idx}
            style={{ rotate: Math.random() * 20 - 10 }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl p-1 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 overflow-hidden w-20 h-20 md:w-40 md:h-40"
          >
            <Image
              src={image}
              alt={`blog${idx}`}
              width="500"
              height="500"
              className="rounded-lg object-cover w-full h-full"
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute left-0 inset-y-0 w-10 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-10 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
      
      <div className="pt-4 pl-2 md:pl-4">
        <span>
          <a href="main/blog" className="hover:text-[#c1ff72]">See more</a>
        </span>
      </div>
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="relative flex flex-col items-start p-4 md:p-8 gap-6 md:gap-10 h-full overflow-hidden">
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-72 md:h-96 rounded-md shadow-xl flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          "bg-[url(/skeleton3.jpeg)] bg-cover bg-center",
          // Preload hover image by setting it in a pseudo-element
          "before:bg-[url(/skeleton3.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
          "hover:bg-[url(/skeleton3.gif)]",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all duration-500"
        )}
      >
        <div className="text relative z-50 p-2">
          <h1 className="font-bold text-lg md:text-xl text-gray-50">
            Wanna workout like him?
          </h1>
          <p className="font-normal text-sm md:text-base text-gray-50 mt-2">
            <a href="main/workout" className="hover:text-[#c1ff72]">See more</a>
          </p>
        </div>
      </div>
    </div>
  );
};




export const SkeletonFour = ({ view = "week" }) => {
  const [caloriesIntakeData, setCaloriesIntakeData] = useState([]);

  useEffect(() => {
    if (view === "today") {
      setCaloriesIntakeData([2000]);
    } else if (view === "week") {
      setCaloriesIntakeData([1800, 2000, 2200, 2100, 1900, 2400, 2300]);
    } else if (view === "month") {
      setCaloriesIntakeData([1900, 2000, 2100, 2300, 2200, 2100, 1900, 2000, 2100, 2200, 2300, 1900, 2400, 2200, 2000, 2100]);
    }
  }, [view]);

  const chartData = {
    labels: view === "today" ? ["Today"] : view === "week" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : Array.from({ length: 16 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Calories Intake",
        data: caloriesIntakeData,
        backgroundColor: "rgba(193, 255, 114, 0.6)",
        borderColor: "#c1ff72",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...caloriesIntakeData) + 500,
        title: {
          display: true,
          text: "Calories",
        },
      },
      x: {
        title: {
          display: true,
          text: view === "today" ? "Today" : view === "week" ? "Days of the Week" : "Days of the Month",
        },
      },
    },
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col w-full md:w-3/4 h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] space-y-4 p-4 rounded-lg shadow-md">
        <Typography variant="h6" align="center" gutterBottom sx={{ color: "text.primary", fontWeight: "bold" }}>
          Calories Intake ({view})
        </Typography>
        <Box sx={{ height: { xs: 200, md: 300 } }}>
          <Bar data={chartData} options={options} />
        </Box>
        <div className="mt-4">
          <span>
            <a href='main/goal' className="hover:text-[#c1ff72]">See more</a>
          </span>
        </div>
      </div>
    </div>
  );
};
