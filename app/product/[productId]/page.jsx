"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import Link from "next/link";
import { ClockSvg, CategorySvg, TakaSvg, QuantitySvg, LocationSvg } from "@/icons/icons";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Page({ params }) {
    const productId = params.productId;
    const productUrl = `/api/product/${productId}`;
    const getUserDetails = async () => {
        const { userDetails: userData, productDetails: productData } = await axios.get(productUrl).then(res => res.data.data[0]);
        const date = new Date(productData.createdAt);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const finalDate = `${day}/${month}/${year}`;
        productData["createdAt"] = finalDate;

        return { userData, productData };

    }
    const { data, isLoading } = useQuery({
        queryFn: getUserDetails
    });
    console.log(data, "");
    if (isLoading) {
        return <div>Loading</div>
    }
    return (
        <main className="container flex items-center justify-center  max-w-full ">
            <div className=" md:gap-5 flex flex-col md:flex-row border  ">
                {/* photo container */}
                <div className=" max-w-full flex-1 p-2">
                    <Image className="h-[300px] md:h-[400px] rounded-sm" src={data.productData.photo} width={500} height={500} />
                </div>
                {/* product container */}
                <div className="flex flex-col md:gap-y-4 ">
                    {/* User Information Container */}

                    <div className="flex flex-col self-start">
                        {/* <Image src={data.userData?.photo} width={50} height={50} className="object-cover rounded-md" /> */}

                        <div className="px-2 md:px-0">
                            <Link href={"#"} className=" dark:text-[#176B87] ">{data.userData.name}</Link>

                            <div className="flex items-center gap-x-2 opacity-60 ">
                                <ClockSvg className="w-4 h-4" />
                                <p >{data.productData.createdAt}</p>
                            </div>
                            {/* <div className="flex items-center gap-x-2 opacity-60">
                                <Phone className="w-4 h-4" />
                                <p className="border-b">+8801679806197</p>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-full border my-1"></div>
                    {/* Product Details container */}
                    <div>
                        <h1 className="text-base w-[40vh] px-2 md:px-0 opacity-70">{data.productData.description}</h1>

                    </div>
                    <div className="w-full border my-1"></div>
                    <div className="px-2 md:px-0 grid  md:grid-cols-2 gap-2">
                        <div className="flex items-center opacity-70 mt-2 gap-2">
                            <TakaSvg className="w-4 h-4" />
                            <h1>{data.productData.price} টাকা / {data.productData.unit}</h1>
                        </div>

                        <div className="flex items-center opacity-70 mt-2 gap-2">
                            <QuantitySvg className="w-4 h-4" />
                            <h1>{data.productData.quantity} {data.productData.unit}</h1>
                        </div>
                        <div className="flex items-center opacity-70 mt-2 gap-2">
                            <LocationSvg className="w-4 h-4" />
                            <h1>সোনাগাজী,ফেনী,চট্টগ্রাম</h1>
                        </div>
                        <div className="flex items-center opacity-70 mt-2 gap-2">
                            <CategorySvg className="w-4 h-4" />
                            <h1>{data.productData.category}</h1>
                        </div>
                    </div>
                    <div className="w-full border my-1"></div>
                    <div className=" w-full flex items-center justify-center">
                        <Input placeholder="Enter Quantity" className="max-w-xs" />
                    </div>
                </div>

            </div>

        </main>
    )
}

