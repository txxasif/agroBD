import axios from "axios";
export async function uploadPhoto(photo) {
  const formData = new FormData();
  formData.append("file", photo);
  formData.append("upload_preset", "agrobd");
  let result = await axios.post(
    "https://api.cloudinary.com/v1_1/dupffxzyk/image/upload",
    formData
  );
  console.log(result, "p");
  return result;
}
export async function createUserHelper(form) {
  return await axios.post("/api/registration", form);
}
export async function loginUserHelper(data) {
  return await axios.post("/api/login", data);
}
export async function createPostHelper(data) {
  return await axios.post("/api/profile/createpost", data);
}
