import { useSession } from "next-auth/react";
import Link from "next/link";

import { Logo } from "@/shared/ui/logo";

import { NavbarItem, NavbarItemProps } from "./navbar-item";
import { SessionAvatar } from "./session-avatar";
import { SignUpLink } from "./sign-up-link";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const session = useSession();

  const noAuthNavbarItems: NavbarItemProps[] = [
    {
      title: "All courses",
      href: "/courses",
    },
  ];

  return (
    <nav className="py-4 border-b border-border w-full">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center">
          {noAuthNavbarItems.map(({ title, href }) => (
            <NavbarItem key={href} title={title} href={href} />
          ))}

          {session.status === "authenticated" ? (
            <>
              <NavbarItem title="My courses" href="/my-courses" />
              <SessionAvatar className="mr-4 ml-1" />
            </>
          ) : (
            <SignUpLink />
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
