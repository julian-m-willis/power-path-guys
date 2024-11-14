"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import WorkoutCarousel from "./WorkoutCarousel"; // Adjust the path as needed

const ClientOnlyWorkoutPage = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState(null);

  useEffect(() => {
    // Ensures this runs only on the client side
    const paramId = searchParams.get("id");
    setId(paramId);
  }, [searchParams]);

  // Wrap WorkoutCarousel in Suspense
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {id ? <WorkoutCarousel id={id} /> : <div>Loading...</div>}
    </Suspense>
  );
};

export default ClientOnlyWorkoutPage;
