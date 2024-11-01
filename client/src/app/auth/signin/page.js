"use client"
import localFont from "next/font/local";
import "../../globals.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async() => {
    // For now, simply redirect to the main app
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (true) { //res.ok
      router.push('/main/workout');
    } else {
      const errorData = await res.json();
      setError(errorData.message); // Display error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}></form>
      <form className="flex flex-col space-y-4">
      <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSignIn}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
