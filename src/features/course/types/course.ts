import { type CategoryDto, type ChapterDto, type PropertyDto } from ".";

export interface CourseDto {
  id: number;
  name: string;
  price: number;
  instructorName: string | null;
  participantsCount: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  categories: CategoryDto[];
  properties: PropertyDto[];
  chapters: ChapterDto[];
}

export interface GetCoursesDto {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  courses: CourseDto[];
}
