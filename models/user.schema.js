import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "driver"],
    default: "user",
    required: true,
  },
  verificationStatus: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  phone: {
    type: Number,
  },
  location: {
    division: {
      type: String,
    },
    district: {
      type: String,
    },
    upazilla: {
      type: String,
    },
    localAddress: {
      type: String,
    },
  },
  locationBn: {
    division: {
      type: String,
    },
    district: {
      type: String,
    },
    upazilla: {
      type: String,
    },
    localAddress: {
      type: String,
    },
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
