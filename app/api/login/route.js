import connectDB from "@/models/mongoose";
import { checkLogin } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  console.log(body);
  const response = await checkLogin(body);
  // console.log(response);
  if (response.status) {
    return NextResponse.json(
      { message: "Login Success", data: response.data },
      { status: 201 }
    );
  } else if (response.status == false) {
    return NextResponse.json({ message: "Wrong Password!" }, { status: 401 });
  } else {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
