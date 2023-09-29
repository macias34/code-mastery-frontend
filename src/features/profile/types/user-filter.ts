import { type UserRole } from "@/features/user";

export interface UserFilter {
  username?: string;
  email?: string;
  role?: UserRole;
}
