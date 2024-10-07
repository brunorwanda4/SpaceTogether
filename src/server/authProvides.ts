"use server"

import { signIn } from "@/auth"
import { Locale } from "@/i18n"

type provider = {
    provides : "github" | "google",
}

export const loginAuthProvider = async ({provides} : provider) => {
   await signIn(provides , {
    redirectTo : `/s`
   })
}

export const registerAuthProvider = async ({provides} : provider) => {
    await signIn(provides , {
        redirectTo : `/onboarding`
    })
}