import { type CourseDto } from "@/features/course";
import { type UserDto } from "@/features/user";

export interface OrderDto {
  id: number;
  status: string;
  price: number;
  createdAt: string;
  courses: CourseDto[];
  user: UserDto;
}
