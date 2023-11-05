import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { type FC } from "react";

interface NavbarProps {
  backLink: {
    label: string;
    href: string;
  };
  pageTitle: string;
}

export const Navbar: FC<NavbarProps> = ({ backLink, pageTitle }) => {
  return (
    <nav className="py-5 border-b border-border w-full">
      <div className="container flex justify-between items-center">
        <Link
          href={backLink.href}
          className="inline-flex gap-2 hover:text-white/80 transition"
        >
          <ChevronLeft /> {backLink.label}
        </Link>

        <span className="font-bold text-lg">{pageTitle}</span>
      </div>
    </nav>
  );
};
