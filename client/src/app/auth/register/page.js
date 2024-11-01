"use client"
import localFont from "next/font/local";
import "../../globals.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, age, email, password }),
    });

    if (true) { //res.ok
      router.push('/auth/additional-info'); // Redirect after successful registration
    } else {
      const errorData = await res.json();
      setError(errorData.message); // Display error message
    }
  };

  return (
    <div className="bg-cover bg-center h-screen w-full" style={{backgroundImage:"url('/bg.jpg')"}}> 
    <div className="flex flex-col items-center justify-center h-screen" >
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="First Name"
            className="p-2 border rounded text-black flex-1"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-2 border rounded text-black flex-1"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Age"
            className="p-2 border rounded text-black flex-1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded text-black flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded text-black flex-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-2 border rounded text-black flex-1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleRegister}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
    </div>
  );
}
