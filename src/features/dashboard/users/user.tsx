import { type UserDto } from "@/features/user";
import { Avatar, AvatarFallback } from "@/shared/components/avatar";
import { Button } from "@/shared/components/button";

interface Props {
  user: UserDto;
}

export const User = ({ user }: Props) => {
  return (
    <div className="flex gap-x-5">
      <Avatar>
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
      <Button className="ml-auto px-6">Edit</Button>
    </div>
  );
};
