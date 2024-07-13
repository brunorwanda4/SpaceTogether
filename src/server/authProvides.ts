"use server"

import { signIn } from "@/auth"
import { Locale } from "@/i18n"

type provider = {
    provides : "github" | "google",
    locale : Locale
}

export const loginAuthProvider = async ({provides , locale} : provider) => {
   await signIn(provides)
}