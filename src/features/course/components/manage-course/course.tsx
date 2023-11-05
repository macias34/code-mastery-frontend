import Link from "next/link";
import { type FC } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  buttonVariants,
} from "@/shared/components";

import { type CourseDto } from "../../types";

interface CourseProps {
  course: CourseDto;
}

export const Course: FC<CourseProps> = ({ course }) => {
  const { name, chapters, id } = course;

  const lessonsCount = chapters.reduce(
    (previousCount, chapter) => previousCount + chapter.lessons.length,
    0,
  );

  return (
    <Card className="transition bg-slate-950">
      <CardHeader className="flex flex-row items-center gap-1 space-y-0 group min-h-[90px] justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle> {name}</CardTitle>
          <CardDescription>
            {chapters.length} chapters, {lessonsCount} lessons
          </CardDescription>
        </div>
        <Link className={buttonVariants()} href={`/dashboard/courses/${id}`}>
          Manage course
        </Link>
      </CardHeader>
    </Card>
  );
};
