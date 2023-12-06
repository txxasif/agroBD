import District from "@/models/locationModel/district.schema";
import connectDB from "@/models/mongoose";
import { NextResponse } from "next/server";
export async function GET() {
  await connectDB();
  try {
    const division = await District.aggregate([
      {
        $unwind: "$upazilla",
      },
      {
        $set: { "upazilla._id": { $toLower: "$upazilla.upazillaName" } },
      },
      {
        $group: {
          _id: "$_id",
          upazilla: { $push: "$upazilla" },
        },
      },
      {
        $merge: "districts",
      },
    ]);
    return NextResponse.json({ msg: "done", division });
  } catch (err) {
    console.log(err);
  }
}
