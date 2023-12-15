import { fakeSearch } from "@/models/post.model";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  console.log("hiitt");
  const params = req.nextUrl.searchParams;
  const division = params.get("division");
  const district = params.get("district");
  const upazilla = params.get("upazilla");
  const category = params.get("category");
  const page = params.get("page");
  let finalObj = {};
  if (division) {
    finalObj["sellerLocation.division"] = division;
  } else if (district) {
    finalObj["sellerLocation.district"] = district;
  } else if (upazilla) {
    finalObj["sellerLocation.upazilla"] = upazilla;
  }
  if (category) {
    finalObj.category = category;
  }
  if (page) {
    finalObj.page = page;
  }
  const data = await fakeSearch(finalObj);
  console.log(finalObj);
  console.log(data);
  console.log(division, district, upazilla, category);
  return NextResponse.json({ msg: "done" });
}
