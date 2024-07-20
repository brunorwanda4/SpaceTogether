import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import authConfig from "@/auth.config"
import clientPromise from "@/lib/db"
import { getUserByEmail,} from "./data/getUserData"
import { TURole } from "./types/user"

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks : {
    async session({token , session}) {
      if(!token) return token;

      if(token.sub && session.user) {
        session.user.id = token.sub;
      }
      
      if(token.name && session.user) {
        session.user.name = token.name;
      }

      if(token.picture && session.user) {
        session.user.image = token.picture;
      }

      if(token.role && session.user) {
        session.user.role = token.role as TURole
      }
      
      return session
    },
    async jwt ({token}) {
      if(!token.email) return token;
      const user = await getUserByEmail(token.email);

      if (!user) return token;

      token.name = user.name;
      token.email = user.email;
      token.picture = user.image;
      token.sub = user._id.toString();
      token.role = user.role;

      return token
    }
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt",},
  ...authConfig,
  secret : process.env.AUTH_SECRET
})