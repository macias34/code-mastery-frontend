/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HardHat, ShieldCheck, UserCircle2 } from "lucide-react";

import { EditUserDialog, type UserDto, UserRole } from "@/features/user";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components";
import { Avatar } from "@/shared/components/avatar";
import { ICON_SIZE } from "@/shared/constants";

interface Props {
  user: UserDto;
}

const ROLE_ICONS = {
  [UserRole.ADMIN]: <ShieldCheck size={ICON_SIZE.LG} />,
  [UserRole.WORKER]: <HardHat size={ICON_SIZE.LG} />,
  [UserRole.USER]: <UserCircle2 size={ICON_SIZE.LG} />,
};

export const User = ({ user }: Props) => {
  return (
    <Card className="transition bg-slate-950">
      <CardHeader className="flex flex-row items-center gap-1 space-y-0 group justify-between">
        <div className="flex gap-5">
          <Avatar
            title={user.role.toLowerCase()}
            className="flex items-center justify-center"
          >
            {ROLE_ICONS[user.role]}
          </Avatar>
          <div className="flex flex-col gap-2">
            <CardTitle> {user.username}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
        <EditUserDialog userId={user.id} />
      </CardHeader>
    </Card>
  );
};
