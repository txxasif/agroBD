import { getAllDivisions } from "@/models/locationModel/division.model";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await getAllDivisions();
  console.log(response);
  return NextResponse.json({ msg: "OK", data: response }, { status: 200 });
}
