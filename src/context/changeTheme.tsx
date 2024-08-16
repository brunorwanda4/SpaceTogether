"use client";

import { Logo } from "@/components/navbar/Logo";
import { cn } from "@/lib/utils";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

export const ThemeContext = createContext<{ theme: string; changeTheme: (theme: string) => void } | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState("light");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "dark";
        setTheme(storedTheme);
        setIsMounted(true);  // Only run once on mount
    }, []);

    const changeTheme = (theme: string) => {
        if (theme !== localStorage.getItem("theme")) {
            localStorage.setItem("theme", theme);
            setTheme(theme);
        }
    };

    if (!isMounted) {
        // Simplified loading state to avoid complex rendering logic
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <div className=" line items-center justify-center">
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

interface Props {
    className?: string;
    children: React.ReactNode;
}

export const ClientThemeWrapper = ({ className, children }: Props) => {
    const { theme } = useContext(ThemeContext)!;

    // Only render if theme is available
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


// export const ThemeContext = createContext();

// interface props {
//     children : React.ReactNode
// }

// export const ThemeProvider = ({children} : props) => {
//     const [theme , setTheme] = useState("light");
//     const [isMounted , setIsMounted] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
//         const storedTheme = localStorage.getItem("theme") || "light";
//         setTheme(storedTheme);
//     } , []);

//     if (!isMounted) {
//         return (
//             <div className=" h-screen w-full grid place-content-center">
//                 <div className=" flex gap-4 flex-col items-center ">
//                     <Logo title/> 
//                     <div className=" flex gap-2">
//                         <span className=" loading loading-dots loading-lg text-info"/>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     const changeTheme = (theme : string) => {
//         setTheme(theme);
//         localStorage.setItem("theme", theme);
//     }

//     return (
//         <ThemeContext.Provider value={{theme , changeTheme}}>
//             {children}
//         </ThemeContext.Provider>
//     )
// }

// export const ClientThemeWrapper = ({children} : props) => {
//     const {theme} = useContext(ThemeContext);

//     return (
//         <div data-theme={theme}>
//             {children}
//         </div>
//     )
// }



// import { Logo } from "@/components/navbar/Logo";
// import { cn } from "@/lib/utils";
// import { createContext, useState, useContext, ReactNode } from "react";

// export const ThemeContext = createContext<{ theme: string; changeTheme: (theme: string) => void } | null>(null);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//     // Initialize theme based on localStorage or default to "dark"
//     const themeFromLocalStorage = typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark";
//     const [theme, setTheme] = useState(themeFromLocalStorage);
//     const [isMounted, setIsMounted] = useState(typeof window !== "undefined");

//     const changeTheme = (newTheme: string) => {
//         if (newTheme !== theme) {
//             localStorage.setItem("theme", newTheme);
//             setTheme(newTheme);
//         }
//     };

//     // Conditional rendering based on mounting status
//     if (!isMounted) {
//         return (
//             <div className="h-screen w-full flex items-center justify-center">
//                 <div className=" flex flex-col gap-4 items-center  justify-center">
//                     <Logo title />
//                     <span className="loading loading-dots loading-lg text-info" />
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <ThemeContext.Provider value={{ theme, changeTheme }}>
//             {children} 
//         </ThemeContext.Provider>
//     );
// };

// interface Props {
//     className?: string;
//     children: React.ReactNode;
// }

// export const ClientThemeWrapper = ({ className, children }: Props) => {
//     const { theme } = useContext(ThemeContext)!;

//     if (!theme) {
//         return null;
//     }

//     return (
//         <main data-theme={theme} className={cn(theme, "min-h-screen w-full", className)} >
//             {children}
//         </main>
//     );
// };
