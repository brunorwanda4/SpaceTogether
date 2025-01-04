"use client";

import { Logo } from '../navbar/Logo';
import { cn } from '@/lib/utils';
import { Locale } from '@/i18n';
import { MyImage } from '../style/myImage';
import { useTheme } from '@/hooks/useTheme';
import { usePathname } from 'next/navigation';
import { RegisterProvider } from './authProvides';
import { SPLine } from '../style/simpleComponents/line';
import Link from 'next/link';

interface Props {
    children: React.ReactNode;
    className?: string;
    title : string;   
    lang : Locale;
    is_cool ?: boolean;
    classname ?: string;
}

export const AuthDivPage = ({
    children , className , title, lang , is_cool , classname
} : Props) => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <div className={cn("min-h-screen h-full flex gap-2 justify-center" , className)}>
      <div className=" h-80"/>
       <section className='p-5 max-md:absolute max-md:items-center max-md:h-full max-md:justify-center max-md:z-40 max-md:w-full'>
          <div className=' items-center justify-center flex h-full max-lg:h-full max-w-full max-md:flex max-md:flex-col'>
            <main className={cn(" w-full")}>
              <div className=" bg-base-300 shadow-lg p-4 card ">
                <div className=' flex justify-center mb-4'>
                  <Logo title link className=' '/>
                </div>
               <div className=" flex justify-center"><h2 className=' text-center text-xl font-semibold leading-4  w-80 md:text-2xl'>{title}</h2></div>
                <div className=' flex gap-4 mt-2 max-lg:flex-col-reverse'>
                  <div className=' max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:items-center'>
                    <h2 className=' font-medium text-base text-center leading-3 flex w-64 justify-center'>
                      Continuer with providers
                    </h2>
                    <div className=' mt-4 max-lg:mt-1'>
                      <RegisterProvider />
                    </div>
                  </div>
                  <div className=' bg-base-200 p-4 card '>
                    {children}
                      {pathname === `/${lang}/auth/register` && (
                        <Link className=' text-sm mt-2' href={`/${lang}/auth/login`}>If you have account you can <span className=' text-info font-medium link'>Login!</span></Link>
                      )}
                      {pathname === `/${lang}/auth/login` && (
                        <Link className=' text-sm mt-2' href={`/${lang}/auth/register`}>If you don&apos;t have account you can <span className=' text-info font-medium link'>Create account!</span></Link>
                      )}
                  </div>
                </div>
            </div>
          </main>
          </div>
        </section>
        <div className=" h-44"/>
    </div>
  )
}
