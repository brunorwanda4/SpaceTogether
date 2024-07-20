import { TURole} from "@/types/user";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role :  TURole
};

declare module "next-auth" {
    interface Session {
      user: ExtendedUser;
    }
  }
  