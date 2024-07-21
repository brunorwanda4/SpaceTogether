import { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { getSchoolByUsername } from "@/server/getData";
import Image from "next/image"
import Link from "next/link";
import { SchoolNavSheet } from "./schoolNavSheet";
interface Props {
    link ?: boolean;
    title ?: boolean ;
    className ?: string;
}

export const Logo = ({link , title , className} : Props) => {
    return (
        <div>
            {link ? (
                <Link href={"/"}>
                    <div className=" flex gap-1 items-center">
                        <Image
                        src="/logo.png"
                        height={32}
                        width ={32}
                        alt = "Space to gether logo"
                        />
                        {title && (
                            <h1 className={cn("capitalize font-allura font-semibold text-lg" , className)}>Space Together</h1>
                        )}
                    </div>
                </Link>
            )  : (
                <div className=" flex gap-1 items-center ">
                    <Image
                    src="/logo.png"
                    height={32}
                    width ={32}
                    alt = "Space to gether logo"
                    />
                    {title && (
                        <h1 className={cn("capitalize font-allura font-semibold text-lg" , className)}>Space Together</h1>
                    )}
                </div>
            )}

        </div>
    )
}

interface SchoolLogoProps {
    link ?: boolean;
    title ?: boolean ;
    lang : Locale ;
    className ?: string;
    schoolUsername ?: string;
    isSe ?: string;
}

export const SchoolLogo = async ({
    link , title, className , lang ,schoolUsername , isSe
} : SchoolLogoProps) => {
    const defaultLogo = (
        <div>
        {link ? (
            <Link href={`/${lang}/s`}>
                <div className=" flex gap-1 items-center">
                    <Image
                    src="/logo.png"
                    height={32}
                    width ={32}
                    alt = "Space to gether logo"
                    />
                    {title && (
                        <h1 className={cn("capitalize font-allura font-semibold text-lg" , className)}>Space Together</h1>
                    )}
                </div>
            </Link>
        )  : (
            <div className=" flex gap-1 items-center ">
                <Image
                src="/logo.png"
                height={32}
                width ={32}
                alt = "Space to gether logo"
                />
                {title && (
                    <h1 className={cn("capitalize font-allura font-semibold text-lg" , className)}>Space Together</h1>
                )}
            </div>
        )}
        </div>
    )
    
    if(!schoolUsername) return defaultLogo;

    const school = await getSchoolByUsername(schoolUsername);

    if(!school) return defaultLogo;

    return (
        <div className=" flex gap-2 items-center">
            <SchoolNavSheet lang={lang}/>
            <Link href={`/${lang}/s/${schoolUsername}`}>
                <div className=" flex gap-1 items-center">
                    <Image
                    src={school.logo}
                    height={32}
                    width ={32}
                    alt ={cn("school log :" ,school.name)}
                    />
                    {title && (
                        <div className=" flex gap-1 items-center">
                            <h1 className={cn("capitalize font-allura font-semibold text-lg" , className)}>{school.name}</h1>
                        </div>
                    )}
                </div>
            </Link>
            {isSe && (<div className="  text-neutral font-semibold">/ {isSe}</div>)}
        </div>
    )
}