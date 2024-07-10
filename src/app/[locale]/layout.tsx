import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChangeTheme, ClientThemeWrapper } from "@/context/changeTheme";

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

interface Props {
  children: React.ReactNode;
  params : {
    locale: string;
  };
}
export default function RootLayout(
  {
    children,
    params : {locale},
  } : Props
) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ChangeTheme>
          <ClientThemeWrapper>
            {children}
          </ClientThemeWrapper>
        </ChangeTheme>
      </body>
    </html>
  );
}
