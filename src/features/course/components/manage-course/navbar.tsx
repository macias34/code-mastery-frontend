import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { type FC } from "react";

interface NavbarProps {
  courseName?: string;
}

export const Navbar: FC<NavbarProps> = ({ courseName }) => {
  return (
    <nav className="py-4 border-b border-border w-full">
      <div className="container flex justify-between items-center">
        <Link
          href={"/dashboard/courses"}
          className="inline-flex gap-2 hover:text-white/80 transition"
        >
          <ChevronLeft /> Back to all courses
        </Link>

        <span className="font-bold text-lg">{courseName ?? ""}</span>
      </div>
    </nav>
  );
};
