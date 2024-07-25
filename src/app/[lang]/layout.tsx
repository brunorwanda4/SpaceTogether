import type { Metadata } from "next";
import { Inter } from "next/font/google";

// styles
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChangeTheme, ClientThemeWrapper } from "@/context/changeTheme";
import { LanguagesProps } from "@/types/pages";
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils";
import DesktopMenu from "@/components/menu/desktopMenu";

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
      <body className={cn(inter.className ,)}>
          <ChangeTheme>
            <ClientThemeWrapper>
              <DesktopMenu lang={lang}/>
              <div className=" pt-12">{children}</div>
              <Toaster />
            </ClientThemeWrapper>
          </ChangeTheme>
      </body>
    </html>
  );
}
