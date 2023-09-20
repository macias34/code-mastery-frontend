import { CategoryDto } from "./category-dto";
import { ChapterDto } from "./chapter-dto";
import { PropertyDto } from "./property-dto";

export interface CourseDto {
  id: number;
  name: string;
  price: number;
  instructorName: string;
  participantsCount: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  categories: Set<CategoryDto>;
  properties: Set<PropertyDto>;
  chapters: ChapterDto[];
}
