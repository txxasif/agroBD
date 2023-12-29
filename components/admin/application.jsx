import { dateToString } from "@/helper/month.helper";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
async function Fake({ info }) {
  const { driverId, _id, createdAt } = info;
  const date = dateToString(createdAt);
  const { data } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/profile/settings?id=${driverId}`
  );
  const { name, photo } = data.data;

  return (
    <div className="flex items-center space-x-4 shadow-lg w-fit px-3 py-2 border">
      <Image
        className="rounded-full w-14 h-14 "
        src={photo}
        width={100}
        height={100}
      />
      <div>
        <h2>{name}</h2>
        <h2>{date}</h2>
      </div>
      <Link
        href={`/application/${_id}`}
        className="dark:bg-white dark:text-black bg-black text-white rounded px-2 py-2"
      >
        View Application
      </Link>
    </div>
  );
}
export async function ApplicationList({ data }) {
  console.log(data);
  return (
    <div className="flex space-x-2 flex-wrap">
      {data.map((info, idx) => (
        <Fake key={idx} info={info} />
      ))}
    </div>
  );
}
