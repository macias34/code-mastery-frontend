import { z } from "zod";

import { UserRole } from "@/features/user/types";

export const ChangeUserDataSchema = z.object({
  note: z.string().min(0).optional(),
  username: z.string().min(2, "Username should be at least 2 characters"),
  role: z.nativeEnum(UserRole),
});

export type ChangeUserData = z.infer<typeof ChangeUserDataSchema>;
