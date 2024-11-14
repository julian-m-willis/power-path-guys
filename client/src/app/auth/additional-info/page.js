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
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [allergies, setAllergies] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false); // New checkbox state
  const [receiveEmails, setReceiveEmails] = useState(false); // New checkbox state
  const [validationMessage, setValidationMessage] = useState(""); // Added validation message state

  useEffect(() => {
    // Extract the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const firstNameFromQuery = urlParams.get("firstName");

    if (typeof firstNameFromQuery === "string") {
      setFirstName(firstNameFromQuery);
    }
  }, []);

  const handleCheckboxChange = (preference) => {
    setDietaryPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((item) => item !== preference)
        : [...prev, preference]
    );
  };


  const handleSubmit = async () => {
    if (!fitnessGoal || !height || !weight || !activityLevel || dietaryPreferences.length === 0 || !agreeTerms) {
      setValidationMessage("All fields are required, and you must agree to the terms.");
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
              <option value="gain">Gain Muscle</option>
              <option value="maintain">Maintain Health</option>
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


          {/* Dietary Preferences */}
          <div className="pt-4">
            <p className="text-lg font-semibold">Dietary Preferences</p>
            <div className="grid grid-cols-3 gap-4">
              {["Vegan", "Vegetarian", "Halal", "Gluten-free", "Pescatarian", "N/A"].map(
                (preference) => (
                  <label key={preference} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={preference}
                      onChange={() => handleCheckboxChange(preference)}
                      checked={dietaryPreferences.includes(preference)}
                      className="text-black"
                    />
                    <span>{preference}</span>
                  </label>
                )
              )}
            </div>
          </div>

                    {/* Allergies Input */}
          <div className="pt-4">
            <input
              type="text"
              placeholder="Allergies (if any)"
              className="p-3 border rounded text-black w-full"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>


                    {/* Agreement and Email Notifications Checkboxes */}
          <div className="pt-4">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                className="text-black w-4 h-4" // Smaller checkbox
              />
              <span style={{ color: "rgba(193, 255, 114, 0.7)" }}>I agree to the terms and conditions provided to Power-Path-Guys</span>
            </label>
            <label className="flex items-center space-x-2 mt-2 text-sm">
              <input
                type="checkbox"
                checked={receiveEmails}
                onChange={(e) => setReceiveEmails(e.target.checked)}
                className="text-black w-4 h-4" // Smaller checkbox
              />
              <span style={{ color: "rgba(193, 255, 114, 0.7)" }}>I wish to receive emails and notifications from Power-Path-Guys</span>
            </label>
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
