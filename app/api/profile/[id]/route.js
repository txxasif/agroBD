import connectDB from "@/models/mongoose";
import { getUserPostsModel } from "@/models/post.model";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
  await connectDB();
  const response = await getUserPostsModel(params.id);
  //  console.log(req.query.id);
  console.log(response, "pro");
  if (response.status) {
    return NextResponse.json(
      { message: "done", data: response.data },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }
}
