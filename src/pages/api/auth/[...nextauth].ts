/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

import { signUp } from "@/libs/auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Hasło", type: "password" },
      },

      authorize: async (credentials) => {
        const loginSchema = z.object({
          username: z.string().min(2),
          password: z.string().min(5).max(100),
        });

        const { username, password } =
          await loginSchema.parseAsync(credentials);

        const { token: access_token } = await signUp({
          username,
          password,
        });

        if (!access_token || Object.keys(access_token).length === 0)
          return null;

        const user: { name: string; access_token: string } = {
          name: username,
          access_token,
        };

        return user as any;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60 - 120, // 5 hours - 2 minutes
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (account) {
        token.username = user.name;
        token.access_token = user.access_token;
      }
      return token;
    },
    session({ session, token }) {
      if (token?.username && token?.access_token && session.user) {
        session.user.name = token.username;
        session.user.access_token = token.access_token;
      }

      return session;
    },
  },
  pages: {
    signIn: "/panel/logowanie",
  },
};

export default NextAuth(authOptions);
