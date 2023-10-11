import { Pencil, Trash } from "lucide-react";
import { type Dispatch, type FC, type SetStateAction, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components";
import { ICON_SIZE } from "@/shared/constants";

import { type ChapterDto } from "../../types";
import { ChapterDialog } from "./chapter-dialog";
import { ChapterFormVariant } from "./chapter-form";
import { Lesson } from "./lesson";
import { LessonDialog } from "./lesson-dialog";

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
  const [showEditChapterDialog, setShowEditChapterDialog] =
    useState<boolean>(false);

  const [showLessonDialog, setShowLessonDialog] = useState<boolean>(false);

  const { lessons, title } = chapter;

  return (
    <>
      <ChapterDialog
        chapter={chapter}
        variant={ChapterFormVariant.EDIT}
        showChapterDialog={showEditChapterDialog}
        setShowChapterDialog={setShowEditChapterDialog}
        hideTrigger
      />

      <Card className="pb-6">
        <CardHeader className="group flex flex-row items-center gap-4 space-y-0">
          <CardTitle>
            <span className="font-bold">Chapter {index + 1}:</span> {title}
          </CardTitle>

          <div className="hidden gap-2 items-center group-hover:flex">
            <Pencil
              onClick={() => setShowEditChapterDialog(true)}
              className="cursor-pointer hover:text-white/80 transition"
              size={ICON_SIZE.SMALL}
            />
            <Trash
              onClick={() => setChapterToDelete(chapter)}
              className="cursor-pointer hover:text-white/80 transition"
              size={ICON_SIZE.SMALL}
            />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6 pb-0">
          {lessons.map((lesson, index) => (
            <Lesson key={lesson.id} index={index} lesson={lesson} />
          ))}

          <LessonDialog
            showLessonDialog={showLessonDialog}
            setShowLessonDialog={setShowLessonDialog}
            chapter={chapter}
          />
        </CardContent>
      </Card>
    </>
  );
};
