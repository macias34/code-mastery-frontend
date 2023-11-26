import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components";

import { type CourseDto } from "../../types";
import { Chapter } from "./chapter";

interface CourseChaptersProps {
  course: CourseDto;
}

export const CourseChapters = ({ course }: CourseChaptersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Course Chapters</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside text-base leading-loose flex flex-col gap-4">
          {course.chapters.map((chapter) => (
            <Chapter key={chapter.id} chapter={chapter} />
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};
