import * as jose from "jose";
import { useRouter } from "next/router";
import { type ReactNode, useEffect } from "react";

import { ShopLayout } from "@/features/shop";
import { type UserRole, useUser } from "@/features/user";
import { Spinner } from "@/shared/components";

interface UseRoleAuthorizationArguments {
  userRoleToExclude?: UserRole;
  redirectDestination?: string;
  loadingElement?: ReactNode;
}

interface UseRoleAuthorizationArguments {
  userRoleToExclude?: UserRole;
  redirectDestination?: string;
  loadingElement?: React.ReactNode;
}

const DefaultLoadingElement = () => {
  return (
    <ShopLayout>
      <Spinner className="absolute top-1/2 left-1/2 h-8 w-8" />
    </ShopLayout>
  );
};

export const withRoleAuthorization = (
  WrappedComponent: React.ComponentType,
  options: UseRoleAuthorizationArguments,
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

      if (userRole === options.userRoleToExclude) {
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

    if (userRole === options.userRoleToExclude) {
      return loadingElement;
    }

    return <WrappedComponent {...props} />;
  };
};
