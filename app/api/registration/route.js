import connectDB from "@/models/mongoose";
import { createUser } from "@/models/user.model";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log(body);
    const status = await createUser(body);
    if (status.status) {
      return NextResponse.json(
        { msg: true, user: status.data },
        { status: 201 }
      );
    } else if (status.status === false) {
      return NextResponse.json({ msg: false }, { status: 409 });
    } else {
      return NextResponse.json({ msg: null }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: null }, { status: 500 });
  }
}
