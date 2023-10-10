import { Pencil, Plus, Trash } from "lucide-react";
import { type Dispatch, type FC, type SetStateAction, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components";
import { ICON_SIZE } from "@/shared/constants";
import { cn } from "@/shared/utils";

import { type ChapterDto } from "../../types";
import { ChapterForm } from "./chapter-form";
import { LessonForm } from "./lesson-form";

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
  const [showEditChapterForm, setShowEditChapterForm] =
    useState<boolean>(false);

  const [showLessonForm, setShowLessonForm] = useState<boolean>(false);

  const { lessons, title, id } = chapter;

  return (
    <Card className="pb-6">
      {!showEditChapterForm && (
        <CardHeader className="group flex flex-row items-center gap-4 space-y-0">
          <CardTitle>
            <span className="font-bold">Chapter {index + 1}:</span> {title}
          </CardTitle>

          <div className="hidden gap-2 items-center group-hover:flex">
            <Pencil
              onClick={() => setShowEditChapterForm(true)}
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
      )}

      <CardContent
        className={cn("flex flex-col gap-6", {
          "pb-0": Boolean(!showEditChapterForm),
        })}
      >
        {showEditChapterForm && (
          <ChapterForm
            className="mt-6"
            setShowChapterForm={setShowEditChapterForm}
            variant="edit"
            chapter={chapter}
          />
        )}

        {lessons.map((lesson) => (
          <div key={lesson.id}>{lesson.name}</div>
        ))}

        {showLessonForm && (
          <LessonForm chapterId={id} setShowLessonForm={setShowLessonForm} />
        )}

        {!showLessonForm && (
          <Button
            onClick={() => setShowLessonForm(true)}
            className="w-fit"
            variant="secondary"
          >
            <Plus size={16} className="mr-2" /> Lesson
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
