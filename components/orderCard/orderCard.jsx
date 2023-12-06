"use client";
import React from "react";
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
import Image from "next/image";

export default function OrderCard({ data }) {
  const { quantityBn, totalPriceBn, productDetails, status } = data;
  const { photo, unit } = productDetails;

  return (
    <Card className="flex flex-col">
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
      <CardFooter>
        <h1>Status : {status}</h1>
      </CardFooter>
    </Card>
  );
}
