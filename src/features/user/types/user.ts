import { CourseDto } from "@/features/course";

import { InvoiceDetailsDto } from "./invoice-details";
import { PersonalDetailsDto } from "./personal-details";
import { UserRole } from "./user-role";

export interface UserDto {
  id: number;
  username: string;
  email: string;
  note?: string;
  createdAt: string;
  role: UserRole;
  personalDetails: PersonalDetailsDto | null;
  invoiceDetails: InvoiceDetailsDto | null;
  courses: CourseDto[];
  // private List<OrderEntity> orders
}
