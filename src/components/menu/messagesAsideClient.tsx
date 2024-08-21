"use client"

import { Locale } from "@/i18n"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsChatDotsFill, BsChatFill, BsMessenger, BsPeopleFill } from "react-icons/bs"
import { FaMessage } from "react-icons/fa6"
import { GoHomeFill } from "react-icons/go"

interface props {
    lang: Locale
};

type TChooseMessages = "request" | "group" | "default";

const MessagesAsideClient = ({
    lang
}: props) => {

    const [choose, setChoose] = useState<TChooseMessages>(() => {
        const storedChoice = localStorage.getItem("chooseMessages") as TChooseMessages;
        if (!!storedChoice) return storedChoice;
        const params = new URLSearchParams(window.location.search);
        return (params.get("choose") as TChooseMessages) || "default";
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set("choose", choose);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        
        localStorage.setItem("chooseMessages", choose);
    }, [choose]);

    const handleChangeMessages = (choice: TChooseMessages) => {
        setChoose(choice);
    }

    const renderMessages = () => {
        switch (choose) {
            case "default" : 
            return <div>default</div>
            case "group" : 
            return <div>group</div>
            case "request" :
            return <div>request</div>
            default : return <div>default</div>
        }
    };
    return (
        <div className="flex">
            <aside className="bg-base-300 w-14 h-full min-w-14 p-1 flex flex-col gap-2">
                <Link href={`/${lang}/s`} className="btn btn-ghost btn-sm">
                    <GoHomeFill size={24} />
                </Link>
                <button onClick={() => handleChangeMessages("default")} className="btn btn-ghost btn-sm">
                    <BsChatFill size={24} className={cn(choose === "default" && " text-warning")}/>
                </button>
                <button onClick={() => handleChangeMessages("group")} className="btn btn-ghost btn-sm">
                    <BsPeopleFill size={24} className={cn(choose === "group" && " text-warning")}/>
                </button>
                <button onClick={() => handleChangeMessages("request")} className="btn btn-ghost btn-sm">
                    <BsChatDotsFill size={24} className={cn(choose === "request" && " text-warning")}/>
                </button>
            </aside>
            <div>
                {renderMessages()}
            </div>
        </div>
    )
}

export default MessagesAsideClient
