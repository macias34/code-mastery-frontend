import { Pencil, Trash } from "lucide-react";
import React, { type FC } from "react";

import { Button, Card, CardHeader } from "@/shared/components";
import { ICON_SIZE } from "@/shared/constants";

import { type ChapterDto, type LessonDto } from "../../types";
import { LessonDialog } from "./lesson-dialog";
import { LessonFormVariant } from "./lesson-form";

interface LessonProps {
  lesson: LessonDto;
  chapter: ChapterDto;
  index: number;
}

export const Lesson: FC<LessonProps> = ({ lesson, index, chapter }) => {
  const { title } = lesson;

  return (
    <>
      <Card className="  transition bg-slate-950">
        <CardHeader className="flex flex-row items-center gap-1 space-y-0 group min-h-[90px] justify-between">
          <p>
            <span className="font-semibold">Lesson {index + 1}:</span> {title}
          </p>
          <div className="ml-4 hidden gap-2 items-center group-hover:flex">
            <LessonDialog
              chapter={chapter}
              variant={LessonFormVariant.EDIT}
              lesson={lesson}
              trigger={(setShowLessonDialog) => (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowLessonDialog(true)}
                >
                  <Pencil size={ICON_SIZE.SMALL} />
                </Button>
              )}
            />
            <Button variant="outline" size="icon">
              <Trash
                className="cursor-pointer hover:text-white/80 transition"
                size={ICON_SIZE.SMALL}
              />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};
