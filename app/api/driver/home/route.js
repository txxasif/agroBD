import connectDB from "@/models/mongoose";
import { allOrdersModel } from "@/models/oreder.model";
import { NextResponse } from "next/server";
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page");
  const fdivision = splitFixer(searchParams.get("fdivision"));
  const fdistrict = splitFixer(searchParams.get("fdistrict"));
  const fupazilla = splitFixer(searchParams.get("fupazilla"));
  const tdivision = splitFixer(searchParams.get("tdivision"));
  const tdistrict = splitFixer(searchParams.get("tdistrict"));
  const tupazilla = splitFixer(searchParams.get("tupazilla"));
  const finalObj = {};
  if (fdivision) {
    finalObj["sellerLocation.division"] = fdivision;
  }

  if (fdistrict) {
    finalObj["sellerLocation.district"] = fdistrict;
  }
  if (fupazilla) {
    finalObj["sellerLocation.upazilla"] = fupazilla;
  }
  if (tdivision) {
    finalObj["buyerLocation.division"] = tdivision;
  }
  if (tdistrict) {
    finalObj["buyerLocation.district"] = tdistrict;
  }
  if (tupazilla) {
    finalObj["buyerLocation.upazilla"] = tupazilla;
  }
  await connectDB();
  const data = await allOrdersModel(finalObj, 1);

  return NextResponse.json({ data }, { status: 200 });
}

function splitFixer(str) {
  const strings = str.split("_");
  if (strings.length <= 1) return str;
  let finalString = "";
  for (let val of strings) {
    if (finalString.length) {
      finalString += ` ${val}`;
    } else {
      finalString += val;
    }
  }
  return finalString;
}
