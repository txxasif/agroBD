import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { EmailSvg } from "@/icons/icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react"
export default function AboutSection(props) {
  const { data } = useSession();
  const user = data?.user;
  return (
    <Card className="w-[350px] shadow-lg " {...props}>
      <CardContent className="py-5 flex gap-x-4 items-center justify-center">
        <Image src={user.photo} width={320} height={177} className="w-20 h-20 object-cover rounded-lg " />
        <div className="h-20 w-[1px] border "></div>

        <div>
          <h1>{user.name}</h1>
          <div className="flex flex-row gap-x-3 items-center py-2">
            <MapPin className="h-4 w-4 opacity-60" />
            <Label className="opacity-60">{`সোনাগাজী,ফেনী,চট্টগ্রাম`}</Label>
          </div>
          <div className="flex flex-row gap-x-3 items-center py-2">
            <Phone className="h-4 w-4 opacity-60" />
            <Label className="opacity-60">{`01679806197`}</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
