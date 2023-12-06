import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
export function AvatarDemo({ photo }) {
  return (
    <Avatar>
      <AvatarImage
        className="w-fit"
        src={photo ? photo : "./skel.png"}
        alt="@shadcn"
      />
    </Avatar>
  );
}

export function DropdownMenuDemo({
  photo,
  logOut,
  currentUserId,
  currentUser,
  name,
}) {
  const { setTheme, theme } = useTheme();
  const handleSwitchChange = (event) => {
    // Prevent the Switch component from receiving keyboard focus
    event.preventDefault();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setTheme(theme === "dark" ? "dark" : "light");
  }, [theme]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button onClick={handleSwitchChange}>
          {" "}
          <AvatarDemo photo={photo} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currentUser ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={`/${currentUserId}`}>Profile</Link>
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/settings"}>Settings</Link>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Dark Mode
                <DropdownMenuShortcut>
                  {" "}
                  <Switch
                    checked={theme == "dark" ? true : false}
                    onClick={handleSwitchChange}
                    id="airplane-mode"
                    className="no-focus-trap"
                  />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={logOut}>Log Out</button>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Dark Mode
                <DropdownMenuShortcut>
                  {" "}
                  <Switch
                    checked={theme == "dark" ? true : false}
                    onClick={handleSwitchChange}
                    id="airplane-mode"
                    className="no-focus-trap"
                  />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={"/login"}>LogIn</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
