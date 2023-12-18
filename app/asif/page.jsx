import connectDB from "@/models/mongoose";
import User from "@/models/user.schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Fake() {
  async function updateRole() {
    "use server";
    await connectDB();
    const res = await User.updateMany({}, { $set: { role: "user" } });
    console.log(res);
  }
  // const session = await getServerSession(authOptions);
  // console.log(session.user);

  return (
    <div className="grid gap-1 grid-cols-2">
      <form action={updateRole}>
        <button type="submit"> Update</button>
      </form>
    </div>
  );
}
