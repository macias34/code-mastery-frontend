import { ChevronDown, Trash } from "lucide-react";
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
import { CreateLessonDialog } from "./create-lesson-dialog";
import { EditChapterDialog } from "./edit-chapter-dialog";
import { Lesson } from "./lesson";

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

  const [showLessons, setShowLessons] = useState<boolean>(false);

  const { lessons, title, id } = chapter;

  return (
    <>
      <Card className="relative">
        <CardHeader className="group flex flex-row items-center justify-between gap-4 space-y-0 relative min-h-[90px]">
          <CardTitle>
            <span className="font-bold">Chapter {index + 1}:</span> {title}
          </CardTitle>

          <div className="hidden gap-2 items-center group-hover:flex">
            <EditChapterDialog chapterId={id} />

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
              <Lesson key={lesson.id} index={index} lesson={lesson} />
            ))}

            <CreateLessonDialog chapterId={id} />
          </CardContent>
        )}
      </Card>
    </>
  );
};
