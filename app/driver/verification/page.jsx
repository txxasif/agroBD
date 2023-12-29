import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import VerificationForm from "@/components/verification/verficationForm";
import axios from "axios";
import { getServerSession } from "next-auth/next";

export default async function DriverVerification() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <h1>loadin</h1>;
  }

  const { role, photo, name, _id } = session.user;
  const { status } = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/driver/application/status?id=${_id}`)
    .then((res) => res.data);
  console.log(status, "status");
  if (status === "pending") {
    return (
      <h1>
        Thank You {name} , Your Application Is Waiting For Admin Approval.
      </h1>
    );
  }
  if (status === "accepted") {
    return <h1>Your Application is approved. Now You can Take Orders. </h1>;
  }
  return (
    <main className="w-full h-screen flex justify-center">
      <div>
        <h1>{name} , please submit your NID information for verification </h1>
        <VerificationForm id={_id.toString()} />
      </div>
    </main>
  );
}
