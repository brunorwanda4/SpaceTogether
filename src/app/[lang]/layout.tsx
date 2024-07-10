import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChangeTheme, ClientThemeWrapper } from "@/context/changeTheme";
import { LanguagesProps } from "@/types/pages";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
      <body className={inter.className}>
          <ChangeTheme>
            <ClientThemeWrapper>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
         >
              {children}
        </ThemeProvider>
            </ClientThemeWrapper>
          </ChangeTheme>
      </body>
    </html>
  );
}
