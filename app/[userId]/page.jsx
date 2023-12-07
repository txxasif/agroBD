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

// export async function getServerSideProps(context){
//     const SERVER_URL = process.env.NODE_ENV === "production" ? "https://your-production-server.com" : "http://localhost:3000";

//     const { userId } = context.params;
//     console.log(userId)
//     const url = `${SERVER_URL}/api/post/${userId}`;
//     const response = await axios.get(url);
//     console.log(response.data.data,'from server');
//     return {
//         props: {
//            userData: response.data.data
//         }
//     }
// }
