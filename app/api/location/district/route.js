import { getUpazilla } from "@/models/locationModel/district.model";
import connectDB from "@/models/mongoose";

export async function GET(req) {
  await connectDB();
  const searchParams = req.nextUrl.searchParams;
  const districtName = searchParams.get("district");
  const response = await getUpazilla(districtName);
  return Response.json({ msg: "Ok", data: response }, { status: 200 });
}
