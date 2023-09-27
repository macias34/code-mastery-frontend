import { type FC } from "react";

import { NavigationLink, type NavigationLinkProps } from "./navigation-link";

export interface NavigationProps {
  links: NavigationLinkProps[];
}

export const Navigation: FC<NavigationProps> = ({ links }) => {
  return (
    <nav className="flex p-1 gap-2 bg-secondary rounded-lg h-fit">
      {links.map(({ href, children }, index) => (
        <NavigationLink key={index} href={href}>
          {children}
        </NavigationLink>
      ))}
    </nav>
  );
};
