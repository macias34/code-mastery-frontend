import { useState } from "react";

import { Spinner } from "@/shared/components";

import { useGetPathnameCourse } from "../../hooks";
import { type ChapterDto } from "../../types";
import { Chapter } from "./chapter";
import { DeleteChapterAlertDialog } from "./delete-chapter-alert-dialog";

export const ChaptersList = () => {
  const { data: course, isLoading } = useGetPathnameCourse();
  const [chapterToDelete, setChapterToDelete] = useState<ChapterDto>();

  const chapters = course?.chapters;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {chapterToDelete && (
        <DeleteChapterAlertDialog
          chapterToDelete={chapterToDelete}
          setChapterToDelete={setChapterToDelete}
        />
      )}

      <div className="flex flex-col gap-10">
        {chapters
          ? chapters.map((chapter, index) => (
              <Chapter
                key={chapter.id}
                chapter={chapter}
                setChapterToDelete={setChapterToDelete}
                index={index}
              />
            ))
          : "No chapters were found, try adding one!"}
      </div>
    </>
  );
};
