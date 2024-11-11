"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function GoalsPage(){
    const router = useRouter();
    const [goalWeight, setGoalWeight] = useState('');
    const [goalTimeline, setGoalTimeline] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        // Check if all fields are filled
        if (!goalWeight || !goalTimeline) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        // Clear any previous error message
        setErrorMessage('');

        try {
            // Save the goal weight and timeline information
            await axios.post('http://3.107.192.183:5006/auth/goals', {
                goalWeight,
                goalTimeline,
            });
            router.push('/main'); // Redirect to workout page after saving goal info
        } catch (error) {
            console.error('Failed to save goal information:', error.response?.data?.message || error.message);
        }

    };

    return (
        <div
            className="bg-responsive min-h-screen w-full flex items-center justify-center"
            style={{
                backgroundImage: "url('/goalsbg.jpg')",
                backgroundColor: "#0a141b", // Background color for uncovered areas
                backgroundRepeat: "no-repeat",
            }}
        > 
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
                h1 {
                    font-family: 'Anton', sans-serif;
                }

                /* Default: Background covers screen on larger devices */
                .bg-responsive {
                    background-size: cover;
                }

                /* Mobile-specific styling */
                @media (max-width: 768px) {
                    .bg-responsive {
                    background-size: contain;
                    background-position: top;
                    }
                }
            `}
            </style>

            <div className="absolute top-10 left-10">
                <h1 className="text-4xl md:text-7xl font-bold text-[#c1ff72]" style={{letterSpacing:'0.03em', fontWeight:'500',}}>
                    Set Your Goals
                </h1>
            </div>
            <div className="flex flex-col items-start text-left space-y-4 p-4 w-full max-w-sm md:absolute md:right-20 md:top-2/3">
                {/* Display error message */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <form className="flex flex-col space-y-4 w-full" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="number"
                        placeholder="Goal Weight (in kg)"
                        className="p-4 border rounded text-black w-full"
                        value={goalWeight}
                        onChange={(e) => setGoalWeight(e.target.value)}
                        required
                    />
                    <select
                        className="p-4 border rounded text-black w-full"
                        value={goalTimeline}
                        onChange={(e) => setGoalTimeline(e.target.value)}
                        required
                    >
                        <option value="">Select Timeline</option>
                        <option value="1 month">1 Month</option>
                        <option value="2 months">2 Months</option>
                        <option value="3 months">3 Months</option>
                        <option value="6 months">6 Months</option>
                        <option value="1 year">1 Year</option>
                    </select>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-lg font-bold text-[#c1ff72] bg-[#000000] py-2 px-6"
                        style={{fontFamily: "'Anton', sans-serif",letterSpacing:'0.03em', fontWeight:'500', }}
                    >
                        Submit
                    </button>
            </form>
        </div>
    </div>
    );
}
