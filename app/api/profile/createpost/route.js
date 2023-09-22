import connectDB from "@/models/mongoose";
import { createPostModel } from "@/models/post.model";
import { NextResponse } from "next/server";
export async function POST(req) {
  const body = await req.json();
  connectDB();
  const result = await createPostModel(body);
  if (result) {
    return NextResponse.json({ message: "done" }, { status: 201 });
  } else {
    return NextResponse.json({ message: "error" }, { status: 404 });
  }
}
