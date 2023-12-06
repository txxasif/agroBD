"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DropdownMenuDemo } from "../dropDownProfile/dropdown";
import { signOut, useSession } from "next-auth/react";
import { SearchSvg } from "@/icons/icons";
import { Input } from "../ui/input";

export default function Header() {
  const { data, status } = useSession();
  const currentUser = status === "authenticated" ? true : false;
  const currentUserId = data?.user._id;
  const currentUserData = data?.user;
  const router = useRouter();
  console.log(currentUser, "hii");
  async function logOut() {
    await signOut();
    router.push("/");
  }

  return (
    <header className="flex font-mono justify-between items-center px-1 py-1 md:py-3 md:px-2 sticky top-0 mb-10 bg-inherit z-20 shadow-lg">
      <div className="">
        <Link href={"/"} className="text-xl">
          Home
        </Link>
      </div>
      <div className="flex items-center gap-x-2 ">
        <Input className="focus-visible:ring-0" />
        <SearchSvg className="w-10 h-10 border p-1 rounded-lg cursor-pointer active:animate-pulse" />
      </div>
      <div className="flex justify-center items-center space-x-2  px-3">
        <Link href={"/orders/received"}>Received Orders</Link>
        <div className="w-1 h-4 bg-black dark:bg-white"></div>
        <Link href={"/orders/placed"}>My Orders</Link>
        <DropdownMenuDemo
          currentUser={currentUser}
          photo={currentUserData?.photo}
          name={currentUserData?.name}
          currentUserId={currentUserId}
          logOut={logOut}
        />
      </div>
    </header>
  );
}
