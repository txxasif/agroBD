"use client";
import { CategorySvg, QuantitySvgNew, TakaSvg } from "@/icons/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function OwnerCard({ seller, post }) {
  const { description, category, priceBn, quantityBn, unit, photo, _id } = post;
  const router = useRouter();
  const buy = () => {
    router.push(`/product/${_id}`);
  };
  return (
    <div className="border max-w-xs m-2 px-3 py-2">
      <div className="relative">
        <Image
          className="w-full h-[200px] p- rounded-sm"
          src={photo}
          width={500}
          height={500}
        />
        <DropdownMenuDemo id={_id} className="absolute top-1 right-1" />
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
      <Toaster />
    </div>
  );
}

export function DropdownMenuDemo(props) {
  const id = props.id;
  const queryClient = useQueryClient();
  const deletePost = async () => {
    return await axios.post(`/api/profile/deletepost`, { id: id });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast("Successfully deleted");
    },
  });
  function handleSubmit(e) {
    e.preventDefault();
    mutate();
  }
  return (
    <div {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Edit Product</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={isPending ? "opacity-50" : "cursor-pointer"}
              onClick={handleSubmit}
            >
              <Trash2 className="mr-2 h-4 w-4" />

              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
