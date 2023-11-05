import { type UseGetCourseOptions, useGetCourse } from "../api";
import { useGetPathnameId } from "./use-get-pathname-id";

export const useGetPathnameCourse = (options?: UseGetCourseOptions) => {
  const id = useGetPathnameId();

  return useGetCourse(id, {
    enabled: !!id,
    ...options,
  });
};
