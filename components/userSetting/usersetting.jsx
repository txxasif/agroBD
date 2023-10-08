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
import { useState } from "react"
export function UserSetting() {
    const [location, setLocation] = useState({ division: '', district: '', upazilla: '' });
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
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="name">Email</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="name">Location</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                    <Location setLocation={setLocation} className="mx-fit grid grid-cols-3 gap-1" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save changes</Button>
            </CardFooter>
        </Card>
    )
}
