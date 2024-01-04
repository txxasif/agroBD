"use client";
import { useReducer } from "react";
import From from "./driverSearch/from";
import To from "./driverSearch/to";
import { queryFixerDriver } from "@/helper/serachHelper";
import Link from "next/link";
const initialFromData = {
  fdivision: "",
  fdistrict: "",
  fupazilla: "",
};
const initialToData = {
  tdivision: "",
  tdistrict: "",
  tupazilla: "",
};
function fromReducer(state, action) {
  switch (action.type) {
    case "division":
      return { ...state, fdivision: action.payload };
    case "district":
      return { ...state, fdistrict: action.payload };
    case "upazilla":
      return { ...state, fupazilla: action.payload };
    default:
      return state;
  }
}
function toReducer(state, action) {
  switch (action.type) {
    case "division":
      return { ...state, tdivision: action.payload };
    case "district":
      return { ...state, tdistrict: action.payload };
    case "upazilla":
      return { ...state, tupazilla: action.payload };
    default:
      return state;
  }
}

export default function DriverSearchFiler() {
  const [fromState, fromDispatch] = useReducer(fromReducer, initialFromData);
  const [toState, toDispatch] = useReducer(toReducer, initialToData);
  const query = () => {
    const query = queryFixerDriver(fromState, toState);
    const url = `${query}&page=1`;
    return url;
  };
  return (
    <div className="flex space-x-3">
      <From fromDispatch={fromDispatch} />
      <To toDispatch={toDispatch} />
      <Link
        className=" px-2 py-2 rounded-sm bg-inherit border border-[#30499a]"
        href={`/driver/home/${query()}`}
      >
        Search
      </Link>
    </div>
  );
}
