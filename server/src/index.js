import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./utils/connectDB.js";

const app = express();
connectDB();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});