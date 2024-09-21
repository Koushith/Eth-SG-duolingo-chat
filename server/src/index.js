import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./utils/connectDB.js";
import { createUser, getAchievementNames, getUsersBasedOnPreferences, updateUser } from "./controllers/user.controller.js";
import { AccessToken } from 'livekit-server-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
connectDB();

app.use(cors({
    origin: "http://localhost:5173" ,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
}));

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/user", createUser);
app.get("/api/user/achievement-names", getAchievementNames);
app.post("/api/user/update", updateUser);
app.post("/api/user/get-users", getUsersBasedOnPreferences);

const createToken = async () => {
  const roomName = 'quickstart-room';  // Ensure this room exists or is automatically created when joined
  const participantName = '64f1bce12e8c1a0b7f654321';  // Unique identifier for the participant

  // Token expiration in seconds (600 seconds = 10 minutes)
  const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
    identity: participantName,  // Participant identifier (e.g., user ID or email)
    ttl: '10m',  // Token expiration in seconds (30 minutes)
  });

  // Add room join grant for this token
  at.addGrant({ roomJoin: true, room: roomName });

  // Generate JWT and return
  return at.toJwt();
}

app.get('/livekit-token', async (req, res) => {
  try {
    const token = await createToken();
    res.status(200).send(token);
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).send({ error: 'Failed to generate token' });
  }
});


// app.get('/seed', async (req, res) => {
//   const data = await User.insertMany(users);
//   res.send(data);
// });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});