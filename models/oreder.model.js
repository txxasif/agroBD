import Order from "./order.schema";
export async function placeOrderModel(order) {
  const orderToBePlaced = new Order({ ...order });
  let finalResponse = true;
  try {
    await orderToBePlaced.save();
    console.log("done");
  } catch (err) {
    finalResponse = false;
  }

  return finalResponse;
}
