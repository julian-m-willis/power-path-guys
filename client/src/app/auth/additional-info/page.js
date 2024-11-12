"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdditionalInfoPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("User");
  const [email, setEmail] = useState(""); // Optionally set from previous page
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [validationMessage, setValidationMessage] = useState(""); // Added validation message state

  useEffect(() => {
    // Extract the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const firstNameFromQuery = urlParams.get("firstName");

    if (typeof firstNameFromQuery === "string") {
      setFirstName(firstNameFromQuery);
    }
  }, []);

  const handleSubmit = async () => {
    if (!fitnessGoal || !height || !weight || !activityLevel) {
      setValidationMessage("All fields are required.");
      return;
    }

    // Clear validation message if fields are filled
    setValidationMessage("");

    if (true) {
      router.push("/main");
    } else {
      console.error("Failed to save additional information.");
    }
  };

  return (
    <div
      className="bg-responsive min-h-screen w-full"
      style={{
        backgroundImage: "url('/Power path guys (2).jpg')",
        backgroundColor: "#0a141b", // Black background for uncovered areas
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
          h1, button {
            font-family: 'Anton', sans-serif;
          }

          /* Default: Cover for larger screens, centered */
          .bg-responsive {
            background-size: cover;
          }

          /* Mobile-specific styling: contain, align to top */
          @media (max-width: 768px) {
            .bg-responsive {
              background-size: contain;
              background-position: top;
            }
          }
        `}
      </style>
      <div className="flex flex-col items-start justify-center min-h-screen pl-4 md:pl-40 pr-4 md:pr-0">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ color: "#c1ff72", letterSpacing:'0.03em', fontWeight:'500', }}
        >
          Hi {firstName}! <br /> Let's get to know you better!
        </h1>
        {validationMessage && (
          <p className="text-red-500 mb-4">{validationMessage}</p>
        )}
        <form
          className="flex flex-col space-y-4 w-full max-w-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Height (in cm)"
              className="p-3 border rounded text-black"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Weight (in kg)"
              className="p-3 border rounded text-black"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <select
              className="p-3 border rounded text-black"
              value={fitnessGoal}
              onChange={(e) => setFitnessGoal(e.target.value)}
            >
              <option value="">Select Fitness Goal</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Weight</option>
              <option value="maintain">Maintain Weight</option>
            </select>
            <select
              className="p-3 border rounded text-black"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="">Select Activity Level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="text-lg font-bold text-black bg-[#c1ff72] py-2 px-6 mt-4"
            style={{ width: "120px", letterSpacing:'0.03em', fontWeight:'500',}}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
