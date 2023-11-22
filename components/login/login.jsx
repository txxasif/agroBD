"use client";
import { loginUserAsync } from "@/store/reducers/user.reducer";
import {
  currentUserSelector,
  currentUserErrorSelector,
  currentUserErrorTextSelector,
} from "@/store/reducers/user.selector";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { SpinnerButton } from "../ui/spinnerButton";

const defaultValue = {
  email: "",
  password: "",
};
export default function LogIn() {
  const [form, setForm] = useState(defaultValue);
  const { session, status, data } = useSession();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      ...form,
      redirect: false,
      callbackUrl: "/",
    });
    setLoading(false);
    if (res.error) {
      setError(true);
      console.log("errr");
    }
    //dispatch(loginUserAsync(form));
  };
  useEffect(() => {
    console.log({ status, session, data });
    if (status == "authenticated") {
      redirect("/");
    }
  }, [status]);

  return (
    <div className="form-control w-full max-w-2xl  border">
      <form
        className="space-y-5   w-fit mx-auto px-2 py-3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold my-2 ">Login</h2>

        <Input
          type="email"
          onChange={handleChange}
          placeholder="Enter Your Email"
          name="email"
          value={form.email}
          className="w-full max-w-xs"
        />

        <Input
          type="password"
          onChange={handleChange}
          placeholder="Enter Your Password"
          name="password"
          value={form.password}
          className="input input-bordered w-full max-w-xs"
        />

        {error ? <Label>{"Invalid Email or Password"}</Label> : ""}
        <div className="flex flex-col items-center justify-center">
          <SpinnerButton
            onClick={handleSubmit}
            className="w-full"
            name={"Login"}
            isLoading={loading}
          />
          {/* <Button loading={true} className="w-full">Login</Button> */}
          <p className="my-2">
            Not a member?{" "}
            <Link href={"/signup"} className="opacity-70">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
