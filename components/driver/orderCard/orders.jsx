import OrderCardDriver from "./card";
export default async function OrdersCardDriver({ orders }) {
  return (
    <div className="flex space-x-2">
      {orders.map((order, idx) => (
        <OrderCardDriver key={idx} order={order} />
      ))}
    </div>
  );
}
