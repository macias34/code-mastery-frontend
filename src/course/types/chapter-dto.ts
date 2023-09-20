import { LessonDto } from "./lesson-dto";

export interface ChapterDto {
  id: number;
  name: string;
  lessons: LessonDto[];
  courseId: number;
}
