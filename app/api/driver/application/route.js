import {
  createNewDriverApplicationModel,
  getApplicationById,
} from "@/models/application.model";
import connectDB from "@/models/mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  await connectDB();
  const response = await createNewDriverApplicationModel(body);

  if (response) {
    return NextResponse.json({ msg: "done" });
  }
  return NextResponse.json(
    { msg: "something went wrong" },
    { status: "error" }
  );
}
export async function GET(req, res) {
  await connectDB();
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  console.log(id);
  const response = await getApplicationById(id);
  return NextResponse.json({ data: response });
}
