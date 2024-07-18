import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ChangeTheme, ClientThemeWrapper } from "@/context/changeTheme";
import { LanguagesProps } from "@/types/pages";
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Together",
  description: "Application which helps people to communicant offline and online",
  icons: {
    icon: {
      href: "/logo.png",
      url: "/logo.png",
    }
  }
};

export default function RootLayout(
  {
    children,
    params : {lang},
  } : LanguagesProps
) {
  return (
    <html lang={lang}>
      <body className={cn(inter.className , " bg-fixed")}>
          <ChangeTheme>
            <ClientThemeWrapper>
              {children}
              <Toaster />
            </ClientThemeWrapper>
          </ChangeTheme>
      </body>
    </html>
  );
}
