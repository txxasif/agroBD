"use client";
import { useReducer, useState } from "react";
import SearchLocation from "../searchLoaction/searchLoaction";
import axios from "axios";
import Link from "next/link";

import queryFixer from "@/helper/serachHelper";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "../ui/button";

const initialSearchData = {
  division: "",
  district: "",
  upazilla: "",
  category: "ধান",
};
function searchReducer(state, action) {
  switch (action.type) {
    case "division":
      return { ...state, division: action.payload };
    case "district":
      return { ...state, district: action.payload };
    case "upazilla":
      return { ...state, upazilla: action.payload };
    case "category":
      return { ...state, category: action.payload };
    default:
      return state;
  }
}
export default function Search() {
  const [state, dispatch] = useReducer(searchReducer, initialSearchData);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = () => {
    const query = queryFixer(state);
    const url = `${query}&page=1`;
    //router.push(pathname + url);
    return url;
  };
  return (
    <div className="flex  items-center justify-center">
      <SearchLocation className="flex space-x-1" setLocation={dispatch} />
      <Link className="px-2 py-3" href={`/${query()}`}>
        Search
      </Link>
    </div>
  );
}
