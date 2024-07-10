"use client";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Trees } from "lucide-react"
import { useContext } from "react";

import { ThemeContext } from "@/context/changeTheme";

interface Props {
    className ?: string;
    size ?: number;
}

export const ChooseTheme =  ({className} : Props) => {
    const {changeTheme} = useContext(ThemeContext)!;
    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="btn btn-sm bg-secondary-content">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" bg-base-200 bg-white/50">
        <DropdownMenuItem className=" cursor-pointer btn btn-ghost justify-start hover:text-neutral-content" onClick={() => changeTheme("light")}>
          <Sun size={24} /> <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem className=" cursor-pointer btn btn-ghost justify-start hover:text-success-content" onClick={() => changeTheme("dark")}>
          <Moon size={24} /> <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem className=" cursor-pointer btn btn-ghost justify-start hover:text-success" onClick={() => changeTheme("forest")}>
          <Trees size={24}/> <span>Forest</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}