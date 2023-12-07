"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
const initialValue = {
  description: "",
  category: "ধান",
  price: "",
  quantity: "",
  unit: "কেজি",
  photo: null,
  seller: null,
};
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpinnerButton } from "../ui/spinnerButton";
import {
  createPostHelper,
  uploadPhoto,
} from "@/helper/registration/registration.helper";
import { useSession } from "next-auth/react";
import { translateNumbers } from "@/helper/translation";
export default function CreatePost({ user, ...props }) {
  const category = [
    "ধান",
    "গম",
    "শাকসবজি",
    "ফল",
    "মাছ",
    "হাঁস-মুরগি",
    "গরু-ছাগল",
    "মসলা",
    "পাট",
    "অন্যান্য",
  ];

  const unit = ["কেজি", "লিটার", "পিস", "বস্তা"];
  const [form, setForm] = useState(initialValue);
  const id = user._id;
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    console.log({ name, value, type, files });
    setForm((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const queryClient = useQueryClient();
  const { location: sellerLocation, locationBn: sellerLocationBn } = user;
  const {
    mutate: handleSubmit,
    isPending: isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      console.log("clicked");
      const data = {
        ...form,
        seller: id,
      };
      console.log("mutation called");
      const result = await uploadPhoto(data.photo);
      data["photo"] = result.data.secure_url;
      data["sellerLocation"] = sellerLocation;
      data["sellerLocationBn"] = sellerLocationBn;
      const priceBn = translateNumbers(data.price);
      const quantityBn = translateNumbers(data.quantity);
      console.log((priceBn, quantityBn), "hiii");

      const finalData = {
        ...data,
        priceBn,
        quantityBn,
      };
      const response = await createPostHelper(finalData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setForm(initialValue);
    },
    onError: () => {
      alert("went wrong");
    },
  });

  console.log(error);
  console.log(form, "foooooooooooooooo");
  const handleSubmit1 = () => {
    console.log(form);
  };
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create a new Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid  w-full items-center grid-cols-2 gap-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Description</Label>
                <Textarea
                  type="text"
                  placeholder="Enter Your Product Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Photo</Label>
                <Input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  required
                  id="name"
                />
              </div>
            </div>

            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-2 gap-x-1 gap-y-3">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="framework">Category</Label>
                  <Select
                    required
                    onValueChange={(e) =>
                      setForm((prev) => ({ ...prev, ["category"]: e }))
                    }
                    defaultValue={category[0]}
                  >
                    <SelectTrigger id="framework">
                      <SelectValue placeholder={form.category} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        {category.map((cat) => (
                          <SelectItem value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="framework">Unit</Label>
                  <Select
                    defaultValue={unit[0]}
                    onValueChange={(e) =>
                      setForm((prev) => ({ ...prev, ["unit"]: e }))
                    }
                    required
                  >
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      <SelectGroup>
                        {unit.map((cat) => (
                          <SelectItem value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Price</Label>
                  <Input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Enter Your Price"
                    required
                  />
                </div>
                <div className=" flex flex-col space-y-1.5">
                  <Label htmlFor="name">Quantity</Label>
                  <Input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Enter Your Quantity"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <SpinnerButton
          className="px-10 py-5 "
          isLoading={isLoading}
          onClick={handleSubmit}
          name="Upload Your Product"
        />

        {isError ? <Label>Something Went Wrong!</Label> : null}
      </CardFooter>
    </Card>
  );
}
