import type { Metadata } from "next";
import { Inter } from "next/font/google";

// styles
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ThemeProvider } from "@/context/changeTheme";
import { LanguagesProps } from "@/types/pages";
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils";
import DesktopMenu from "@/components/menu/desktopMenu";
import { ClientThemeWrapper } from "@/context/ClientThemeWrapper";
import ProgressBar from "@/context/progressBar";

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
          <ThemeProvider>
            <ClientThemeWrapper>
              <div>
                <DesktopMenu lang={lang}/>
                {/* <ProgressBar/> */}
                {children}
                <Toaster/>
              </div>
            </ClientThemeWrapper>
          </ThemeProvider>
      </body>
    </html>
  );
}
