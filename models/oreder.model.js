import translateToBangla from "@/helper/translation";
import Order from "./order.schema";

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
  const quantityBn = await translateToBangla(order.quantity);
  const totalPriceBn = await translateToBangla(order.totalPrice);
  const orderToBePlaced = new Order({ ...order, quantityBn, totalPriceBn });
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
  const data1 = await Order.aggregate([
    {
      $match: {
        seller: id,
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
  console.log(data1, "doppp");
  return data1;
}
