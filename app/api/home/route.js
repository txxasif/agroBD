import connectDB from "@/models/mongoose";
import { getAllPostsModel } from "@/models/post.model";
import { NextResponse } from "next/server";
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page");
  //console.log(page, "from paginario");
  await connectDB();
  const data = await getAllPostsModel(page);
  return NextResponse.json({ data }, { status: 200 });
}
// export const runtime = "edge";
