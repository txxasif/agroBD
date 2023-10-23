"use client";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  currentUserDataSelector,
  currentUserIdSelector,
  currentUserSelector,
} from "@/store/reducers/user.selector";
import { setCurrentUser } from "@/store/reducers/user.reducer";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SwitchTheme from "../toogle/toogle";
import { DropdownMenuDemo } from "../dropDownProfile/dropdown";
import { signOut, useSession } from "next-auth/react";
import { SearchSvg } from "@/icons/icons";
import { Input } from "../ui/input";
import { useRef } from "react";
export default function Header() {
  const { data, status } = useSession();
  const currentUser = status === "authenticated" ? true : false;
  const currentUserId = data?.user._id;
  const currentUserData = data?.user;
  //const dispatch = useDispatch();
  const router = useRouter();
  console.log(currentUser, "hii");
  async function logOut() {
    // dispatch(setCurrentUser());
    await signOut();
    router.push("/");
  }
  return (
    <header className="flex justify-between items-center px-1 py-1 md:py-3 md:px-2 sticky top-0 mb-10 bg-inherit z-20">
      <div className="">
        <Link href={"/"} className="text-xl">
          Home
        </Link>
      </div>
      <div className="flex items-center gap-x-2 ">
        <Input className="focus-visible:ring-0" />
        <SearchSvg className="w-10 h-10 border p-1 rounded-lg cursor-pointer active:animate-pulse" />
      </div>
      <div className="flex justify-center items-center space-x-2 ">
        <DropdownMenuDemo
          currentUser={currentUser}
          photo={currentUserData?.photo}
          currentUserId={currentUserId}
          logOut={logOut}
        />
      </div>
    </header>
  );
}
