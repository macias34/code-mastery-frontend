// nextauth.d.ts
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    name?: string; // Customize this type based on your user data
    email?: string;
    accessToken?: string; // Customize this type based on your user data
  }

  interface Session {
    user: User | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string; // Customize this type based on your JWT token data
    email?: string; // Customize this type based on your JWT token data
    accessToken?: string; // Customize this type based on your JWT token data
  }
}
