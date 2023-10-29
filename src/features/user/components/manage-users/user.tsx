/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EditUserDialog, type UserDto, UserRole } from "@/features/user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/avatar";
import { FRONTEND_URL } from "@/shared/constants";

import adminIcon from "../../../../../public/admin.svg";
import userIcon from "../../../../../public/user.svg";
import workerIcon from "../../../../../public/worker.svg";

interface Props {
  user: UserDto;
}

const ROLE_ICONS = {
  [UserRole.ADMIN]: adminIcon.src,
  [UserRole.WORKER]: workerIcon.src,
  [UserRole.USER]: userIcon.src,
};

export const User = ({ user }: Props) => {
  return (
    <div className="flex gap-x-5">
      <Avatar>
        <AvatarImage
          className="bg-white"
          src={`${FRONTEND_URL}${ROLE_ICONS[user.role]}`}
        />
        <AvatarFallback>
          {user.username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm">{user.username}</p>
        <p className="text-muted-foreground text-sm max-w-[250px] break-words">
          {user.email}
        </p>
      </div>
      <EditUserDialog userId={user.id} />
    </div>
  );
};
