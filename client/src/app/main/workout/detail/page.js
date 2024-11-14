"use client";

import dynamic from "next/dynamic";

// Dynamically import the ClientOnlyWorkoutPage with SSR disabled
const ClientOnlyWorkoutPage = dynamic(() => import("./ClientOnlyWorkoutPage"), {
  ssr: false,
});

const WorkoutPage = () => {
  return <ClientOnlyWorkoutPage />;
};

export default WorkoutPage;
