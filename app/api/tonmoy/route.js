import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Email already in use" },
    { status: 400 }
  );
}
