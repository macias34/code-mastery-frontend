import React, { type FC } from "react";

import { Card, CardHeader } from "@/shared/components";

import { type LessonDto } from "../../types";

interface LessonProps {
  lesson: LessonDto;
  index: number;
}

export const Lesson: FC<LessonProps> = ({ lesson, index }) => {
  const { title } = lesson;

  return (
    <Card>
      <CardHeader className="flex-row gap-1">
        <span className="font-semibold">Lesson {index + 1}:</span>
        {title}
      </CardHeader>
    </Card>
  );
};
