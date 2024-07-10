"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

export const ThemeContext = createContext<{ theme: string; changeTheme: (theme: string) => void } | null>(null);

export const ChangeTheme = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState("light");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
    }, []);

    const changeTheme = (theme: string) => {
        setTheme(theme);
        localStorage.setItem("theme", theme);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

interface Props {
    className ?: string;
    children : React.ReactNode
}

export const ClientThemeWrapper = ({className , children} : Props) => {
    const { theme } = useContext(ThemeContext)!;
    return <main data-theme={theme || "cupcake"} className={cn(theme, "min-h-screen", className)}>{children}</main>;
};
