"use client";

import { Locale } from '@/i18n';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { IoMdMenu } from "react-icons/io";
import { useTheme } from '@/hooks/useTheme';
import { Logo,} from './Logo';
import { useRouter } from 'next/navigation';
import { GoHomeFill } from 'react-icons/go';
import { cn } from '@/lib/utils';
import { SPLine } from '../style/simpleComponents/line';

interface props {
    lang : Locale;
}

export const SchoolNavSheet = ({
    lang
} : props) => {
  const theme = useTheme();
  const route = useRouter();
  return (
    <Sheet>
        <SheetTrigger className=' btn btn-circle btn-sm btn-ghost'>
            <IoMdMenu size={20}/>
        </SheetTrigger>
        <SheetContent className=' px-2' side={"left"} data-theme={theme}>
            <SheetTitle>
                <Logo link title/>
            </SheetTitle>
            <SPLine/>
            <div>
            <SheetClose onClick={() => route.push(`/${lang}/s`)} className=' flex gap-2 btn btn-ghost btn-sm w-full justify-start'>
                <GoHomeFill size={20} className={cn("text-gray-500",)}/>
                <span>Home</span>
            </SheetClose>
            </div>
        </SheetContent>
    </Sheet>
  )
}
