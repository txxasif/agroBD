import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-fit flex mx-auto">
                <TabsTrigger className="p-2" value="account">Account</TabsTrigger>
                <TabsTrigger className="p-2" value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <div className="w-screen h-screen border ">

                </div>
            </TabsContent>
            <TabsContent value="password">

            </TabsContent>
        </Tabs>
    )
}
