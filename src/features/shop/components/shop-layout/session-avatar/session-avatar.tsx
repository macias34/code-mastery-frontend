import { useSession } from "next-auth/react";
import React, { FC } from "react";

import { Avatar, AvatarFallback } from "@/shared/components/avatar";
import { PropsWithClassname } from "@/shared/types";
import { cn } from "@/shared/utils";

import { SessionSettingsDropdown } from "./session-settings-dropdown";

export const SessionAvatar: FC<PropsWithClassname> = ({ className }) => {
  const session = useSession();
  const usernameFallback = session.data?.user?.name?.slice(0, 2).toUpperCase();

  return (
    <SessionSettingsDropdown>
      <Avatar className={cn(className)}>
        <AvatarFallback className="bg-primary/90 text-white font-semibold cursor-pointer hover:bg-primary transition">
          {session.status !== "authenticated" ? "CN" : usernameFallback}
        </AvatarFallback>
      </Avatar>
    </SessionSettingsDropdown>
  );
};
