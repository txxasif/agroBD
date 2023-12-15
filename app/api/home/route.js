import connectDB from "@/models/mongoose";
import { getAllPostsModel } from "@/models/post.model";
import { NextResponse } from "next/server";
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page");
  const division = searchParams.get("division");
  const district = searchParams.get("district");
  const upazilla = searchParams.get("upazilla");
  const category = searchParams.get("category");
  let finalObj = {};
  if (division) {
    finalObj["sellerLocation.division"] = division;
  }
  if (district) {
    finalObj["sellerLocation.district"] = district;
  }
  if (upazilla) {
    finalObj["sellerLocation.upazilla"] = upazilla;
  }
  if (category) {
    finalObj.category = category;
  }
  await connectDB();
  const data = await getAllPostsModel(finalObj, page);
  return NextResponse.json({ data }, { status: 200 });
}
// export const runtime = "edge";
