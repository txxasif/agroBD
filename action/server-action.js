"use server";

import { revalidateTag } from "next/cache";

import DriverApplication from "@/models/application.schema";
import connectDB from "@/models/mongoose";
import Product from "@/models/post.schema";
import User from "@/models/user.schema";

export async function deletePost(form) {
  const id = form.get("id");
  const re = await Product.deleteOne({ _id: id });

  console.log("deleted post");
}
export async function acceptApplicationAction(form) {
  const id = form.get("id");
  const driverId = form.get("driver");
  await connectDB();
  await DriverApplication.updateOne({ _id: id }, { status: "accepted" });
  await User.updateOne({ _id: driverId }, { verificationStatus: true });
  revalidateTag("driver-status");
}

export async function cancelApplicationAction(form) {
  const id = form.get("id");
  await connectDB();
  await DriverApplication.updateOne({ _id: id }, { status: "canceled" });
  revalidateTag("driver-status");
}
