import { Code, LogOut, User } from "lucide-react";
import { FC, PropsWithChildren } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export const SessionSettingsDropdown: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-44">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User size={14} className="mr-2" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Code size={14} className="mr-2" /> My courses
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut size={14} className="mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
