import DriverApplication from "./application.schema";

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
  console.log("hii");
  try {
    const data = await DriverApplication.find({ status: "pending" }).select(
      "driverId _id createdAt"
    );
    return data;
  } catch (errors) {
    console.log(errors);
  }
}
export async function getApplicationById(id) {
  const res = await DriverApplication.find({ _id: id });
  return res.json();
}
