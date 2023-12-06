import District from "./district.schema";
export async function pushDistricts(districts) {
  try {
    await District.insertMany([...districts]);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function getSpecificDivision(division) {
  const response = await District.aggregate([
    {
      $match: { divisionName: division },
    },
    {
      $project: {
        upazilla: 0,
        __v: 0,
        divisionName: 0,
      },
    },
  ]);
  console.log(response);
  return response;
}
export async function getUpazilla(district) {
  const response = await District.aggregate([
    {
      $match: { _id: district },
    },
    {
      $project: {
        upazilla: 1,
      },
    },
  ]);

  return response;
}
