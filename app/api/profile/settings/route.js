import connectDB from "@/models/mongoose";
import { getUserSettings, setUserSettings } from "@/models/user.model";
import { NextResponse } from "next/server";
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const uId = searchParams.get("id");
  console.log(uId);
  await connectDB();
  const data = await getUserSettings(uId);
  console.log(data);
  return NextResponse.json({ msg: "ok", data: data });
}
export async function POST(req) {
  const data = await req.json();
  const response = await setUserSettings(data.id, data.userData);
  console.log(response);

  if (response) return NextResponse.json({ msg: "ok" });
  else return NextResponse.json({ err: "error" }, { status: 400 });
}
