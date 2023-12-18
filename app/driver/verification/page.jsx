import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function DriverVerification() {
  const session = await getServerSession(authOptions);
  console.log(session.user._id);
  return <h1>Hi from verification</h1>;
}
