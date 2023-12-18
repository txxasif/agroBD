"use client";
import { useState, useReducer, useEffect } from "react";
import { redirect } from "next/navigation";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import Location from "../location/location";
import {
  uploadPhoto,
  createUserHelper,
} from "@/helper/registration/registration.helper";
import { SpinnerButton } from "../ui/spinnerButton";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const defaultValue = {
  name: "",
  email: "",
  password: "",
  photo: null,
  phone: null,
  role: "",
};

const initialLocationData = {
  division: "",
  district: "",
  upazilla: "",
  localAddress: "",
};
function userSettingsReducer(state, action) {
  switch (action.type) {
    case "location":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
export default function SignUp() {
  const [location, dispatch] = useReducer(
    userSettingsReducer,
    initialLocationData
  );
  const [form, setForm] = useState(defaultValue);
  const [error, setError] = useState(null);
  const { status } = useSession();
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setForm({ ...form, [name]: type === "file" ? files[0] : value });
  };
  const handleSubmitAsync = async () => {
    let user = { ...form };
    const result = await uploadPhoto(user.photo);
    console.log(result.data.secure_url, "reult");
    user["photo"] = result.data.secure_url;
    let u = {
      ...user,
      location,
    };
    try {
      console.log(u);
      const response = await createUserHelper(u);
      if (response.status === 201) {
        toast.success("Registration successful");
        await logInAfterSuccess();
        const data = response.data;
        console.log(data, "formmm");
      }
    } catch (e) {
      toast.error(e.response.data.msg);
      setError(e.response.data.msg);
    }
  };
  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: handleSubmitAsync,
  });
  const handleSubmitDefault = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  async function logInAfterSuccess() {
    const loginData = {
      email: form.email,
      password: form.password,
    };
    if (form.role === "driver") {
      await signIn("credentials", {
        ...loginData,
        redirect: true,
        callbackUrl: "/driver/verification",
      });
      return;
    }
    await signIn("credentials", {
      ...loginData,
      redirect: false,
      callbackUrl: "/",
    });
  }
  useEffect(() => {
    if (status == "authenticated") {
      redirect("/");
    }
  }, [status]);

  return (
    <div className="w-full max-w-sm p-4rounded-lg shadow sm:p-6 md:p-8 border min-w-max">
      <form className="space-y-5 px-2" onSubmit={handleSubmitDefault}>
        <h5 className="text-2xl font-extralight ">Sign Up to our platform</h5>

        <Label>Your Name</Label>
        <Input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Md.  Sabbir Hossain"
          required
        />

        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="name@company.com"
          required
        />

        <Label>Phone</Label>
        <Input
          type="number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="016798-XXXXX"
          required
        />

        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Label>Local Address</Label>
        <Input
          type="text"
          name="password"
          id="password"
          value={location.localAddress}
          onChange={(e) =>
            dispatch({
              type: "location",
              payload: { localAddress: e.target.value },
            })
          }
          required
        />
        <Location
          setLocation={dispatch}
          className="mx-fit grid grid-cols-3 gap-1"
        />

        <Label>Photo</Label>
        <Input
          type="file"
          name="photo"
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md"
          required
        />
        <RadioGroup
          onValueChange={(e) => setForm((prev) => ({ ...prev, role: e }))}
          defaultValue="user"
          className="flex"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="user" id="r1" />
            <Label htmlFor="option-one">User</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="driver" id="r2" />
            <Label htmlFor="option-two">Driver</Label>
          </div>
        </RadioGroup>
        <SpinnerButton isLoading={isPending} name="Sign Up" type="submit" />
      </form>
      <Toaster />
    </div>
  );
}
