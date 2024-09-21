import User from "../model/user.js";

export const createUser = async (req, res) => {
  try {
    const { userName, email, achievements } = req.body;
    console.log("email", email);
    console.log("name", userName);
    console.log("achievements", achievements);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User with this email already exists" });
    }

    // Filter out achievements with empty names
    const validAchievements = achievements.filter(achievement => achievement.name !== "");

    // Create user with valid achievements
    const user = await User.create({
      userName,
      email,
      achievements: validAchievements
    });

    if (!user) {
      return res.status(500).json({ success: false, message: "Failed to create user" });
    }

    console.log("user", user);

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
    try {
      const { email, name, courses, achievements, preferences, reclaimProofChangelog } = req.body;
  
      console.log("preferences", preferences);
  
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Update user fields based on input
      if (name) user.userName = name;
      if (courses) user.courses = courses;
      if (achievements) user.achievements = achievements;
      if (reclaimProofChangelog) user.reclaimProofChangelog = reclaimProofChangelog;
  
      // Handling preferences update
      if (preferences) {
        // Initialize preferences if it doesn't exist
        if (!user.preferences) {
          user.preferences = {};
        }
  
        // Merge existing preferences with incoming preferences
        user.preferences = { 
          ...user.preferences.toObject(),  // Ensure existing preferences are spread
          ...preferences                   // Overwrite or add new preferences
        };
      }
  
      // Save the updated user
      try {
        await user.save();
        return res.status(200).json({ success: true, user });
      } catch (saveError) {
        console.error("Error saving user:", saveError);
        if (saveError.name === 'MongooseError' && saveError.message.includes('queryTxt ETIMEOUT')) {
          return res.status(503).json({ success: false, message: "Database connection timed out. Please try again later.", error: saveError.message });
        }
        return res.status(500).json({ success: false, message: "Failed to save user", error: saveError.message });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.name === 'MongooseError' && error.message.includes('queryTxt ETIMEOUT')) {
        return res.status(503).json({ success: false, message: "Database connection timed out. Please try again later.", error: error.message });
      }
      if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
        return res.status(500).json({ success: false, message: "Database operation timed out. Please try again.", error: error.message });
      }
      return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
  };

export const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.deleteOne();

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}   

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const getUserAchievements = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }   

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user.achievements });
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}




// helpers
export const getAchievementNames = async (req, res) => {
  try {
    const achievementNames = await User.distinct("achievements.name");
    console.log("achievementNames", achievementNames)
    res.status(200).json({ success: true, data: achievementNames });
  } catch (error) {
    console.error("Error fetching achievement names:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}