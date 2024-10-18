"use client"
import localFont from "next/font/local";
import "../../globals.css";
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = () => {
    // For now, simply redirect to the main app
    router.push('/main');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form className="flex flex-col space-y-4">
        <input type="email" placeholder="Email" className="p-2 border rounded" />
        <input type="password" placeholder="Password" className="p-2 border rounded" />
        <button
          type="button"
          onClick={handleRegister}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
