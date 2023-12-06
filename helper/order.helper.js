"use server";
import { revalidateTag } from "next/cache";

import {
  acceptOrderById,
  getPlacedOrderByUserId,
  getReceivedOrderByUserId,
} from "@/models/oreder.model";
export async function placedOrders(userId) {
  const data = await getPlacedOrderByUserId(userId);
  return data;
}

export async function receivedOrder(userId) {
  const data = await getReceivedOrderByUserId(userId);
  return data;
}
export async function acceptOrder(prev, form) {
  const p_id = form.get("product_id");
  console.log(prev);
  console.log(p_id, "product_id");
  try {
    const data = await acceptOrderById(p_id);
    console.log(data);
    return revalidateTag("received-orders");
  } catch (e) {
    return {
      message: "Something Went Wrong",
    };
  }
}
