import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "ধান",
        "গম",
        "শাকসবজি",
        "ফল",
        "মাছ",
        "হাঁস-মুরগি",
        "গরু-ছাগল",
        "মসলা",
        "পাট",
        "অন্যান্য",
      ],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["কেজি", "লিটার", "পিস", "বস্তা", "বটি"],
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
