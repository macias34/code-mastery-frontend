import * as jose from "jose";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerSession } from "next-auth";
import { ParsedUrlQuery } from "querystring";

import { UserRole } from "@/features/user";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface WithRoleAuthorizationArgs {
  req: GetServerSidePropsContext<ParsedUrlQuery>["req"];
  res: GetServerSidePropsContext<ParsedUrlQuery>["res"];
  userRoleToExclude?: UserRole;
}

type WithRoleAuthorizationReturnType = Promise<
  GetServerSidePropsResult<{ [key: string]: any }> // eslint-disable-line @typescript-eslint/no-explicit-any
>;

export const withRoleAuthorization = async ({
  req,
  res,
  userRoleToExclude = UserRole.USER,
}: WithRoleAuthorizationArgs): WithRoleAuthorizationReturnType => {
  const session = await getServerSession(req, res, authOptions);
  const accessToken = session?.user?.accessToken ?? "";
  let userRole: UserRole | undefined;

  if (accessToken) {
    const decodedToken = jose.decodeJwt(accessToken);
    userRole = decodedToken?.role as UserRole;
  }

  if (!session || userRole === userRoleToExclude) {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  }

  return {
    props: {},
  };
};
