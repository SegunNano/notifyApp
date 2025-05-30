import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import connectDB from "./lib/db";
import User from "./models/user";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

// types/next-auth.d.ts or wherever your types go

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      isAdmin: boolean;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      clientId: process.env.GITHUB_CLIENT_ID,
    }),
    Google({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
    }),
    Credentials({
      name: "local",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if (!(email && password))
          throw new CredentialsSignin("Please fill all fields!");

        await connectDB();

        const user = await User.findOne({ email }).select("+password +isAdmin");

        if (!(user && user.password))
          throw new Error("Invalid email or password 1!");

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new Error("Invalid email or password 2!");

        const userData = {
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          id: user._id,
        };
        return userData;
      },
    }),
  ],
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // session.user.id = token.id;
        // session.user.email = token.email;
        // session.user.username = token.username;
        // session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // token.username = user.username;
        // token.isAdmin = user.isAdmin;
      }
      return token;
    },
    signIn: async ({ user, account }) => {
      console.log({ user, account });
      if (account?.provider === "google") {
        try {
          const { email, id, image, name } = user;
          await connectDB();
          const existingUser = await User.findOne({ email });

          if (!existingUser)
            await User.create({ email, name, image, authProviderId: id });
          else return true;
        } catch (err) {
          throw new Error("Error while creating user!");
        }
      }
      if (account?.provider === "credentials") return true;
      if (account?.provider === "github") return true;
      else return false;
    },
  },
});
