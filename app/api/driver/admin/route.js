import { showAllDriverApplications } from "@/models/application.model";
import connectDB from "@/models/mongoose";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await connectDB();
  const data = await showAllDriverApplications();
  return NextResponse.json({ data });
}
