import { withAuth } from "next-auth/middleware";

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

      if (token) return true;

      return false;
    },
  },
  pages: {
    signIn: "/auth",
  },
});
