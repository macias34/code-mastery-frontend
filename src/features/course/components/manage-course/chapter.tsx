import { ChevronDown, Pencil, Plus, Trash } from "lucide-react";
import { type Dispatch, type FC, type SetStateAction, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components";
import { ICON_SIZE } from "@/shared/constants";

import { type ChapterDto } from "../../types";
import { Lesson } from "./lesson";
import { LessonDialog } from "./lesson-dialog";
import { LessonFormVariant } from "./lesson-form";

interface ChapterProps {
  chapter: ChapterDto;
  index: number;
  setChapterToDelete: Dispatch<SetStateAction<ChapterDto | undefined>>;
}

export const Chapter: FC<ChapterProps> = ({
  chapter,
  index,
  setChapterToDelete,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showEditChapterDialog, setShowEditChapterDialog] =
    useState<boolean>(false);

  const [showLessons, setShowLessons] = useState<boolean>(false);

  const { lessons, title } = chapter;

  return (
    <>
      <Card className="relative">
        <CardHeader className="group flex flex-row items-center justify-between gap-4 space-y-0 relative min-h-[90px]">
          <CardTitle>
            <span className="font-bold">Chapter {index + 1}:</span> {title}
          </CardTitle>

          <div className="hidden gap-2 items-center group-hover:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowEditChapterDialog(true)}
            >
              <Pencil
                className=" hover:text-white/80 transition"
                size={ICON_SIZE.SMALL}
              />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setChapterToDelete(chapter)}
            >
              <Trash
                className=" hover:text-white/80 transition"
                size={ICON_SIZE.SMALL}
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowLessons(!showLessons)}
            >
              <ChevronDown />
            </Button>
          </div>
        </CardHeader>

        {showLessons && (
          <CardContent className="flex flex-col gap-6 pb-0">
            {lessons.map((lesson, index) => (
              <Lesson
                chapter={chapter}
                key={lesson.id}
                index={index}
                lesson={lesson}
              />
            ))}

            <LessonDialog
              chapter={chapter}
              variant={LessonFormVariant.CREATE}
              trigger={(setShowLessonDialog) => (
                <Button
                  onClick={() => setShowLessonDialog(true)}
                  className="w-fit mb-6"
                  variant="secondary"
                >
                  <Plus size={16} className="mr-2" /> Lesson
                </Button>
              )}
            />
          </CardContent>
        )}
      </Card>
    </>
  );
};
