import * as jose from "jose";
import { useRouter } from "next/router";
import { type ReactNode, useEffect } from "react";

import { type UserRole, useUser } from "@/features/user";

import { DefaultLoadingElement } from "./default-loading-element";

interface WithRoleAuthorizationArguments {
  userRolesToExclude?: UserRole[];
  redirectDestination?: string;
  loadingElement?: ReactNode;
}

export const withRoleAuthorization = (
  WrappedComponent: React.ComponentType,
  options: WithRoleAuthorizationArguments,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function WithRoleAuthorization(props: any) {
    const { accessToken, isLoading } = useUser();
    const router = useRouter();

    const loadingElement = options.loadingElement || <DefaultLoadingElement />;

    useEffect(() => {
      if (isLoading) {
        return;
      }

      if (!accessToken) {
        void router.push("/");
        return;
      }

      const userRole = jose.decodeJwt(accessToken)?.role as UserRole;

      if (options.userRolesToExclude?.includes(userRole)) {
        void router.push(options.redirectDestination || "/");
      }
    }, [accessToken, isLoading, router]);

    if (isLoading) {
      return loadingElement;
    }

    if (!accessToken) {
      return loadingElement;
    }

    const userRole = jose.decodeJwt(accessToken)?.role as UserRole;

    if (options.userRolesToExclude?.includes(userRole)) {
      return loadingElement;
    }

    return <WrappedComponent {...props} />;
  };
};
