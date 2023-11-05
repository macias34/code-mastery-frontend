import { type LessonDto } from "./lesson";

export interface ChapterDto {
  id: number;
  title: string;
  lessons: LessonDto[];
  courseId: number;
}
