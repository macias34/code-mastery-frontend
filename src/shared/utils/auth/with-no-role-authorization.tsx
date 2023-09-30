import { useRouter } from "next/router";
import { type ReactNode, useEffect } from "react";

import { useUser } from "@/features/user";

import { DefaultLoadingElement } from "./default-loading-element";

interface WithNoRoleAuthorizationArguments {
  redirectDestination?: string;
  loadingElement?: ReactNode;
}

export const withNoRoleAuthorization = (
  WrappedComponent: React.ComponentType,
  options: WithNoRoleAuthorizationArguments,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function WithNoRoleAuthorization(props: any) {
    const user = useUser();
    const router = useRouter();

    const loadingElement = options.loadingElement || <DefaultLoadingElement />;

    useEffect(() => {
      if (user) {
        void router.push(options.redirectDestination || "/");
      }
    }, [router, user]);

    if (user) {
      return loadingElement;
    }

    return <WrappedComponent {...props} />;
  };
};
