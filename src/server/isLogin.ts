"use server"

import { auth } from "@/auth"
import { Locale } from "@/i18n";
import { NextResponse } from "next/server";

interface Props {
    lang : Locale;
}

export const isLogin = async() => {
    const user = await auth()
    return user
}