import { type UseGetCourseOptions, useGetCourse } from "../api";
import { useGetPathnameId } from "./use-get-pathname-id";

export const useGetPathnameCourse = (options?: UseGetCourseOptions) => {
  const id = useGetPathnameId();

  return {
    courseUseQueryResult: useGetCourse(id, {
      enabled: !!id,
      ...options,
    }),
    id,
  };
};
