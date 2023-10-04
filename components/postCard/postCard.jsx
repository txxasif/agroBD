"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { TakaSvg, QuantitySvg, EmailSvg } from "@/icons/icons"
import Image from "next/image"
import { useRouter } from "next/navigation"
export default function PostCard({ seller, post }) {
  const { description, category, price, quantity, unit, photo, createdAt } = post;
  const date = new Date(createdAt).toLocaleString();
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <Image src={photo} width='300' height='300' alt="" />
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <div className="flex items-center opacity-70 mt-2 gap-2">
          <TakaSvg className="w-4 h-4" />
          <Label>{price} / {unit}</Label>
        </div>

        <div className="flex items-center opacity-70 mt-2 gap-2">
          <QuantitySvg className="w-4 h-4" />
          <Label>{quantity}</Label>
        </div>

      </CardContent>

    </Card>
  )
}

const PostCard1 = ({ seller, post }) => {
  const router = useRouter();
  const buy = () => {
    router.push(`/product/${post._id}`)
  }

  const { description, category, price, quantity, unit, photo, createdAt } = post;
  const date = new Date(createdAt).toLocaleString();

  return (
    <div className="card w-96  shadow-xl ">
      <figure>
        <Image src={photo} width='500' height='500' alt="" />
      </figure>
      <div className="card-body ">
        <div className="px-3">
          <p>{description}</p>
        </div>
        <div className={styles.productDetailsContainer}>
          <p> <Image src={'/icons/category.png'} width={10} height={10} /> {category}</p>
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