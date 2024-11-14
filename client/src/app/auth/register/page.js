"use client"

import "../../globals.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (!firstName || !lastName || !age || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // If validation passes, clear the error and proceed
    setError(null);

    try {
      const response = await axios.post(
        "http://13.54.17.246:5006/auth/",
        {
          "username": email,
          "email": email,
          "first_name": firstName,
          "last_name": lastName,
          "password": password
        },
      );

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        console.log(data)

        // Store the user ID and access token in localStorage or sessionStorage
        document.cookie = `access_token=${data.access_token}; path=/; SameSite=Strict`;
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("user_name", data.first_name +" "+data.last_name);

        // Redirect to the main page
        router.push(`/auth/additional-info?firstName=${encodeURIComponent(firstName)}`); // Redirect after successful registration
      }
    } catch (error) {
      console.log(error)
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
            {
            `
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
    <div className="flex flex-col items-start justify-center min-h-screen pl-4 md:pl-40 pr-4 md:pr-0" >
      <div className="mb-8 w-full max-w-lg">
        <h1 className="text-4xl md:text-7xl font-bold text-white" style={{fontFamily: "'Anton', sans-serif", color: "white", letterSpacing:'0.03em', fontWeight:'500'}}>REGISTER HERE</h1>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <form className="flex flex-col space-y-4 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="First Name"
            className="p-3 border rounded text-black w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-3 border rounded text-black w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Age"
            className="p-3 border rounded text-black w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 border rounded text-black w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="w-full">
        <button
          type="button"
          onClick={handleRegister}
          className="text-lg md:text-xl text-black font-bold py-3 px-6 md:px-8 hover:opacity-90 w-full md:w-auto"
          style={{backgroundColor: "#c1ff72", fontFamily: "'Anton', sans-serif", width: "150px", // Adjust width as desired
          marginTop: "20px",letterSpacing: "0.03em",fontWeight: "500", }}
        >
          POWER ON
        </button>
        </div>
      </form>
    </div>
    </div>
  );
}
