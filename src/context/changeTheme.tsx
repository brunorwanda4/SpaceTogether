"use client";

import { Logo } from "@/components/navbar/Logo";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

export const ThemeContext = createContext<{ theme: string; changeTheme: (theme: string) => void } | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState("light");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);  // Set isMounted to true after the component mounts

        // Access localStorage only on the client
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme") || "dark";
            setTheme(storedTheme);
        }
    }, []);
    
    const changeTheme = (theme: string) => {
        if (typeof window !== "undefined") {
            if (theme !== localStorage.getItem("theme")) {
                localStorage.setItem("theme", theme);
                setTheme(theme);
            }
        }
    };

    if (!isMounted) {
        // Simplified loading state to avoid complex rendering logic
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <div className="line items-center justify-center">
                    <Logo title />
                    <span className="loading loading-dots loading-lg text-info" />
                </div>
            </div>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children} 
        </ThemeContext.Provider>
    );
};