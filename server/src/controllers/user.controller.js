import User from "../model/user.js";

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User with this email already exists" });
    }

    const user = await User.create({ name, email });

    if (!user) {
      return res.status(500).json({ success: false, message: "Failed to create user" });
    }

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
    const { email, name, courses, achievements, reclaimProofChangelog } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.name = name || user.name;
    user.courses = courses || user.courses;
    user.achievements = achievements || user.achievements;
    user.reclaimProofChangelog = reclaimProofChangelog || user.reclaimProofChangelog;

    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

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

