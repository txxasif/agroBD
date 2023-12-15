"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useReducer, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { SpinnerButton } from "../ui/spinnerButton";
import {
  ClockSvg,
  CategorySvg,
  TakaSvg,
  QuantitySvg,
  LocationSvg,
} from "@/icons/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Location from "@/components/location/location";
import { Button } from "@/components/ui/button";
import { ProductSkeleton } from "@/components/skeleton/product";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import translateToBangla, { translateNumbers } from "@/helper/translation";
import { getMonthHelper } from "@/helper/month.helper";
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
export function ProductDetails({ productId }) {
  const productUrl = `/api/product/${productId}`;
  const [location, orderReducer] = useReducer(locationReducer, initialData);
  const [totalPriceBn, setTotalPrice] = useState("০");
  const [quantityBn, setQuantity] = useState("০");

  const getUserDetails = async () => {
    const { userDetails: userData, productDetails: productData } = await axios
      .get(productUrl)
      .then((res) => res.data.data[0]);
    const date = new Date(productData.createdAt);
    const day = date.getDate();
    const month = getMonthHelper(date.getMonth());
    const year = date.getFullYear();
    const finalDate = `${day} ${month} ${year}`;
    productData["createdAt"] = finalDate;
    return { userData, productData };
  };
  const { data: session } = useSession();
  const locationBn = session?.user?.locationBn;
  const { data, isLoading } = useQuery({
    queryKey: [`${productId}`],
    queryFn: getUserDetails,
  });
  const handleQuantityChange = async (e) => {
    const totalPrice = Math.round(
      data.productData.price * Number(e.target.value)
    );
    const totalPriceBn = translateNumbers(String(totalPrice));
    setTotalPrice(totalPriceBn);
    setQuantity(translateNumbers(String(e.target.value)));

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
    if (!session) {
      toast.error("Please Create an account");
      return;
    }
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
      quantityBn,
      totalPriceBn,
    };
    if (location.quantity > data.productData.quantity) {
      console.log("bg");
      toast.error(
        `Not Available that much product, available product is ${data.productData.quantityBn} ${data.productData.unit}`
      );
      return;
    }
    if (location.quantity < 1) {
      toast.error("Please Enter your quantity before buying.");
      return;
    }
    if (otherData.buyer == otherData.seller) {
      toast.error("This is one of Your Product. You can't order your product.");
      return;
    }
    if (location.buyerLocation.division === "") {
      otherData = {
        ...otherData,
        buyerLocationBn,
        buyerLocation,
      };
    }
    try {
      await axios.post("/api/order/placeorder", otherData);
      toast.success("Order Successfully Ordered");
    } catch (e) {
      console.log(e);
    }
    console.log(otherData);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: handleSubmitOrder,
  });
  if (isLoading) {
    return <ProductSkeleton />;
  }

  const { sellerLocationBn } = data.productData;
  const locationString = `${sellerLocationBn.localAddress}, ${sellerLocationBn.upazilla},${sellerLocationBn.district}, ${sellerLocationBn.division}`;

  return (
    <div className="flex space-x-3 font-mono">
      <div>
        <Image
          className="w-[600px] h-[500px]"
          src={data.productData.photo}
          width={500}
          height={700}
          alt="Hi"
        />
      </div>
      {/* Product Details */}
      <div className="">
        {/*User Details */}
        <div>
          <Link
            className="text-2xl text-[#176B87] "
            href={`/${data.userData._id}`}
          >
            {data.userData.name}
          </Link>
          <div className="flex items-center gap-x-2">
            <ClockSvg className="w-4 h-4" />
            <p>{data.productData.createdAt}</p>
          </div>
        </div>
        {/* Product Details */}
        <div>
          <h1 className="py-4">{data.productData.description}</h1>
          <h1 className="text-2xl text-[#F03436] opacity-80">
            Category : {data.productData.category}
          </h1>
          <div className="flex justify-between py-4">
            <h1 className="text-[#F03436] ">
              <p>Price : </p> {data.productData.priceBn} ৳ /{" "}
              {data.productData.unit}
            </h1>
            <h1 className="text-[#F03436]  ">
              <p>Available : </p>
              {data.productData.quantityBn} {data.productData.unit}
            </h1>
          </div>
          <div className="flex items-center gap-x-2">
            <LocationSvg className="w-4 h-4" />
            <h2>{locationString}</h2>
          </div>
        </div>
        {/* Order */}
        <div className="py-4 flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Place Order</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Review Product</DialogTitle>
                <DialogDescription>
                  Please make sure you give the correct location before placing
                  your order.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  type="number"
                  placeholder="Enter Quantity"
                  onChange={handleQuantityChange}
                />
                <div className="flex justify-between">
                  <h1>
                    <p>Quantity:</p> {`${quantityBn} ${data.productData.unit}`}
                  </h1>
                  <h1>
                    <p>Total Price :</p> {`${totalPriceBn} টাকা`}
                  </h1>
                </div>
                <Label className="opacity-80">Your Location</Label>
                <Input
                  placeholder={
                    locationBn?.localAddress || "Enter Local Address"
                  }
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
              </div>
              <DialogFooter>
                <SpinnerButton
                  className="mx-auto my-2 w-full"
                  onClick={mutate}
                  name="Place Order"
                  isLoading={isPending}
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
