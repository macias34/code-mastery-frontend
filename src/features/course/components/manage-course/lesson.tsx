import React, { type FC } from "react";

import { Card, CardHeader } from "@/shared/components";

import { type LessonDto } from "../../types";
import { DeleteLessonAlertDialog } from "./delete-lesson-alert-dialog";
import { EditLessonDialog } from "./edit-lesson-dialog";

interface LessonProps {
  lesson: LessonDto;
  index: number;
}

export const Lesson: FC<LessonProps> = ({ lesson, index }) => {
  const { title } = lesson;

  return (
    <>
      <Card className="  transition bg-slate-950">
        <CardHeader className="flex flex-row items-center gap-1 space-y-0 group min-h-[90px] justify-between">
          <p>
            <span className="font-semibold">Lesson {index + 1}:</span> {title}
          </p>
          <div className="ml-4 hidden gap-2 items-center group-hover:flex">
            <EditLessonDialog lesson={lesson} />
            <DeleteLessonAlertDialog lesson={lesson} />
          </div>
        </CardHeader>
      </Card>
    </>
  );
};
