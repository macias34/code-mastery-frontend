import { type UserDto } from "./user";

export interface GetUsersDto {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  users: UserDto[];
}
