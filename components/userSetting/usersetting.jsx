import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Location from "../location/location"
import { useEffect, useReducer, useState } from "react"
import { useSession } from "next-auth/react"
import { useQuery } from "react-query"
import axios from "axios"
import { data } from "autoprefixer"
const initialData = {
    name: "",
    email: "",
    phone: "",
    location: {
        division: "",
        district: "",
        upazilla: "",
        localAddress: ""
    },
}
function userSettingsReducer(state, action) {
    switch (action.type) {
        case "name":
            return { ...state, name: action.payload }
        case "email":
            return { ...state, email: action.payload }
        case "phone":
            return { ...state, phone: action.payload }
        case "location":
            return { ...state, location: action.payload }
        case "localAddress":
            return {
                ...state, location: {
                    ...state.location, localAddress: action.payload
                }
            }
        case "user":
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

export function UserSetting() {
    const { state, dispatch } = useReducer(userSettingsReducer, initialData);

    const [location, setLocation] = useState({ division: '', district: '', upazilla: '' });
    const [localAddress, setLocalAddress] = useState('');
    const { data: session } = useSession();
    const uId = session.user._id;

    function handleChange(e) {
        const { name, value } = e.target;
        dispatch({
            type: name,
            payload: value
        })
    }
    const getUserSettings = async () => await axios.get(`/api/profile/settings?id=${uId}`).then(res => res.data.data);

    const { data: user } = useQuery({
        queryKey: ["settings"],
        queryFn: getUserSettings,
        onSuccess: (data) => {
            delete data._id;
            console.log(data, "from s");

        }

    },
    )
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
                    <Label >Name</Label>
                    <Input name="name" defaultValue={user?.name || ""} />
                </div>
                <div className="space-y-1">
                    <Label>Email</Label>
                    <Input name="email" defaultValue={user?.email || ""} />
                </div>
                <div className="space-y-1">
                    <Label >Phone Number</Label>
                    <Input name="phone" value={localAddress} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                    <Label >Local Address</Label>
                    <Input id="name" value={localAddress} name="localAddress" onChange={handleChange} />
                </div>
                <div className="space-y-1">
                    <Location setLocation={setLocation} location={location} className="mx-fit grid grid-cols-3 gap-1" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save changes</Button>
            </CardFooter>
        </Card>
    )
}
