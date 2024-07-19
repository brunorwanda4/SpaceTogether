import { BsCheck2Circle, BsPaletteFill } from "react-icons/bs"
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useTheme } from "@/hooks/useTheme"
import { useContext } from "react";
import { ThemeContext } from "@/context/changeTheme";

export const ChangeThemeDialog = () => {
  // theme
  const theme = useTheme();
  const {changeTheme} = useContext(ThemeContext)!;

  const themes   = ["light","pastel" , "forest", "dark", "night",]
  const otherTheme = ["cupcake","bumblebee","emerald","corporate","synthwave","retro","cyberpunk","valentine","halloween","garden","aqua","lofi","fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business","acid","lemonade","coffee","winter","dim","nord","sunset",]
  return (
    <AlertDialog>
        <AlertDialogTrigger className="flex gap-2 btn btn-ghost btn-sm w-full justify-between">
           <div className=" flex gap-2 items-center">
            <BsPaletteFill size={20} className=" text-gray-500"/>
              <span>Theme</span>
           </div>
           <div className=" badge badge-outline">{theme}</div>
        </AlertDialogTrigger>
        <AlertDialogContent className=" max-w-max overflow-y-auto max-h-[90vh]" data-theme={theme}>
        <AlertDialogTitle className=" flex gap-2 items-center">
            <BsPaletteFill size={20} className="text-neutral"/>
            <h3 className={" font-medium"}>
                Choose theme 
            </h3>
        </AlertDialogTitle>
        <div className=" mt-2 overflow-x-auto flex gap-2 w-full max-w-auto max-w-max">
            {/* dark */}
           {themes.map((items) => {
            return (
              <div key={items} onClick={() => changeTheme(items)} data-theme={items} className="grid grid-cols-5 grid-rows-3 rounded-md max-w-32 cursor-pointer"><div className="bg-base-200 col-start-1 row-span-2 row-start-1"></div> <div className="bg-base-300 bottom-0 col-start-1 row-start-3"></div> <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2 relative"><div className="font-bold capitalize">{items}</div> <div className="flex flex-wrap gap-1"><div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-primary-content text-sm font-bold">A</div></div> <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-secondary-content text-sm font-bold">B</div></div> <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-accent-content text-sm font-bold">C</div></div> <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-neutral-content text-sm font-bold">D</div></div></div> 
              <div className=" absolute bottom-1 right-2"> {items === `${theme}` && (<BsCheck2Circle size={20}/>)} </div>
              </div></div>
            )
           })}
        </div>
        {/* other theme */}
        <div className=" grid grid-cols-5 gap-1">
           {otherTheme.map((items) => {
            return (
              <div key={items} onClick={() => changeTheme(items)} data-theme={items} data-tip={items} className={"tooltip card p-2 flex-wrap flex gap-1   max-w-32 rounded-md cursor-pointer border-2 border-neutral"}>
                <div className="flex flex-wrap gap-1"><div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-primary-content text-sm font-bold">A</div></div> <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-secondary-content text-sm font-bold">B</div></div> <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-accent-content text-sm font-bold">C</div></div> <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6"><div className="text-neutral-content text-sm font-bold">{items === `${theme}` ?(<BsCheck2Circle size={20}/>) : "D"}</div></div></div>
            </div>
            )
           })}
        </div>
        </AlertDialogContent>
    </AlertDialog>
  )
}
