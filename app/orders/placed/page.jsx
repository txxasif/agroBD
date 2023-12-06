import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { placedOrders } from "@/helper/order.helper";
import OrderCard from "@/components/orderCard/orderCard";
import { redirect } from "next/navigation";

export default async function PlacedOrders() {
  const data = await getServerSession(authOptions);
  if (!data) {
    redirect("/login");
  }
  const uId = data.user._id;
  const orderData = await placedOrders(uId);
  console.log(orderData, "da");

  return (
    <main className="container">
      <div className="flex">
        {orderData.map((order, indx) => (
          <OrderCard key={indx} data={order} />
        ))}
      </div>
    </main>
  );
}
