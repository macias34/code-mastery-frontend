import {
  type InvoiceDetailsDto,
  type PersonalDetailsDto,
  type UserRole,
} from "@/features/user";

export interface UpdateUserDto {
  username?: string;
  email?: string;
  note?: string;
  role?: UserRole;
  personalDetails?: Partial<PersonalDetailsDto>;
  invoiceDetails?: Partial<InvoiceDetailsDto>;
}
