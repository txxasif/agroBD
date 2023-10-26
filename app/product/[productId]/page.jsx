"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useReducer } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import Link from "next/link";
import {
  ClockSvg,
  CategorySvg,
  TakaSvg,
  QuantitySvg,
  LocationSvg,
} from "@/icons/icons";
import { Input } from "@/components/ui/input";
import Location from "@/components/location/location";
import { Button } from "@/components/ui/button";
import { ProductSkeleton } from "@/components/skeleton/product";
import { useToast } from "@/components/ui/use-toast";
const initialData = {
  buyerLocation: {
    division: "",
    district: "",
    upazilla: "",
    localAddress: "",
  },
  quantity: 0,
  totalPrice: 0,
};
function locationReducer(state, action) {
  switch (action.type) {
    case "location":
      return {
        ...state,
        buyerLocation: { ...state.buyerLocation, ...action.payload },
      };
    case "localAddress":
      return { ...state, ...action.payload };
    case "quantity":
      return { ...state, quantity: action.payload };
    case "totalPrice":
      return { ...state, totalPrice: action.payload };
    case "others":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
export default function Page({ params }) {
  const { toast } = useToast();
  const productId = params.productId;
  const productUrl = `/api/product/${productId}`;
  const [location, orderReducer] = useReducer(locationReducer, initialData);

  const getUserDetails = async () => {
    const { userDetails: userData, productDetails: productData } = await axios
      .get(productUrl)
      .then((res) => res.data.data[0]);
    const date = new Date(productData.createdAt);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const finalDate = `${day}/${month}/${year}`;
    productData["createdAt"] = finalDate;
    return { userData, productData };
  };
  const { data: session } = useSession();
  const locationBn = session?.user?.locationBn;
  const { data, isLoading } = useQuery({
    queryFn: getUserDetails,
    cacheTime: 0,
  });
  const handleQuantityChange = async (e) => {
    const totalPrice = data.productData.price * Number(e.target.value);
    console.log(totalPrice);
    orderReducer({
      type: "quantity",
      payload: Number(e.target.value),
    });
    orderReducer({
      type: "totalPrice",
      payload: totalPrice,
    });
  };
  const handleSubmitOrder = async () => {
    const {
      locationBn: buyerLocationBn,
      location: buyerLocation,
      _id: buyerId,
    } = session.user;
    let otherData = {
      ...location,
      productId: productId,
      seller: data.userData._id,
      buyer: buyerId,
      sellerLocation: data.productData.sellerLocation,
      sellerLocationBn: data.productData.sellerLocationBn,
    };
    // if (otherData.buyer == otherData.seller) {
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description:
    //       "This is one of Your Product. You can't order your product.",
    //   });
    //   return;
    // }
    if (location.buyerLocation.division === "") {
      otherData = {
        ...otherData,
        buyerLocationBn,
        buyerLocation,
      };
    }
    const res = await axios.post("/api/order/placeorder", otherData);

    console.log(otherData);
  };

  if (isLoading) {
    return <ProductSkeleton />;
  }

  return (
    <main className="container flex items-center justify-center  max-w-full py-10 ">
      <div className=" md:gap-5 flex flex-col md:flex-row border  ">
        {/* photo container */}
        <div className=" max-w-full flex-1 p-2">
          <Image
            className="h-[300px] md:h-[420px] rounded-sm"
            src={data.productData.photo}
            width={500}
            height={500}
            alt={data.productData.description}
          />
        </div>
        {/* product container */}
        <div className="flex flex-col md:gap-y-3 ">
          {/* User Information Container */}
          <div className="flex flex-col self-start">
            <div className="px-2 md:px-0">
              <Link href={"#"} className=" dark:text-[#176B87] ">
                {data.userData.name}
              </Link>
              <div className="flex items-center gap-x-2 opacity-60 ">
                <ClockSvg className="w-4 h-4" />
                <p>{data.productData.createdAt}</p>
              </div>
            </div>
          </div>
          <div className="w-full border my-1"></div>
          {/* Product Details container */}
          <div>
            <h1 className="text-base w-[40vh] px-2 md:px-0 opacity-70">
              {data.productData.description}
            </h1>
          </div>
          <div className="w-full border my-1"></div>

          <div className="px-2 md:px-0 grid  md:grid-cols-2 gap-2">
            <div className="flex items-center opacity-70 mt-2 gap-2">
              <TakaSvg className="w-4 h-4" />
              <h1>
                {data.productData.priceBn} টাকা / {data.productData.unit}
              </h1>
            </div>

            <div className="flex items-center opacity-70 mt-2 gap-2">
              <QuantitySvg className="w-4 h-4" />
              <h1>
                {data.productData.quantityBn} {data.productData.unit}
              </h1>
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
          <div className=" max-w-xs flex gap-y-2 flex-col  mx-auto">
            <Input
              type="number"
              placeholder="Enter Quantity"
              onChange={handleQuantityChange}
            />
            <Input
              placeholder={locationBn?.localAddress || "Enter Local Address"}
              onChange={(e) => {
                orderReducer({
                  type: "location",
                  payload: {
                    localAddress: e.target.value,
                  },
                });
              }}
            />
            <Location
              locationBn={locationBn || ""}
              className="grid grid-cols-3 gap-x-3"
              setLocation={orderReducer}
              location={location}
            />
            <Button className="w-fit mx-auto" onClick={handleSubmitOrder}>
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
