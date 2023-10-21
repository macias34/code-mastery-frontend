import { useSession } from "next-auth/react";
import Link from "next/link";

import { usePages } from "@/features/information-page/api";
import { UserRole, useUser } from "@/features/user";
import { Logo } from "@/shared/components/logo";

import { NavbarItem, NavbarItemProps } from "./navbar-item";
import { SessionAvatar } from "./session-avatar";
import { SignUpLink } from "./sign-up-link";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const session = useSession();
  const { userData } = useUser();

  const noAuthNavbarItems: NavbarItemProps[] = [
    {
      title: "All courses",
      href: "/courses",
    },
  ];

  const { data: pages } = usePages();

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

          {userData?.role === UserRole.USER && (
            <NavbarItem title="My courses" href="/my-courses" />
          )}

          {userData?.role === UserRole.ADMIN && (
            <NavbarItem title="Dashboard" href="/dashboard" />
          )}

          {pages &&
            pages?.map(({ title, slug }) => (
              <NavbarItem key={slug} title={title} href={`/page/${slug}`} />
            ))}

          {session.status === "authenticated" ? (
            <>
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
