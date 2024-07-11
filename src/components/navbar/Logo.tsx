import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
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