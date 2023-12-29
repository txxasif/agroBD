"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../ui/button";
import { uploadPhoto } from "@/helper/registration/registration.helper";
import axios from "axios";
import { SpinnerButton } from "../ui/spinnerButton";

const initialData = {
  nidNo: null,
  frontPhoto: null,
  backPhoto: null,
  dob: new Date(),
};
export default function VerificationForm({ id }) {
  const [application, setApplication] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setApplication((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const frontPhoto = await uploadPhoto(application.frontPhoto).then(
      (res) => res.data.secure_url
    );
    const backPhoto = await uploadPhoto(application.backPhoto).then(
      (res) => res.data.secure_url
    );
    const month = (application.dob.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns a zero-based index
    const day = application.dob.getDate().toString().padStart(2, "0");
    const year = application.dob.getFullYear().toString();
    const formattedDate = `${month}/${day}/${year}`;
    const body = {
      driverId: id,
      dob: formattedDate,
      frontPhoto: frontPhoto,
      backPhoto: backPhoto,
      nidNo: application.nidNo,
    };
    const res = await axios.post("/api/driver/application", body);
    setIsLoading(false);
    window.location.reload();
  }
  return (
    <div className="flex flex-col mt-8 space-y-3">
      <Label>Please Enter Your NID NO:</Label>
      <Input
        name="nidNo"
        value={application.nidNo}
        onChange={handleChange}
        type="number"
        placeHolder="261XXXXXXXXXXX"
      />
      <Label>Please Enter Your Date of Birth (MM/DD/YYYY)</Label>
      <DatePicker
        className="dark:bg-[#030712] border py-2 dark:text-white px-2 w-full"
        selected={application.dob}
        onChange={(date) => setApplication((prev) => ({ ...prev, dob: date }))}
      />
      <Label>Upload front side of your NID</Label>
      <Input onChange={handleChange} type="file" name="frontPhoto" />
      <Label>Upload back side of your NID</Label>
      <Input onChange={handleChange} type="file" name="backPhoto" />
      <SpinnerButton
        name={"Submit"}
        onClick={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
