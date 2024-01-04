import { getServerSession } from "next-auth";
import Profile from "@/components/profile/profile";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <h1>Loading</h1>;
  }
  const userData = session.user;
  const uId = params.userId;
  const sessionId = userData._id.toString();
  const isMyOwnProfile = uId === sessionId;

  return (
    <main className="px-32 py-9">
      {isMyOwnProfile ? <Profile user={userData} /> : <AnotherProfile />}
    </main>
  );
}
function AnotherProfile() {
  return (
    <div>
      <h1>Another Profile</h1>
    </div>
  );
}
