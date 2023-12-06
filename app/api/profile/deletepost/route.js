import connectDB from "@/models/mongoose";
import { deleteUserPost } from "@/models/post.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();
  await connectDB();
  const res = await deleteUserPost(id);
  if (res) {
    return NextResponse.json({ msg: "success" });
  } else {
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
}
