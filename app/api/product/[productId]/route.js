import connectDB from "@/models/mongoose";
import { getProductDataModel, getProductDataModel1 } from "@/models/post.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  const productId = params.productId;
  const response = await getProductDataModel1(productId);
  return NextResponse.json({ data: response }, { status: 200 });
}
