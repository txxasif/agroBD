import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getOrder } from "@/helper/order.helper";
import OrderCard from "@/components/orderCard/orderCard";
import { redirect } from "next/navigation";
export default async function Orders() {
  const data = await getServerSession(authOptions);
  if (!data) {
    redirect("/login");
  }
  const uId = data.user._id;
  const orderData = await getOrder(uId);
  console.log(orderData, "da");

  return (
    <main className="w-full flex items-center justify-center py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {orderData.map((order, indx) => (
          <OrderCard key={indx} data={order} />
        ))}
      </div>
    </main>
  );
}
