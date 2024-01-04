"use client";
import LocationDriver from "./search";
export default function From({ fromDispatch }) {
  return (
    <div className="flex items-center space-x-2">
      <p>From : </p>
      <LocationDriver className="flex space-x-1" setLocation={fromDispatch} />
    </div>
  );
}
