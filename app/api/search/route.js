import { NextResponse } from "next/server";
export async function GET(req, res) {
  console.log("hiitt");
  const params = req.nextUrl.searchParams;
  const division = params.get("division");
  const district = params.get("district");
  const upazilla = params.get("upazilla");
  const category = params.get("category");
  let obj = {};
  if (division) {
    obj.division = division;
  } else if (district) {
    obj.district = district;
  } else if (upazilla) {
    obj.upazilla = upazilla;
  }

  let finalObj = {
    sellerLocation: {
      ...obj,
    },
  };
  if (category) {
    finalObj.category = category;
  }
  console.log(finalObj);

  console.log(division, district, upazilla, category);
  return NextResponse.json({ msg: "done" });
}
