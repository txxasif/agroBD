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
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useQuery } from "react-query"
import axios from "axios"
export function UserSetting() {
    const [location, setLocation] = useState({ division: '', district: '', upazilla: '' });
    const [localAddress, setLocalAddress] = useState('');
    const { data: session } = useSession();
    const uId = session.user._id;

    function handleChange(e) {
        const { value } = e.target;
        setLocalAddress(value);
    }
    const getUserSettings = async () => await axios.get(`/api/profile/settings?id=${uId}`).then(res => res.data.data);

    const { data: user } = useQuery({
        queryKey: ["settings"],
        queryFn: getUserSettings
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
                    <Label htmlFor="name" >Name</Label>
                    <Input defaultValue={user?.name || ""} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="name">Email</Label>
                    <Input defaultValue={user?.email || ""} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="name">Phone Number</Label>
                    <Input id="name" value={localAddress} name="localAddress" onChange={handleChange} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="name">Location</Label>
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
