"use client"

import React from "react";
import { useEffect } from 'react';
import "./homepage.css"; // Import the CSS file

export default function Home() {
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
