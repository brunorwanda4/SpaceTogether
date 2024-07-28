"use client";

import { cn } from "@/lib/utils";
import { SchoolLogo } from "./Logo";
import { Locale } from "@/i18n";
import { UseScrollTop } from "@/hooks/scrollTop";

interface props{
    children: React.ReactNode
}

const SchoolNavClient = ({
    children
} : props) => {
  const scroll = UseScrollTop()
  return (
    <nav className={cn(`fixed flex justify-between z-50 w-full h-12 lg:px-2 md:px-2 py-1 shadow-md items-center backdrop-blur-md` , scroll && " border-b dark:border-gray-500 dark:shadow-none shadow-sm backdrop-blur-md ")}>
      {children}
    </nav>
  )
}

export default SchoolNavClient
