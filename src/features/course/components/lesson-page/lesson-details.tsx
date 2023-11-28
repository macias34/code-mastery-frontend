import React, { type FC } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/shared/components";

import { type LessonDto } from "../../types";

interface LessonDetailsProps {
  lesson: LessonDto;
}

export const LessonDetails: FC<LessonDetailsProps> = ({ lesson }) => {
  return (
    <Card className="w-full h-[80vh]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{lesson.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        {lesson.videoSrc ? (
          <video src={lesson.videoSrc} controls className="w-full h-[65vh]" />
        ) : (
          <Skeleton className=" h-[500px] w-full" />
        )}
      </CardContent>
    </Card>
  );
};
