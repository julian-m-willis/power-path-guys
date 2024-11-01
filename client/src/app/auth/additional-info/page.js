"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function AdditionalInfoPage() {
    const router = useRouter();
    const [email, setEmail] = useState(''); // Get this from the previous page's state if necessary
    const [fitnessGoal, setFitnessGoal] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [goalTimeline, setGoalTimeline] = useState('');

  const handleSubmit = async () => {
    if(true){
        router.push('/main/workout');
    }
    try{
    const res = await axios.post('http://3.107.192.183:5006/auth/',{
        email,
        fitnessGoal,
        height,
        weight,
        activityLevel,
        goalWeight,
        goalTimeline,
    });

    }catch (error) {
        console.error('Failed to save additional information:', error.response?.data?.message || error.message);
      }
    };

    //     if (true) {
    //       router.push('/main/workout');
    //     } else {
    //       console.error("Failed to save additional information.");
    //     }
    //   };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold mb-4">Let's get to know you better!</h1>
    <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
      <select
        className="p-2 border rounded text-black"
        value={fitnessGoal}
        onChange={(e) => setFitnessGoal(e.target.value)}
      >
        <option value="">Select Fitness Goal</option>
        <option value="lose">Lose Weight</option>
        <option value="gain">Gain Weight</option>
        <option value="maintain">Maintain Weight</option>
      </select>
      <input
        type="number"
        placeholder="Height (in cm)"
        className="p-2 border rounded text-black"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight (in kg)"
        className="p-2 border rounded text-black"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <select
        className="p-2 border rounded text-black"
        value={activityLevel}
        onChange={(e) => setActivityLevel(e.target.value)}
      >
        <option value="">Select Activity Level</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      {fitnessGoal === 'lose' || fitnessGoal === 'gain' ? (
        <>
          <input
            type="number"
            placeholder="Goal Weight (in kg)"
            className="p-2 border rounded text-black"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value)}
          />
          <select
            className="p-2 border rounded text-black"
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
        </>
      ) : null}
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  </div>
  );
}
