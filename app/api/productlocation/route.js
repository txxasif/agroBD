import { setProductLocation } from "@/models/post.model";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const data = await setProductLocation();

  return NextResponse.json({ data });
}
