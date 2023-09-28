import { type LessonDto } from "./lesson";

export interface ChapterDto {
  id: number;
  name: string;
  lessons: LessonDto[];
  courseId: number;
}
