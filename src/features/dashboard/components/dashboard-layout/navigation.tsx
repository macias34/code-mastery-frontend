import { useRouter } from "next/router";
import { type FC } from "react";

import { type NavigationItem, NavigationLink } from "./navigation-link";

export interface NavigationProps {
  links: NavigationItem[];
}

export const Navigation: FC<NavigationProps> = ({ links }) => {
  const { pathname } = useRouter();

  return (
    <nav className="flex p-1 gap-2 bg-secondary rounded-lg h-fit w-fit mb-6">
      {links.map(({ href, children }, index) => (
        <NavigationLink pathname={pathname} key={index} href={href}>
          {children}
        </NavigationLink>
      ))}
    </nav>
  );
};
