"use client";

import { useEffect, useState } from "react";

export const UserScrollTop = () => {
    const [scroll, setScroll] = useState<boolean>(false);

    useEffect(() => {
        let scrollDown = window.pageYOffset;
        const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const scrollingDown = currentScrollPos > scrollDown;

        setScroll(scrollingDown);
        scrollDown = currentScrollPos;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scroll;
   
}