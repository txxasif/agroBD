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
  const {
    description,
    category,
    priceBn,
    quantityBn,
    unit,
    photo,
    createdAt,
    sellerLocationBn,
  } = post;
  const { division, district, upazilla } = sellerLocationBn;
  const location = `${upazilla} , ${district} , ${division}`;
  console.log(post, "loc");
  const router = useRouter();
  const buy = () => {
    router.push(`/product/${post._id}`);
  };
  return (
    <div className="border max-w-xs m-2 px-3 py-2 ">
      <div className="relative">
        <Image
          className="w-full h-[200px] p- rounded-sm"
          src={photo}
          width={500}
          height={500}
        />
        <div className="absolute bottom-1 left-1 bg-slate-50 dark:bg-slate-700 flex items-center justify-center gap-x-2 px-2 py-2">
          <LocationSvg className="w-4 h-4" />
          <Label>{location}</Label>
        </div>
      </div>
      <div className="">
        <div className="flex justify-center pt-1">
          <h1 className="text-2xl">{category}</h1>
        </div>
        <h1 className="opacity-70 px-3  pt-1">{description}</h1>
        <div className="flex flex-row items-center justify-between gap-x-3 px-3 text-lg pt-1 opacity-80">
          <h1>
            {priceBn} ৳ / {unit}
          </h1>
          <h1>
            {quantityBn} {unit}
          </h1>
        </div>
      </div>
      <Button
        variant="secondary"
        className="flex items-center justify-center w-full mt-1"
        onClick={buy}
      >
        Buy
      </Button>
    </div>
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
