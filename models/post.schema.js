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
    priceBn: {
      type: String,
      required: true,
    },
    quantityBn: {
      type: String,
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
    sellerLocation: {
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
    sellerLocationBn: {
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
  },
  { timestamps: true }
);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
