"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function GoalsPage() {
    const router = useRouter();
    const [goalWeight, setGoalWeight] = useState('');
    const [goalTimeline, setGoalTimeline] = useState('');

    const handleSubmit = async () => {
        try {
            // Save the goal weight and timeline information
            await axios.post('http://3.107.192.183:5006/auth/goals', {
                goalWeight,
                goalTimeline,
            });
            router.push('/main/'); // Redirect to workout page after saving goal info
        } catch (error) {
            console.error('Failed to save goal information:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{backgroundImage:"url('/goals.jpg')"}}>
            
            <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="number"
                    placeholder="Goal Weight (in kg)"
                    className="p-4 border rounded text-black w-80"
                    value={goalWeight}
                    onChange={(e) => setGoalWeight(e.target.value)}
                />
                <select
                    className="p-4 border rounded text-black w-80"
                    value={goalTimeline}
                    onChange={(e) => setGoalTimeline(e.target.value)}
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
                    className="text-m font-bold text-[#c1ff72] bg-[#000000] py-2 px-6 mt-4"
                    

                >
                    Submit
                </button>
            </form>
        </div>
    );
}
