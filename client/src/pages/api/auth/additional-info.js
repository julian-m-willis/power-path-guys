import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, fitnessGoal, height, weight, activityLevel, goalWeight, goalTimeline } = req.body;

    if (!email || !fitnessGoal || !height || !weight || !activityLevel) {
      return res.status(400).json({ message: 'Missing required fields' });
    }


    const { db } = await connectToDatabase();

    // Update the user document with additional information
    await db.collection('users').updateOne(
      { email: email },// Use the email directly from the request body for now
      { $set: {
        fitnessGoal,
        height,
        weight,
        activityLevel,
        goalWeight: goalWeight || null, // Optional fields
        goalTimeline: goalTimeline || null, // Optional fields
      },
     }
    );

    res.status(200).json({ message: 'Additional information saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
