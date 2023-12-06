import { ProductDetails } from "@/components/productDetailsCard/productDetails";
export default function Page({ params }) {
  const productId = params.productId;
  return (
    <main className=" max-w-fit py-4 px-2 md:px-10 ">
      <ProductDetails productId={productId} />
    </main>
  );
}
