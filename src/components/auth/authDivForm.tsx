"use client";

import { Logo } from '../navbar/Logo';
import { cn } from '@/lib/utils';
import { Locale } from '@/i18n';
import { MyImage } from '../style/myImage';
import { useTheme } from '@/hooks/useTheme';

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

  const themeContent = () => {
    switch (theme) {
      case "light":
        return (
          <div>
              <MyImage className=' h-screen w-full' classname=' rounded-none' src={"/images/4.jpg"}/>
              <div className=' bg-base-100 size-20 absolute bottom-4 right-4 min-h-32 min-w-44 w-80 shadow-md rounded-lg p-2 max-md:opacity-0 opacity-100'>
                <div className=' text-2xl flex justify-center'>
                  🐨
                </div>
                <p className=' text-xs text-center'>
                  The animal in the image is a koala, a marsupial native to Australia. <br /> Koalas are known for their tree-dwelling habits and typically sleep for up to 18-22 hours a day, often hugging trees for comfort and support.
                </p>
              </div>
          </div>
        )
      case "pastel":
        return (
          <div>
            <MyImage className=' h-screen w-full' classname=' rounded-none' src={"/images/1.jpg"}/>
              <div className=' bg-base-100 size-20 absolute bottom-4 right-4 min-h-32 min-w-44 w-80 shadow-md rounded-lg p-2 max-md:opacity-0 opacity-100'>
                <div className=' text-2xl flex justify-center'>
                  🐨
                </div>
                <p className=' text-xs text-center'>
                  The animal in the image is a koala, a marsupial native to Australia. <br /> Koalas are known for their tree-dwelling habits and typically sleep for up to 18-22 hours a day, often hugging trees for comfort and support.
                </p>
              </div>
          </div>
        )
      case "forest":
        return (
          <div>
              <MyImage className=' h-screen w-full' classname=' rounded-none' src={"/images/5.jpg"}/>
              <div className=' bg-base-100 size-20 absolute bottom-4 right-4 min-h-32 min-w-44 w-80 shadow-md rounded-lg p-2 max-md:opacity-0 opacity-100'>
                <div className=' text-2xl flex justify-center'>
                  🐨
                </div>
                <p className=' text-xs text-center'>
                  The animal in the image is a koala, a marsupial native to Australia. <br /> Koalas are known for their tree-dwelling habits and typically sleep for up to 18-22 hours a day, often hugging trees for comfort and support.
                </p>
              </div>
          </div>
        )
      case "dark":
        return (
          <div>
            <MyImage className=' h-screen w-full' classname=' rounded-none' src={"/images/6.jpg"}/>
            <div className=' bg-base-100 size-20 absolute bottom-4 right-4 min-h-32 min-w-44 w-80 shadow-md rounded-lg p-2 max-md:opacity-0 opacity-100'>
              <div className=' text-2xl flex justify-center'>
                🐨
              </div>
              <p className=' text-xs text-center'>
                The animal in the image is a koala, a marsupial native to Australia. <br /> Koalas are known for their tree-dwelling habits and typically sleep for up to 18-22 hours a day, often hugging trees for comfort and support.
              </p>
            </div>
        </div>
        )
      case "night":
        return (
          <div>
          <MyImage className=' h-screen w-full' classname=' rounded-none' src={"/images/7.jpg"}/>
            <div className=' bg-base-100 size-20 absolute bottom-4 right-4 min-h-32 min-w-44 w-80 shadow-md rounded-lg p-2 max-md:opacity-0 opacity-100'>
              <div className=' text-2xl flex justify-center'>
                🐨
              </div>
              <p className=' text-xs text-center'>
                The animal in the image is a koala, a marsupial native to Australia. <br /> Koalas are known for their tree-dwelling habits and typically sleep for up to 18-22 hours a day, often hugging trees for comfort and support.
              </p>
            </div>
        </div>
        )
      default:
        return (
          <div>
          <MyImage className=' h-screen w-full' classname=' rounded-none' src={"/images/8.jpg"}/>
            <div className=' bg-base-100 size-20 absolute bottom-4 right-4 min-h-32 min-w-44 w-80 shadow-md rounded-lg p-2 max-md:opacity-0 opacity-100'>
              <div className=' text-2xl flex justify-center'>
                🐨
              </div>
              <p className=' text-xs text-center'>
                The animal in the image is a koala, a marsupial native to Australia. <br /> Koalas are known for their tree-dwelling habits and typically sleep for up to 18-22 hours a day, often hugging trees for comfort and support.
              </p>
            </div>
        </div>
        )
    }
  }
  return (
    <div className={cn("min-h-screen flex gap-2 max-md:relative justify-between" , className)}>
       <section className='p-5 max-md:absolute max-md:items-center max-md:h-full max-md:justify-center max-md:top- max-md:z-40 max-md:w-full w-full'>
          <div className=' items-center justify-center max-md:h-full max-w-full max-md:flex max-md:flex-col'>
            <div className=' flex justify-center mb-4'>
                <Logo title link className=' z-[99]'/>
            </div>
            <main className={cn("max-md:card max-md:backdrop-blur-xl max-md:shadow-md max-md:min-w-96 max-md:w-full max-md:bg-black/40 max-md:border max-md:p-4 max-md:max-w-xl max-md:min-h-fit max-md:overflow-y-auto")}>
              <div className=" bg-base-300 shadow-lg rounded-xl p-4 card">
              <div className=" flex justify-center w-full"><h2 className=' text-center text-xl font-bold  w-80 md:text-2xl'>{title}</h2></div>
                {children}
              </div>
          </main>
          </div>
        </section>
        <div className=' w-full relative'>
        <div className="absolute left-0 bottom-0 inset-x-0 h-full w-32 bg-gradient-to-l pointer-events-none select-none from-transparent to-base-100 max-md:opacity-0 z-40 " />
        {themeContent()}
          {/* <div>
            <MyImage className=' h-screen w-full' classname=' rounded-none' src={"/p.jpg"}/>
          </div> */}
        </div>
    </div>
  )
}
