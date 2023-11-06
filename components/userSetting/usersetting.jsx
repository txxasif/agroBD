"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Location from "../location/location";
import { useEffect, useReducer } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { SpinnerButton } from "../ui/spinnerButton";
const initialData = {
  name: "",
  email: "",
  phone: "",
  location: {
    division: "",
    district: "",
    upazilla: "",
    localAddress: "",
  },
};
function userSettingsReducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "phone":
      return { ...state, phone: action.payload };
    case "location":
      return {
        ...state,
        location: {
          ...state.location,
          ...action.payload,
        },
      };
    case "localAddress":
      return {
        ...state,
        location: {
          ...state.location,
          localAddress: action.payload,
        },
      };
    case "user":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function UserSetting() {
  const [state, dispatch] = useReducer(userSettingsReducer, initialData);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const uId = session.user._id;
  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch({
      type: `${name}`,
      payload: value,
    });
  }
  const getUserSettings = async () => {
    const data = await axios
      .get(`/api/profile/settings?id=${uId}`)
      .then((res) => res.data.data);
    dispatch({
      type: "user",
      payload: data,
    });
    return data;
  };
  const setUserSettings = async () =>
    await axios.post("/api/profile/settings", { id: uId, userData: state });
  const { data: user } = useQuery({
    queryKey: ["settings"],
    queryFn: getUserSettings,
  });
  const {
    mutate: handleClick,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: setUserSettings,
    onSuccess: () => {
      queryClient.invalidateQueries(["settings"]);
      console.log("done");
    },
  });

  return (
    <Card className="mx-auto w-fit">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label>Name</Label>
          <Input name="name" value={state?.name} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input name="email" value={state?.email} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <Label>Phone Number</Label>
          <Input name="phone" value={state?.phone} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <Label>Local Address</Label>
          <Input
            value={state?.locationBn?.localAddress}
            name="localAddress"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <Location
            locationBn={state?.locationBn}
            setLocation={dispatch}
            className="mx-fit grid grid-cols-3 gap-1"
          />
        </div>
      </CardContent>
      <CardFooter className="w-full flex items-center justify-center">
        <SpinnerButton
          onClick={handleClick}
          name={"Update"}
          isLoading={isLoading}
        />
        {isError ? <h1>Error</h1> : null}
      </CardFooter>
    </Card>
  );
}
