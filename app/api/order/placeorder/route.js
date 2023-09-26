import { placeOrderModel } from "@/models/oreder.model";
import { NextResponse } from "next/server";
export async function POST(req) {
  const body = await req.json();
  const response = await placeOrderModel(body);
  console.log(response);
  if (response) {
    return NextResponse.json(
      {
        msg: "true",
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      ({
        msg: "went wrong",
      },
      { status: 400 })
    );
  }
}
