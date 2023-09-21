import Link from "next/link";
import React, { FC } from "react";

export interface NavbarItemProps {
  title: string;
  href: string;
}

export const NavbarItem: FC<NavbarItemProps> = ({ title, href }) => {
  return (
    <Link
      className="px-3 py-1.5 rounded-full transition focus:text-primary focus:border-primary border border-transparent hover:text-primary outline-none text-muted-foreground "
      href={href}
    >
      {title}
    </Link>
  );
};
