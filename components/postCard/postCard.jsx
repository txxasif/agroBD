"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TakaSvg, QuantitySvg, LocationSvg, CategorySvg } from "@/icons/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
export default function PostCard({ seller, post }) {
  const { description, category, price, quantity, unit, photo, createdAt } =
    post;
  const router = useRouter();
  const buy = () => {
    router.push(`/product/${post._id}`);
  };
  return (
    <Card className="w-[350px] border shadow-lg">
      <CardHeader>
        <Image
          src={photo}
          width="300"
          height="300"
          alt=""
          className="h-56 w-fit object-cover"
        />
      </CardHeader>
      <CardContent>
        <div className="border w-full my-2"></div>
        <CardDescription>{description}</CardDescription>
        <div className="border w-full my-2"></div>
        <div>
          <div className="flex items-center opacity-70 mt-2 gap-2">
            <TakaSvg className="w-4 h-4" />
            <Label>
              {price} টাকা / {unit}
            </Label>
          </div>

          <div className="flex items-center opacity-70 mt-2 gap-2">
            <QuantitySvg className="w-4 h-4" />
            <Label>
              {quantity} {unit}
            </Label>
          </div>
          <div className="flex items-center opacity-70 mt-2 gap-2">
            <LocationSvg className="w-4 h-4" />
            <Label>সোনাগাজী,ফেনী,চট্টগ্রাম</Label>
          </div>
          <div className="flex items-center opacity-70 mt-2 gap-2">
            <CategorySvg className="w-4 h-4" />
            <Label>{category}</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Button onClick={buy} className="px-11 py-4">
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
}

const PostCard1 = ({ seller, post }) => {
  const router = useRouter();
  const buy = () => {
    router.push(`/product/${post._id}`);
  };

  const { description, category, price, quantity, unit, photo, createdAt } =
    post;
  const date = new Date(createdAt).toLocaleString();

  return (
    <div className="card w-96  shadow-xl ">
      <figure>
        <Image src={photo} width="500" height="500" alt="" />
      </figure>
      <div className="card-body ">
        <div className="px-3">
          <p>{description}</p>
        </div>
        <div className={styles.productDetailsContainer}>
          <p>
            {" "}
            <Image src={"/icons/category.png"} width={10} height={10} />{" "}
            {category}
          </p>
          <p>Price : {price}$</p>
          <p>Unit: {unit}</p>
          <p>Available: {quantity}</p>
        </div>
        <div onClick={buy} className={styles.button}>
          Buy Now
        </div>
      </div>
    </div>
  );
};
