import translateToBangla from "@/helper/translation";
import Order from "./order.schema";
import mongoose from "mongoose";
const itemsPerPage = 20;
export async function placeOrderModel(order) {
  let buyerLocationBn = {
    division: "",
    district: "",
    upazilla: "",
    localAddress: "",
  };
  if (!("buyerLocationBn" in order)) {
    buyerLocationBn.division = await translateToBangla(
      order.buyerLocation.division
    );
    buyerLocationBn.district = await translateToBangla(
      order.buyerLocation.district
    );
    buyerLocationBn.upazilla = await translateToBangla(
      order.buyerLocation.upazilla
    );
    buyerLocationBn.localAddress = await translateToBangla(
      order.buyerLocation.localAddress
    );
    order["buyerLocationBn"] = { ...buyerLocationBn };
  }

  const orderToBePlaced = new Order({ ...order });
  let finalResponse = true;
  try {
    await orderToBePlaced.save();
    console.log("done");
  } catch (err) {
    console.log("web");
    finalResponse = false;
  }

  return finalResponse;
}
export async function getPlacedOrderByUserId(id) {
  const uId = new mongoose.Types.ObjectId(id);
  const data = await Order.aggregate([
    {
      $match: {
        buyer: uId,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
  ]);
  return data;
}
export async function getReceivedOrderByUserId(id) {
  const uId = new mongoose.Types.ObjectId(id);
  const data = await Order.aggregate([
    {
      $match: {
        seller: uId,
        status: "pending",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
  ]);
  return data;
}
export async function acceptOrderById(id) {
  const res = await Order.updateOne({ _id: id }, { status: "accepted" });
  return res;
}

export async function allOrdersModel(query, page) {
  const totalItems = await Order.find({ ...query }).countDocuments();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const limit = itemsPerPage;
  const skip = Math.max(0, (page - 1) * itemsPerPage);
  const result = await Order.find({ ...query })
    .limit(limit)
    .skip(skip);
  return { result, totalPages };
}
