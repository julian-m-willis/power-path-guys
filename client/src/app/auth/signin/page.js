"use client";
import localFont from "next/font/local";
import "../../globals.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://3.107.192.183:5006/auth/token",
        {
          username: email, // Adjust to match `form_data.username`
          password: password, // Adjust to match `form_data.password`
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        document.cookie = `access_token=${data.access_token}; path=/; SameSite=Strict`;
        console.log(data)

        // Store the user ID and access token in localStorage or sessionStorage
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_name", data.first_name +" "+data.last_name);
        localStorage.setItem("access_token", data.access_token);

        // Redirect to the main page
        router.push("/main/");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        setError(error.response.data.detail || "An error occurred");
      } else {
        // Network or other errors
        setError("An error occurred while signing in");
      }
    }
  };

  return (
    <div
      className="bg-responsive min-h-screen w-full"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundColor: "#0a141b", // Black background color for uncovered areas
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
          h1 {
            font-family: 'Anton', sans-serif;
          }

          .bg-responsive {
            background-size: cover;
          }

          @media (max-width: 768px) {
            .bg-responsive {
              background-size: contain;
              background-position: top;
            }
          }
        `}
      </style>
      <div className="flex flex-col items-start justify-center min-h-screen pl-4 md:pl-40 pr-4 md:pr-0">
        <div className="mb-8 w-full max-w-lg">
          <h1 className="text-4xl md:text-7xl font-bold text-white" style={{ fontFamily: "'Anton', sans-serif", color: "white", letterSpacing:'0.03em', fontWeight:'500' }}>SIGN IN</h1>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <form className="flex flex-col space-y-4 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Email"
              className="p-3 border rounded text-black w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="password"
              placeholder="Password"
              className="p-3 border rounded text-black w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full">
            <button
              type="button"
              onClick={handleSignIn}
              className="text-lg md:text-xl text-black font-bold py-3 px-6 md:px-8 hover:opacity-90 w-full md:w-auto"
              style={{
                backgroundColor: "#c1ff72",
                fontFamily: "'Anton', sans-serif",
                width: "150px",
                marginTop: "20px",
                letterSpacing:'0.03em', fontWeight:'500'
              }}
            >
              POWER ON
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
