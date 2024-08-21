"use client";

import { useContext } from "react";
import { ThemeContext } from "./changeTheme";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    children: React.ReactNode;
}

export const ClientThemeWrapper = ({ className, children }: Props) => {
    const { theme } = useContext(ThemeContext)!;

    if (!theme) {
        return null;
    }

    return (
        <main 
            data-theme={theme} 
            className={cn(theme, "min-h-screen w-full", className)}
        >
            {children}
        </main>
    );
};