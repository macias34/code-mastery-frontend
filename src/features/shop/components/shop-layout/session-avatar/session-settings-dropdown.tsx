import { Code, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

import { UserRole, useUser } from "@/features/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/dropdown-menu";

export const SessionSettingsDropdown: FC<PropsWithChildren> = ({
  children,
}) => {
  const { userData } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-44">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/profile" className="flex">
            <User size={14} className="mr-2" /> Profile
          </Link>
        </DropdownMenuItem>

        {userData?.role === UserRole.USER && (
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/my-courses" className="flex">
              <Code size={14} className="mr-2" /> My courses
            </Link>
          </DropdownMenuItem>
        )}

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOut size={14} className="mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
