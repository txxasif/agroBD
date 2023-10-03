"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocalStorage } from "usehooks-ts"
import { useEffect } from "react"

export default function ModeToggle() {
    const { setTheme, theme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    };


    return (

        <Button variant="outline" size="icon" onClick={toggleTheme}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>

    )
}

// "use client"
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
// import React, { useEffect } from "react";
// import { useLocalStorage } from "usehooks-ts";
// const SwitchTheme = () => {
//     //we store the theme in localStorage to preserve the state on next visit with an initial theme of dark.
//     const [theme, setTheme] = useLocalStorage("theme", "dark");

//     //toggles the theme
//     const toggleTheme = () => {
//         setTheme(theme === "dark" ? "light" : "dark");
//     };

//     //modify data-theme attribute on document.body when theme changes
//     useEffect(() => {
//         const body = document.body;
//         body.setAttribute("data-theme", theme);
//     }, [theme]);


//     return (
//         <button className="btn btn-circle" onClick={toggleTheme}>
//             {theme === "dark" ? (
//                 <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />

//             ) : (
//                 <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all " />
//             )}
//         </button>
//     );
// };

// export default SwitchTheme;

