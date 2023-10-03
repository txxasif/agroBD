"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "@/store/reducers/user.reducer";
import {
    currentUserSelector,
    currentUserErrorSelector,
    currentUserErrorTextSelector,
} from "@/store/reducers/user.selector";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
ReloadIcon

const defaultValue = {
    name: "",
    email: "",
    password: "",
    photo: null,
};

export default function SignUp() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [form, setForm] = useState(defaultValue);
    const [photo, setPhoto] = useState(null);
    const currentUser = useSelector(currentUserSelector);
    const isError = useSelector(currentUserErrorSelector);
    const errorMessage = useSelector(currentUserErrorTextSelector);
    const [isLoading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        setForm({ ...form, [name]: type === "file" ? files[0] : value });
    };

    const handleImageChange = (e) => {
        const photo = e.target.files[0];
        setPhoto(photo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createUserAsync(form));
        setLoading(true);

    };

    useEffect(() => {
        setLoading(false);

        if (currentUser) {
            router.push("/");
        }
    }, [currentUser]);

    return (
        <div className="w-full max-w-sm p-4rounded-lg shadow sm:p-6 md:p-8 border min-w-max">
            <form className="space-y-5 px-2" onSubmit={handleSubmit}>
                <h5 className="text-2xl font-extralight ">Sign Up to our platform</h5>

                <Label >Your Name</Label>
                <Input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Md.  Sabbir Hossain" required />


                <Label>Your email</Label>
                <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@company.com" required />

                <Label for="password" >Your password</Label>
                <Input type="password" name="password" id="password" value={form.password} onChange={handleChange} required />

                <Label >Photo</Label>
                <Input

                    type="file"
                    name="photo"
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md"
                    required
                />
                {
                    isLoading ?
                        (<Button disabled className="w-full">
                            <ReloadIcon className=" mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>) :
                        (
                            <Button className=" w-full" type="submit">Sign Up</Button>
                        )

                }
            </form>
            <h3 className="mt-4">{isError ? errorMessage : null}</h3>
        </div>
    );
}