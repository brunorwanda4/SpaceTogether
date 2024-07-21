import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
    className ?: string;
    classname ?: string;
    src : string | null | undefined;
    alt ?: string;
    href ?: string;
}

export const MyImage = ({
    className, classname , src , alt ,  href
} : Props) => {
    const image = ( 
        <Image 
        src={src || "p.jpg"}
        alt={cn("image alt :" , alt)}
        fill
        loading="lazy"
        className={cn(" object-cover rounded-md", classname)}
       />
    )

    if (!!href) {
        return (
            <Link href={href} className={cn(" relative size-32" , className)}>
                {image}
           </Link>
        )
    } else {
        return (
            <div className={cn(" relative size-32" , className)}>
            {image}
           </div>
        )
    }
   
}