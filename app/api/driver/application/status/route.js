import DriverApplication from "@/models/application.schema";
import connectDB from "@/models/mongoose";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const param = req.nextUrl.searchParams;
  const id = param.get("id");
  await connectDB();
  const response = await DriverApplication.find({ driverId: id }).select(
    "status"
  );
  if (response.length) {
    const { status } = response[0];
    return NextResponse.json({ status: status });
  }
  return NextResponse.json({ status: "not-applied" });
}
