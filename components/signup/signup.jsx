"use client"
import { useEffect, useState, useReducer } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "react-query";
import Location from "../location/location";
import { uploadPhoto, createUserHelper } from "@/helper/registration/registration.helper";



const defaultValue = {
    name: "",
    email: "",
    password: "",
    photo: null,
};

const initialLocationData = {
    division: "",
    district: "",
    upazilla: "",
    localAddress: ""
}
function userSettingsReducer(state, action) {
    switch (action.type) {
        case "location":
            return { ...state, ...action.payload }
        default:
            return state;
    }

}
export default function SignUp() {
    const [location, dispatch] = useReducer(userSettingsReducer, initialLocationData);
    const router = useRouter();
    const [form, setForm] = useState(defaultValue);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        setForm({ ...form, [name]: type === "file" ? files[0] : value });
    };
    const handleSubmitAsync = async (e) => {
        e.preventDefault();
        let user = { ...form };
        const result = await uploadPhoto(user.photo);
        console.log(result.data.secure_url, "reult");
        user["photo"] = result.data.secure_url;
        let u = {
            ...user, location
        }
        try {
            const response = await createUserHelper(u);
            if (response.status === 201) {
                const data = response.data;
                console.log(data, "formmm");
                // router.push("/login")
            }
        } catch (e) {
            console.log(e);
        }
    }
    const { mutate: handleSubmit, isError, isLoading, isSuccess } = useMutation({
        mutationFn: handleSubmitAsync,
    })
    useEffect(() => {
        if (isSuccess) {
            router.push("/");
        }
    }, [isSuccess]);

    return (
        <div className="w-full max-w-sm p-4rounded-lg shadow sm:p-6 md:p-8 border min-w-max">
            <form className="space-y-5 px-2" onSubmit={handleSubmit}>
                <h5 className="text-2xl font-extralight ">Sign Up to our platform</h5>

                <Label >Your Name</Label>
                <Input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Md.  Sabbir Hossain" required />


                <Label>Your email</Label>
                <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@company.com" required />

                <Label >Your password</Label>
                <Input type="password" name="password" id="password" value={form.password} onChange={handleChange} required />

                <Label >Your LocalAddress</Label>
                <Input type="text" name="password" id="password" value={location.localAddress} onChange={(e) => dispatch({ type: "location", payload: { localAddress: e.target.value } })} required />
                <Location setLocation={dispatch} className="mx-fit grid grid-cols-3 gap-1" />

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
            <h3 className="mt-4">{isError ? "Something Went Wrong" : null}</h3>
        </div>
    );
}