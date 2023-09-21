import { type LessonDto } from ".";

export interface ChapterDto {
  id: number;
  name: string;
  lessons: LessonDto[];
  courseId: number;
}
