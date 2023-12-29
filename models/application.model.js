import DriverApplication from "./application.schema";
import connectDB from "./mongoose";

export async function createNewDriverApplicationModel(data) {
  try {
    const application = new DriverApplication({ ...data });
    await application.save();
    return true;
  } catch (errors) {
    console.log(errors);
    return false;
  }
}
export async function showAllDriverApplications() {
  await connectDB();
  console.log("hii");
  try {
    const data = await DriverApplication.find({ status: "pending" }).select(
      "driverId _id createdAt"
    );
    return data;
  } catch (errors) {
    return [];
  }
}
export async function getApplicationById(id) {
  const res = await DriverApplication.find({ _id: id });
  return res;
}
