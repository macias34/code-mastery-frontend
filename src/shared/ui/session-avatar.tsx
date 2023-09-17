import { useSession } from "next-auth/react";
import React, { FC } from "react";

import { cn } from "@/libs/utils";

import { PropsWithClassname } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export const SessionAvatar: FC<PropsWithClassname> = ({ className }) => {
  const session = useSession();

  const usernameFallback = session.data?.user?.name?.slice(0, 2).toUpperCase();

  return (
    <Avatar className={cn(className)}>
      {/* <AvatarImage  /> */}

      {session.status === "loading" && <AvatarFallback>CN</AvatarFallback>}

      {session.status === "authenticated" && (
        <AvatarFallback className="bg-primary/90 text-secondary font-semibold cursor-pointer hover:bg-primary transition">
          {usernameFallback}
        </AvatarFallback>
      )}
    </Avatar>
  );
};
