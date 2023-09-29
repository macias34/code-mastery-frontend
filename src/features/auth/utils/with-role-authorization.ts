import * as jose from "jose";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerSession } from "next-auth";
import { ParsedUrlQuery } from "node:querystring";

import { UserRole } from "@/features/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface WithRoleAuthorizationArguments {
  req: GetServerSidePropsContext<ParsedUrlQuery>["req"];
  res: GetServerSidePropsContext<ParsedUrlQuery>["res"];
  userRoleToExclude?: UserRole;
  redirectDestination?: string;
}

type WithRoleAuthorizationReturnType = Promise<
  GetServerSidePropsResult<{ [key: string]: any }> // eslint-disable-line @typescript-eslint/no-explicit-any
>;

export const withRoleAuthorization = async ({
  req,
  res,
  userRoleToExclude,
  redirectDestination = "/",
}: WithRoleAuthorizationArguments): WithRoleAuthorizationReturnType => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user?.accessToken === undefined) {
    return { redirect: { destination: "/auth", statusCode: 302 } };
  }

  const userRole = jose.decodeJwt(session.user.accessToken)?.role as UserRole;

  if (userRole === userRoleToExclude) {
    return { redirect: { destination: redirectDestination, statusCode: 302 } };
  }

  return { props: {} };
};
