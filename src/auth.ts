import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import authConfig from "@/auth.config"
import clientPromise from "@/lib/db"

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
})