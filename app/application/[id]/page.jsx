import {
  acceptApplicationAction,
  cancelApplicationAction,
} from "../../../action/server-action";
import { SpinnerButtonServer } from "@/components/ui/server-button";
import { dateToString } from "@/helper/month.helper";
import axios from "axios";
import Image from "next/image";

export default async function ApplicationApproval({ params }) {
  const id = params.id;
  const data = await fetch(
    `${process.env.NEXTAUTH_URL}/api/driver/application?id=${id}`,
    { cache: "no-cache", next: { tags: ["driver-status"] } }
  )
    .then((res) => res.json())
    .then((res) => res.data[0]);
  const {
    _id,
    driverId,
    nidNo,
    frontPhoto,
    backPhoto,
    status,
    dob,
    createdAt,
  } = data;
  const dateOfApplied = dateToString(createdAt);
  const user = await axios
    .get(`${process.env.NEXTAUTH_URL}/api/profile/settings?id=${driverId}`)
    .then((res) => res.data.data);
  const { name, photo, locationBn } = user;
  const { division, district, upazilla, localAddress } = locationBn;
  console.log(user);

  return (
    <main className="container">
      <h1 className="text-2xl my-3">Applicant Details</h1>
      {/* User Details Container */}
      <div className="flex space-x-1">
        <Image className="w-60 h-52" src={photo} width={400} height={400} />
        <div className="space-y-1">
          <h2>Name : {name}</h2>
          <h2>
            Location :
            {`${localAddress} , ${upazilla} , ${district} , ${division}`}
          </h2>
          <h2>NID NO: {nidNo}</h2>
          <h2>DOB: {dob}</h2>
          <h2>Applied Date: {dateOfApplied}</h2>
          <h2>Status: {status}</h2>
          <div className="flex items-center justify-start space-x-2">
            <form action={acceptApplicationAction}>
              <input type="hidden" name="id" value={_id} />
              <input type="hidden" name="driver" value={driverId} />
              <SpinnerButtonServer name="Accept" />
            </form>
            <form action={cancelApplicationAction}>
              <input type="hidden" name="id" value={_id} />
              <SpinnerButtonServer name="Cancel" />
            </form>
          </div>
        </div>
      </div>
      {/* Card Information */}
      <h1 className="text-2xl my-3">NID Card Information</h1>
      <div className="flex space-x-1">
        <div>
          <p>Front Photo</p>
          <Image
            className="w-full h-52"
            src={frontPhoto}
            width={400}
            height={400}
          />
        </div>
        <div>
          <p>Back Photo</p>
          <Image
            className="w-full h-52"
            src={backPhoto}
            width={400}
            height={400}
          />
        </div>
      </div>
    </main>
  );
}
