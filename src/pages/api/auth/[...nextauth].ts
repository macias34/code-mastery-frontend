/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

import { signIn } from "@/features/auth";

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

        const { accessToken } = await signIn({
          username,
          password,
        });

        if (!accessToken || Object.keys(accessToken).length === 0) return null;

        const user: { name: string; accessToken: string } = {
          name: username,
          accessToken,
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
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      if (token?.username && token?.accessToken && session.user) {
        session.user.name = token.username;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
};

export default NextAuth(authOptions);
