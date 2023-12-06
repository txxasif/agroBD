import { getSpecificDivision } from "@/models/locationModel/district.model";
import { getAllDivisions } from "@/models/locationModel/division.model";
import connectDB from "@/models/mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const response = await getAllDivisions();
  console.log(response);
  return NextResponse.json({ msg: "OK", data: response }, { status: 200 });
}
