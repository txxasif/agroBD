import { Button } from "@/components/ui/button";
import { LocationSvg, PhoneSvg, QuantitySvg } from "@/icons/icons";
import { productDetailsModel } from "@/models/post.model";
import { getUsersPhoneNumber } from "@/models/user.model";
import Image from "next/image";

export default async function OrderCardDriver({ order }) {
  const {
    productId,
    quantityBn,
    sellerLocationBn,
    buyerLocationBn,
    seller,
    buyer,
  } = order;
  const { division, district, upazilla, localAddress } = sellerLocationBn;
  const {
    division: divi,
    district: dist,
    upazilla: upa,
    localAddress: local,
  } = buyerLocationBn;
  const productDetails = await productDetailsModel(productId);
  const { buyerPhone, sellerPhone } = await getUsersPhoneNumber(buyer, seller);
  const { category, photo, unit } = productDetails;

  return (
    <div className="flex space-x-2   px-2 py-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <Image className="w-40 h-full" src={photo} width={150} height={100} />
      <div className="space-y-1">
        {" "}
        <div className="flex items-center space-x-1">
          <LocationSvg className="w-4 h-4 " />
          <p>
            Seller Location:{" "}
            {`${localAddress} , ${upazilla} , ${district},  ${division} `}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <LocationSvg className="w-4 h-4" />
          <p>Buyer Location: {`${local} , ${upa}  , ${dist} , ${divi} `}</p>
        </div>
        <div className="flex items-center space-x-1">
          <QuantitySvg className="w-4 h-4" />{" "}
          <h1>Quantity : {`${quantityBn} ${unit}`}</h1>
        </div>
        <div className="flex items-center space-x-1">
          <PhoneSvg className="w-4 h-4" />
          <h1>Buyer Phone : {`${buyerPhone}`}</h1>
        </div>
        <div className="flex items-center space-x-1">
          <PhoneSvg className="w-4 h-4" />
          <h1>Seller Phone : {`${buyerPhone}`}</h1>
        </div>
        <Button>Take Order</Button>
      </div>
    </div>
  );
}
