import { useSession } from "next-auth/react";

import { Logo } from "@/shared/ui/logo";

import { NavbarItem, NavbarItemProps } from "./navbar-item";
import { SessionAvatar } from "./session-avatar";
import { SignUpLink } from "./sign-up-link";

export const Navbar = () => {
  const session = useSession();

  const noAuthNavbarItems: NavbarItemProps[] = [
    {
      title: "All courses",
      href: "/courses",
    },
  ];

  return (
    <nav className="py-4 shadow w-full">
      <div className="container flex justify-between items-center">
        <Logo />
        <div className="flex items-center">
          {noAuthNavbarItems.map(({ title, href }) => (
            <NavbarItem key={href} title={title} href={href} />
          ))}

          {session.status === "authenticated" ? (
            <>
              <NavbarItem title="My courses" href="/my-courses" />
              <SessionAvatar className="ml-4" />
            </>
          ) : (
            <SignUpLink />
          )}
        </div>
      </div>
    </nav>
  );
};
