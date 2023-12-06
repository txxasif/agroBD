import { NextResponse } from "next/server";
import { getUserNameAndPhoto } from "@/models/user.model";
import connectDB from "@/models/mongoose";
export async function GET(req, { params }) {
  console.log("hi from");
  await connectDB();
  const uId = params.userId;
  const response = await getUserNameAndPhoto(uId);
  console.log(response);
  return NextResponse.json({ user: response }, { status: 200 });
}
