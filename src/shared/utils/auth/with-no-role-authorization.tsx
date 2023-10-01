import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type ReactNode, useEffect } from "react";

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
    const { status } = useSession();
    const router = useRouter();

    const shouldShowLoadingState =
      status === "loading" || status === "authenticated";
    const loadingElement = options.loadingElement || <DefaultLoadingElement />;

    useEffect(() => {
      if (status === "authenticated") {
        void router.push(options.redirectDestination || "/");
      }
    }, [router, status]);

    if (shouldShowLoadingState) {
      return loadingElement;
    }

    return <WrappedComponent {...props} />;
  };
};
