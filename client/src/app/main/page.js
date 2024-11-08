"use client"

import React from "react";
import "./homepage.css"; // Import the CSS file

export default function Home() {
  const userId = localStorage.getItem("access_token");

  if (userId) {
    console.log("User ID:", userId); // Use this value as needed
  } else {
    console.log("User is not logged in");
  }
  return (
      <div>
        <div
          className="bg-fixed h-screen w-full"
          style={{
            backgroundImage: "url(/homepage.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Additional content can go here */}
        </div>
      </div>
  );
}
