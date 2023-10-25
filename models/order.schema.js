import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
    },
    quantityBn: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    totalPriceBn: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "shipped", "delivered"],
      default: "pending",
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
    buyerLocation: {
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
    buyerLocationBn: {
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
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
