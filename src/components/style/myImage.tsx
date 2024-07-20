import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
    className ?: string;
    classname ?: string;
    src : string;
    alt ?: string;
}

export const MyImage = ({
    className, classname , src , alt
} : Props) => {
    return (
        <div className={cn(" relative size-32" , className)}>
            <Image 
             src={src}
             alt={cn("image alt :" , alt)}
             fill
             loading="lazy"
             className={cn(" object-cover rounded-md", classname)}
            />
        </div>
    )
}