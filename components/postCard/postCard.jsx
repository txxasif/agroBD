import { Label } from "@/components/ui/label";
import { TakaSvg, QuantitySvg, LocationSvg, CategorySvg } from "@/icons/icons";
import Image from "next/image";
import Link from "next/link";
export default function PostCard({ post }) {
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
  let shortDescription = description;
  if (shortDescription.length > 86) {
    shortDescription = description.substring(83) + "...";
  }
  const { division, district, upazilla } = sellerLocationBn;
  const location = `${upazilla} , ${district} , ${division}`;

  return (
    <div className="border max-w-xs m-2 px-3 py-2 shadow-md hover:shadow-xl transition-shadow duration-300">
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

        <div className="flex flex-row items-center justify-between gap-x-3 px-3 text-lg pt-1 opacity-80">
          <h1 className="text-[#F03436] text-2xl font-bold">
            {priceBn} ৳ / {unit}
          </h1>
          <h1 className="text-[#F03436] font-bold">
            {quantityBn} {unit}
          </h1>
        </div>
      </div>
      <Link
        href={`/product/${post._id}`}
        className="mx-auto flex items-center font-mono font-bold text-white py-2 px-4 justify-center w-fit rounded-md mt-1 bg-[#282F3C] "
      >
        <p>Buy</p>
      </Link>
    </div>
  );
}
