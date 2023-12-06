"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectGroup } from "@radix-ui/react-select";
import { useSession } from "next-auth/react";
const initialValue = {
    title: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    unit: "",
    photo: null,
    seller: null,
};
import { useState } from "react";

export default function CardWithForm() {
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
    const { data } = useSession();
    const [form, setForm] = useState(initialValue);
    const id = data?.user._id;
    const unit = ["কেজি", "লিটার", "পিস", "বস্তা"];
    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        console.log(name, value, type, files);
        setForm((prevValues) => ({
            ...prevValues,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            ...form,
            seller: id,
        };
        // dispatch(createPostAsync(data));
        console.log(data);
    };

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <CardTitle>Create a new Post</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="" onSubmit={handleSubmit}>
                    <div className="grid w-full items-center grid-cols-2 gap-4">
                        <div className="grid w-full items-center gap-4">
                            {/* <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Title</Label>
                                <Input
                                    required
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    id="name"
                                    placeholder="Enter Your Product Title"
                                />
                            </div> */}

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name" >
                                    Description
                                </Label>
                                <Textarea
                                    className=""
                                    placeholder="Enter Your Product Description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Photo</Label>
                                <Input type="file"
                                    name="photo"
                                    onChange={handleChange}
                                    required id="name" />
                            </div>
                        </div>

                        <div className="grid w-full items-center gap-4">
                            <div className="grid grid-cols-2 gap-x-1 gap-y-3">
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="framework">Category</Label>
                                    <Select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        required

                                    >
                                        <SelectTrigger >
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectGroup>
                                            <SelectContent >
                                                {category.map((cat) => <SelectItem value={cat}>{cat}</SelectItem>)}
                                            </SelectContent>
                                        </SelectGroup>
                                    </Select>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="framework">Unit</Label>
                                    <Select name="unit" value={form.unit} onChange={handleChange} required>
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            {unit.map((cat) => (
                                                <SelectItem value={cat}>{cat}</SelectItem>
                                            ))}
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
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">
                                        Quantity
                                    </Label>
                                    <Input
                                        type="number"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center items-center w-full">
                <Button className="w-1/2" onClick={handleSubmit}>Deploy</Button>
            </CardFooter>
        </Card>
    );
}
