import { Logo } from "@/shared/ui/logo";
import { SessionAvatar } from "@/shared/ui/session-avatar";

import { NavbarItem, NavbarItemProps } from "./navbar-item";

export const Navbar = () => {
  const navbarItems: NavbarItemProps[] = [
    {
      title: "All courses",
      href: "/courses",
    },
    {
      title: "My courses",
      href: "/my-courses",
    },
  ];

  return (
    <nav className="py-4 shadow w-full">
      <div className="container flex justify-between items-center">
        <Logo />
        <div className="flex items-center">
          {navbarItems.map(({ title, href }) => (
            <NavbarItem key={href} title={title} href={href} />
          ))}

          <SessionAvatar className="ml-4" />
        </div>
      </div>
    </nav>
  );
};
