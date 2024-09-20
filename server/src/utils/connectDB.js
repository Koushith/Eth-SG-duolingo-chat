import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://test_db_admin:ur64Rwuoh9h31HWa@test-i.0qbjxom.mongodb.net/duolingochat-ethSg?retryWrites=true&w=majority&appName=test-i";
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected", mongoose.connection.name);
  } catch (error) {
    console.log(error);
  }
};
