import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ReceivedOrdersCard } from "@/components/orderCard/receivedCard";
import { receivedOrder } from "@/helper/order.helper";
import { getServerSession } from "next-auth";
import { unstable_cache, unstable_noStore as noStore } from "next/cache";
export const dynamic = "force-dynamic";
const getCachedReceivedData = unstable_cache(
  async (id) => receivedOrder(id),
  undefined,
  {
    tags: ["received-orders"],
    revalidate: 0.1,
  }
);

export default async function ReceivedOrders() {
  const data = await getServerSession(authOptions);
  if (!data) return <h1>Loading</h1>;
  const uId = data.user._id;
  noStore();
  const orderArray = await getCachedReceivedData(uId);

  return (
    <main className="container">
      {orderArray.map((order, indx) => (
        <ReceivedOrdersCard key={indx} data={order} />
      ))}
    </main>
  );
}
