import translateToBangla from "@/helper/translation";
import Order from "./order.schema";
import mongoose from "mongoose";
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
export async function getOrderByUserId(id) {
  const data = await Order.find({ seller: id }).sort({ createdAt: 1 });
  const uId = new mongoose.Types.ObjectId(id);
  const data1 = await Order.aggregate([
    {
      $match: {
        seller: uId,
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
  console.log(data, "doppp");
  return data1;
}
