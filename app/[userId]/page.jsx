import { getServerSession } from "next-auth";
import Profile from "@/components/profile/profile";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AnotherProfile from "@/components/profile/anotherProile";
export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const userData = session.user;
  const uId = params.userId;
  const sessionId = userData._id.toString();
  const isMyOwnProfile = uId === sessionId;

  return (
    <main className="px-32 py-9">
      {isMyOwnProfile ? (
        <Profile user={userData} />
      ) : (
        <AnotherProfile uId={uId} />
      )}
    </main>
  );
}
