import { type Dispatch, type SetStateAction } from "react";

import { UserRole } from "@/features/user";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/select";
import { cn } from "@/shared/utils";

interface RoleSelectProps {
  role: UserRole | "ALL";
  setRole: Dispatch<SetStateAction<UserRole | "ALL">>;
  trigger?: {
    className?: string;
  };
  displayAllOption?: boolean;
}

export const RoleSelect = ({
  role,
  setRole,
  displayAllOption,
  trigger,
}: RoleSelectProps) => {
  return (
    <Select
      value={role}
      onValueChange={(value) => setRole(value as UserRole | "ALL")}
    >
      <SelectTrigger className={cn("w-[180px]", trigger?.className)}>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent className="border-primary">
        <SelectGroup>
          <SelectLabel className="font-bold">Role</SelectLabel>
          {displayAllOption && <SelectItem value="ALL">All</SelectItem>}
          <SelectItem value={UserRole.USER}>User</SelectItem>
          <SelectItem value={UserRole.WORKER}>Worker</SelectItem>
          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
