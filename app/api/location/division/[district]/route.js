import { getSpecificDivision } from "@/models/locationModel/district.model";
import connectDB from "@/models/mongoose";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
  await connectDB();
  const response = await getSpecificDivision(params.district);
  return NextResponse.json(
    {
      msg: "Ok",
      data: response,
    },
    { status: 200 }
  );
}
