import { addToCart } from "@/models/user.model";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  const body = await req.json();
  const result = await addToCart(body);
  console.log(body);
  if (result) {
    return NextResponse.json(
      {
        message: "done",
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        message: "something went wrong",
      },
      {
        status: 404,
      }
    );
  }
}
