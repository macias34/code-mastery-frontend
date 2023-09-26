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

interface RoleSelectProps {
  role: UserRole | "ALL";
  setRole: Dispatch<SetStateAction<UserRole | "ALL">>;
}

export const RoleSelect = ({ role, setRole }: RoleSelectProps) => {
  return (
    <Select
      value={role}
      onValueChange={(value) => setRole(value as UserRole | "ALL")}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value={UserRole.USER}>User</SelectItem>
          <SelectItem value={UserRole.WORKER}>Worker</SelectItem>
          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
