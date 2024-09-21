import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./utils/connectDB.js";
import { createUser, getAchievementNames, getUsersBasedOnPreferences, updateUser } from "./controllers/user.controller.js";
import { users } from "./seed.js";
import User from "./model/user.js";

const app = express();
connectDB();

app.use(cors({
    origin: "http://localhost:5173",
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

// app.get('/seed', async (req, res) => {
//   const data = await User.insertMany(users);
//   res.send(data);
// });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});