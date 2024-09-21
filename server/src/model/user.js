import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 0
  },
  progress: {
    type: Number,
    default: 0
  }
});

const reclaimProofChangelogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  proofData: {
    type: Object
  }
});

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const videoCallSchema = new mongoose.Schema({
  participants: [{
    type: String
  }],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number
  }
});

const preferenceSchema = new mongoose.Schema({
  // Dynamic preferences
}, { strict: false });

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  courses: [courseSchema],
  achievements: [achievementSchema],
  reclaimProofChangelog: [reclaimProofChangelogSchema],
  chatHistory: [chatMessageSchema],
  videoCalls: [videoCallSchema],
  preferences: [preferenceSchema]
});

const User = mongoose.model('User', userSchema);

export default User;
