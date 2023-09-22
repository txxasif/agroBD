import connectDB from "@/models/mongoose";
import { getProductDataModel } from "@/models/post.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  const productId = params.productId;
  const response = await getProductDataModel(productId);
  if (response.status) {
    return NextResponse.json({ data: response.data }, { status: 200 });
  } else {
    return NextResponse.json({ msg: "error" }, { status: 404 });
  }
}
