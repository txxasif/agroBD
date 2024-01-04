import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DriverSearchFiler from "@/components/driver/searchFiler";
import Pagination from "@/components/pagiNation/pagiNation";
import OrdersCardDriver from "@/components/driver/orderCard/orders";
export default async function DriverHomePage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const page = searchParams.page || 1;
  const fdivision = searchParams.fdivision || "";
  const fdistrict = searchParams.fdistrict || "";
  const fupazilla = searchParams.fupazilla || "";
  const tdivision = searchParams.tdivision || "";
  const tdistrict = searchParams.tdistrict || "";
  const tupazilla = searchParams.tupazilla || "";
  const data = await fetch(
    `${process.env.NEXTAUTH_URL}/api/driver/home?page=${page}&fupazilla=${fupazilla}&fdivision=${fdivision}&fdistrict=${fdistrict}&tupazilla=${tupazilla}&tdivision=${tdivision}&tdistrict=${tdistrict}`,
    {
      cache: "no-cache",
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);
  console.log(data.result);
  return (
    <main className="container">
      <div className="flex justify-center">
        <DriverSearchFiler />
      </div>
      <OrdersCardDriver orders={data?.result} />

      <Pagination totalPages={data?.totalPages} currentPage={page} />
    </main>
  );
}
