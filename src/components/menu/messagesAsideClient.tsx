"use client"

import { Locale } from "@/i18n"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsChatDotsFill, BsChatFill, BsCheck, BsCheck2, BsCheck2Circle, BsCheckCircle, BsChevronLeft, BsChevronRight, BsFillPeopleFill, BsMessenger, BsPencilSquare, BsPeopleFill, BsPersonPlusFill } from "react-icons/bs"
import { FaMessage, FaPeopleGroup } from "react-icons/fa6"
import { GoHomeFill } from "react-icons/go"
import { MessagesSearch } from "../forms/search/messagesSearch"
import { Pencil } from "lucide-react"
import { MyImage } from "../style/myImage"

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

    const renderTitle = () => {
        switch (choose) {
            case "default" : 
              return (
                <div className=" flex gap-2 justify-between items-center">
                    <h2 className=" font-bold text-lg">Charts</h2>
                    <div  className="  btn btn-sm btn-circle btn-ghost"><BsPencilSquare size={18} className=" text-gray-500"/></div>
                </div>
              )
            case "group" : 
            return (
                <div className=" flex gap-2 justify-between items-center">
                    <h2 className=" font-bold text-lg">Groups</h2>
                    <div  className="  btn btn-sm btn-circle btn-ghost"><BsFillPeopleFill size={18} className=" text-gray-500"/></div>
                </div>
            )
            case "request" : 
            return (
                <div className=" flex gap-2 justify-between items-center">
                    <h2 className=" font-bold text-lg">Messages Request</h2>
                </div>
            )
            default : 
            return (
                <div className=" flex gap-2 justify-between items-center">
                    <h2 className=" font-bold text-lg">Charts</h2>
                <div  className="  btn btn-sm btn-circle btn-ghost"><BsPencilSquare size={18} className=" text-gray-500"/></div>
            </div>
            )
        }
    }

    const renderMessages = () => {
        switch (choose) {
            case "default" : 
            return (
                <main className=" flex flex-col overflow-x-hidden overflow-y-auto">
                    <MessagesAsideActive />
                    <MessagesAsideDefault lang={lang}/>
                </main>
            );
            case "group" : 
            return (<MessagesAsideGroups/>)
            case "request" :
            return (<main>request</main>)
            default : return (
                <main className=" flex flex-col overflow-x-hidden overflow-y-auto">
                    <MessagesAsideActive />
                    <MessagesAsideDefault lang={lang}/>
                </main>
            )
        }
    };

    return (
        <div className="flex w-full">
            <aside className="bg-base-300 w-14 h-full min-w-14 p-1 flex flex-col gap-2">
                <Link data-tip="Home" href={`/${lang}/s`} className=" tooltip tooltip-right btn btn-ghost btn-sm">
                    <GoHomeFill size={24} className=" text-gray-500"/>
                </Link>
                <button onClick={() => handleChangeMessages("default")} data-tip="Chart" className="tooltip tooltip-right btn btn-ghost btn-sm">
                    <BsChatFill size={24} className={cn("text-gray-500" ,choose === "default" && " text-warning")}/>
                </button>
                <button onClick={() => handleChangeMessages("group")} data-tip="Groups" className="tooltip tooltip-right btn btn-ghost btn-sm">
                    <BsPeopleFill size={24} className={cn("text-gray-500" ,choose === "group" && " text-warning")}/>
                </button>
                <button onClick={() => handleChangeMessages("request")} data-tip="Requests messages" className="tooltip tooltip-right btn btn-ghost btn-sm">
                    <BsChatDotsFill size={24} className={cn("text-gray-500" ,choose === "request" && " text-warning")}/>
                </button>
            </aside>
            <div className=" w-full">
                <div className=" mt-1 px-2">
                    {renderTitle()}
                </div>
                <MessagesSearch />
                {renderMessages()}
            </div>
        </div>
    )
}

export default MessagesAsideClient

interface messagesAsideDefaultProps {
    lang : Locale;
}

export const MessagesAsideDefault = ({
    lang
} : messagesAsideDefaultProps) => {
    return (
     <div className=" mt-4 flex flex-col px-2 w-full">
        <Link href={`/${lang}/m/124bd`} className=" flex gap-2 items-center cursor-pointer w-full">
          <MyImage className=" min-h-14 min-w-14 size-14 avatar" classname=" rounded-full" src={"/profiles/b/4.png"}/>
          <div className=" w-full">
            <div className=" flex justify-between w-full">
              <span className=" font-semibold">Bruno Allen</span>
              <div>
                <BsCheck size={18}/>
              </div>
            </div>
            <div className=" flex gap-2 flex-1 items-center">
              <span className=" font-medium">hello</span>
              <span className=" text-gray-500 text-xs">1:39 AM</span>
            </div>
          </div>
        </Link>
     </div>
    )
  }
  
  export const MessagesAsideGroups = () => {
    return (
     <div>
        groups
     </div>
    )
  }
  
  export const MessagesAsideActive = () => {
    const fake_active_user = [
        { 
            id: 1,
            name: "Bruno Allen",
            image: "/profiles/b/4.png",
            status: "online"
        },
        { 
            id: 2,
            name: "Sophie Turner",
            image: "/profiles/b/2.png",
            status: "offline"
        },
        { 
            id: 3,
            name: "Maxwell King",
            image: "/profiles/o/3.png",
            status: "online"
        },
        { 
            id: 4,
            name: "Ava Smith",
            image: "/profiles/g/1.png",
            status: "away"
        },
        { 
            id: 5,
            name: "Liam Johnson",
            image: "", // No image available
            status: "online"
        },
        { 
            id: 6,
            name: "Emma Davis",
            image: "/profiles/b/5.png",
            status: "busy"
        },
        { 
            id: 7,
            name: "Olivia Brown",
            image: "", // No image available
            status: "offline"
        },
        { 
            id: 8,
            name: "Lucas Miller",
            image: "/profiles/g/6.png",
            status: "online"
        }
    ];
    

   const last_active_user = fake_active_user.length - 1;

    const fake_carousel_items = fake_active_user.map((items, index) => (
        <div id={`slide${index}`} className="carousel-item relative" key={index}>
            {/* <div className=" ">
                <MyImage className={cn("size-12  avatar" , items.status === "online" && items.status)} classname=" rounded-full" src={items.image ? items.image : "/p.jpg"} />
                <div className=" font-medium text-xs">
                    {items.name}
                </div>
            </div> */}
            {/* <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${index === 0 ? last_active_user : index - 1}`} className="btn btn-circle btn-sm btn-neutral">❮</a>
                <a href={`#slide${index === last_active_user ? 0 : index + 1}`} className="btn btn-circle btn-sm btn-neutral">❯</a>
            </div> */}
        </div>
    ));
    return (
        <div className="carousel w-full mt-3 overflow-x-auto max-w-full gap-2">
           {fake_carousel_items}
        </div>
    )
  }