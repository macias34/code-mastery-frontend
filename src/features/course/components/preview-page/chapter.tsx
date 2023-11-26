import Link from "next/link";
import { useState } from "react";

import { type ChapterDto } from "../../types";

interface ChapterProps {
  chapter: ChapterDto;
}

export const Chapter = ({ chapter }: ChapterProps) => {
  const [areLessonsOpened, setLessonsOpened] = useState(false);

  return (
    <li
      onClick={() => setLessonsOpened((previousState) => !previousState)}
      className="border border-border p-2 cursor-pointer rounded hover:bg-slate-900 transition"
    >
      {chapter.title}
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {chapter.lessons.length === 0
          ? "No lessons"
          : `${chapter.lessons.length} lesson${
              chapter.lessons.length > 1 ? "s" : ""
            }`}
      </p>
      {areLessonsOpened && chapter.lessons.length > 0 && (
        <ol className="list-decimal list-inside text-base leading-loose flex flex-col gap-2 mt-4">
          {chapter.lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/course/${chapter.courseId}/lesson/${lesson.id}`}
            >
              <li className="border border-border p-2 text-sm rounded hover:bg-slate-700 transition">
                {lesson.title}
              </li>
            </Link>
          ))}
        </ol>
      )}
    </li>
  );
};
