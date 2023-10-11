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
