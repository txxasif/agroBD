// import {
//   getAllDivisions,
//   pushDivision,
// } from "@/models/locationModel/division.model";
// import connectDB from "@/models/mongoose";
// //import connectDB from "@/models/mongoose";
// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   const url = "https://bdapis.com/api/v1.1/division/";
//   await connectDB();
//   console.log("hiit");
//   const data = await getAllDivisions();
//   const districtArray = [];
//   for (let div of data) {
//     let finalUrl = url + div._id;
//     const dis = await axios.get(finalUrl);
//     const dis1 = dis.data.data;
//     for (let dist of dis1) {
//       const upazillaArray = [];
//       for (let upa of dist.upazilla) {
//         const upaZilla = await fetchTranslation(upa);
//         const upazilla = {
//           upazillaName: upa,
//           upazillaNameBangla: upaZilla,
//         };
//         upazillaArray.push(upazilla);
//       }
//       const text = await fetchTranslation(dist.district);
//       const district = {
//         divisionName: div._id,
//         districtName: dist.district,
//         districtNameBangla: text,
//         upazilla: upazillaArray,
//       };
//       districtArray.push(district);
//     }
//   }
//   console.log(districtArray);
//   // const response = await pushDistricts(districtArray);

//   if (response) {
//     return NextResponse.json(
//       { msg: "Ok", data: districtArray },
//       { status: 200 }
//     );
//   }
//   return NextResponse.json(
//     { msg: "error", data: districtArray },
//     { status: 400 }
//   );

//   //pushing divisions into the database

//   /* const divisionUrl = "https://bdapis.com/api/v1.1/divisions";
//  const response = await axios.get(divisionUrl);
//   const divisions = response.data.data;
//   const divisionArray = [];
//   for (let div of divisions) {
//     const text = await fetchTranslation(div.division);
//     const division = {
//       divisionName: div.division,
//       divisionNameBangla: text,
//     };
//     divisionArray.push(division);
//   }
//   const finalResponse = await pushDivision(divisionArray);
//   if (finalResponse) {
//     return NextResponse.json(
//       { msg: "OK", data: divisionArray },
//       { status: 200 }
//     );
//   } else {
//     return NextResponse.json({ msg: "Error" }, { status: 400 });
//   }
//   */
// }
