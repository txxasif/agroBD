import { UserSetting } from "@/components/userSetting/usersetting";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function Settings() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <UserSetting userSession={session.user} />
    </div>
  );
}
