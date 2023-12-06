import Division from "./division.schema";
export async function pushDivision(divisions) {
  let status = false;
  try {
    const response = await Division.insertMany([...divisions]);
    return true;
  } catch (e) {
    return false;
  }
}
export async function getAllDivisions() {
  const response = await Division.find({});
  return response;
}
