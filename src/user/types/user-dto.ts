import { CourseDto } from "@/course";

import { InvoiceDetailsDto } from "./invoice-details-dto";
import { PersonalDetailsDto } from "./personal-details-dto";
import { UserRole } from "./user-role";

export interface UserDto {
  id: number;
  username: string;
  email: string;
  note: string;
  createdAt: string;
  role: UserRole;
  personalDetails: PersonalDetailsDto;
  invoiceDetails: InvoiceDetailsDto;
  courses: Set<CourseDto>;
  // private List<OrderEntity> orders
}