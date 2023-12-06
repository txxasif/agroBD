import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { acceptOrder } from "@/helper/order.helper";
import Image from "next/image";
import { ServerActionButtonForm } from "../server-action/serverActionButtonForm";
export function ReceivedOrdersCard({ data }) {
  const { quantityBn, totalPriceBn, productDetails, _id } = data;
  const { photo, unit } = productDetails;

  return (
    <Card className="flex flex-col w-fit">
      <CardHeader>
        <Image
          className="w-full h-[120px] rounded-sm"
          src={photo}
          width={320}
          height={320}
        ></Image>
      </CardHeader>
      <CardContent className="flex flex-col">
        <p>
          Quantity: {quantityBn} / {unit}
        </p>
        <Label>Total Price: {totalPriceBn}</Label>
      </CardContent>
      <CardFooter className="flex justify-between">
        <ServerActionButtonForm
          value={_id}
          inputName={"product_id"}
          btnName={"Accept"}
          callbackFn={acceptOrder}
        />
        <form action="">
          <Button className="bg-red-500 text-white">Cancel</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
