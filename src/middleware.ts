import jwt from "jsonwebtoken";
import { withAuth } from "next-auth/middleware";

import { UserRole } from "./user";

interface DecodedToken {
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const pathname = req.nextUrl.pathname;

      if (
        pathname.startsWith("/_next") ||
        pathname === "/favicon.ico" ||
        !pathname.startsWith("/dashboard")
      ) {
        return true;
      }

      if (token && token.accessToken) {
        const decodedToken = jwt.decode(token.accessToken) as DecodedToken;
        const userRole = decodedToken.role;

        if (userRole === UserRole.USER) {
          return false;
        }

        return true;
      }

      return false;
    },
  },
  pages: {
    signIn: "/auth",
  },
});
