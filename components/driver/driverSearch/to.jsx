"use client";
import LocationDriver from "./search";
export default function To({ toDispatch }) {
  return (
    <div className="flex items-center space-x-2">
      <p>To:</p>
      <LocationDriver className="flex space-x-1" setLocation={toDispatch} />
    </div>
  );
}
