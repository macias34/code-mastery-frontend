import { Code, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-44">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User size={14} className="mr-2" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Code size={14} className="mr-2" /> My courses
        </DropdownMenuItem>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOut size={14} className="mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
