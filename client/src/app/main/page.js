"use client"

import React from "react";

export default function Home() {
  const userId = localStorage.getItem("access_token");

  if (userId) {
    console.log("User ID:", userId); // Use this value as needed
  } else {
    console.log("User is not logged in");
  }
  return (
    <h1>
      Welcome to the Fitness AppWelcome to the Fitness AppWelcome to the Fitness
      AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to the
      Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to
      the Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome
      to the Fitness AppWelcome to the Fitness AppWelcome to the Fitness
      AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to the
      Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to
      the Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome
      to the Fitness AppWelcome to the Fitness AppWelcome to the Fitness
      AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to the
      Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to
      the Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome
      to the Fitness AppWelcome to the Fitness AppWelcome to the Fitness
      AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to the
      Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to
      the Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome
      to the Fitness AppWelcome to the Fitness AppWelcome to the Fitness
      AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to the
      Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to
      the Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome
      to the Fitness AppWelcome to the Fitness AppWelcome to the Fitness
      AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to the
      Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to
      the Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome
      to the Fitness AppWelcome to the Fitness AppWelcome to the Fitness
      AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to the
      Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to
      the Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome
      to the Fitness AppWelcome to the Fitness AppWelcome to the Fitness
      AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to the
      Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome to
      the Fitness AppWelcome to the Fitness AppWelcome to the Fitness AppWelcome
      to the Fitness AppWelcome to the Fitness App
    </h1>
  );
}
