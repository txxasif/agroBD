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
import { dateToString, getMonthHelper } from "@/helper/month.helper";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

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
    const finalDate = dateToString(productData.createdAt);
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
    <div>
      <div className="flex flex-col lg:flex-row gap-4 border shadow-md p-2 lg:p-3 rounded-xl">
        <div className="flex-1 flex">
          <Image
            className="w-[600px] h-[330px] flex-grow rounded-lg"
            src={data.productData.photo}
            width={500}
            height={700}
            alt="Hi"
          />
        </div>
        <div className="flex-1 flex">
          {/* Product Details */}
          <div className="flex flex-col">
            {/*User Details */}
            <div className="flex items-centre mb-2 justify-centre gap-2">
              <p className="bg-indigo-700 w-fit px-2 py-1 text-white rounded-md text-sm">
                Category
              </p>
              <h1 className="font-medium text-lg">
                {data.productData.category}
              </h1>
            </div>
            <div>
              <Link
                className="text-xl font-medium text-gray-500"
                href={`/${data.userData._id}`}
              >
                {data.userData.name}
              </Link>
              <div className="flex items-center gap-x-2">
                <ClockSvg className="w-4 h-4" />
                <p>{data.productData.createdAt}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <LocationSvg className="w-4 h-4" />
                <h2 className="text-sm">{locationString}</h2>
              </div>
            </div>
            {/* Product Details */}
            <div className="flex-grow">
              <h1 className="py-4">{data.productData.description}</h1>

              <div className="flex flex-col gap-4 md:flex-row md:justify-between py-4">
                <div className="flex items-center gap-2">
                  <p className="bg-green-700 text-white px-2 text-sm py-1 rounded-md w-fit">
                    Price
                  </p>
                  <p className="font-medium text-lg">
                    {data.productData.priceBn} ৳ / {data.productData.unit}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="bg-orange-600 text-white px-2 text-sm py-1 rounded-md w-fit">
                    Available
                  </p>
                  <p className="font-medium text-lg">
                    {data.productData.quantityBn} {data.productData.unit}
                  </p>
                </div>
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
                      Please make sure you give the correct location before
                      placing your order.
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
                        <p>Quantity:</p>{" "}
                        {`${quantityBn} ${data.productData.unit}`}
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
      </div>
    </div>
  );
}
