import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req, res) {
  const user = await getServerSession(authOptions);

  // const data = await Product.find({});
  // // const x = data.map(async (data) => {
  // //   let _id = new mongoose.Types.ObjectId(data._id);
  // //   let priceBn = await translateToBangla(data.price);
  // //   let quantityBn = await translateToBangla(data.quantity);
  // //   return Product.updateOne({ _id }, { $set: { priceBn, quantityBn } });
  // // });
  // // await Promise.all(x);

  return NextResponse.json(user);
}
