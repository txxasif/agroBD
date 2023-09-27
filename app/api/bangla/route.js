import { pushDivision } from "@/models/locationModel/division.model";
//import connectDB from "@/models/mongoose";
import axios from "axios";
import { NextResponse } from "next/server";
const fetchTranslation = async (text) => {
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&q=${text}&sl=en&tl=bn`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Extract the translated text from the response data
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      const translatedText = data[0][0][0];
      return translatedText;
    }
  } catch (error) {
    console.error("Error fetching translation:", error);
  }
};
const divisionUrl = "https://bdapis.com/api/v1.1/divisions";
export async function GET(req) {
  const response = await axios.get(divisionUrl);
  const divisions = response.data.data;
  const divisionArray = [];
  for (let div of divisions) {
    const text = await fetchTranslation(div.division);
    const division = {
      divisionName: div.division,
      divisionNameBangla: text,
    };
    divisionArray.push(division);
  }
  const finalResponse = await pushDivision(divisionArray);
  if (finalResponse) {
    return NextResponse.json(
      { msg: "OK", data: divisionArray },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ msg: "Error" }, { status: 400 });
  }
}
