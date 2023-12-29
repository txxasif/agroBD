import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nidNo: {
      type: Number,
      required: true,
    },
    frontPhoto: {
      type: String,
      required: true,
    },
    backPhoto: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "canceled", "pending"],
      default: "pending",
    },
    dob: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DriverApplication =
  mongoose.models.DriverApplication ||
  mongoose.model("DriverApplication", applicationSchema);
export default DriverApplication;
