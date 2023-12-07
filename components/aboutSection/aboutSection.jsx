import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EmailSvg } from "@/icons/icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
export default function AboutSection({ user, ...props }) {
  const { name, email, phone, locationBn, photo } = user;
  const { division, district, upazilla } = locationBn;
  const location = `${upazilla} , ${district} , ${division}`;
  return (
    <Card {...props}>
      <CardContent className="py-5  gap-x-4 items-center justify-center">
        <Image
          src={photo}
          width={320}
          height={177}
          className="max-w-md max-h-md object-cover rounded-lg "
        />
        <div>
          <h1>{name}</h1>
          <div className="flex flex-row gap-x-3 items-center py-2">
            <MapPin className="h-4 w-4 opacity-60" />
            <Label className="opacity-60">{location}</Label>
          </div>
          <div className="flex flex-row gap-x-3 items-center py-2">
            <Phone className="h-4 w-4 opacity-60" />
            <Label className="opacity-60">{`01679806197`}</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
