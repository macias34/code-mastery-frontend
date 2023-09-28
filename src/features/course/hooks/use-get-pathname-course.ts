import { useRouter } from "next/router";

import { type UseGetCourseOptions, useGetCourse } from "../api";

export const useGetPathnameCourse = (options?: UseGetCourseOptions) => {
  const { query } = useRouter();
  const id = Number.parseInt(query?.id as string);

  return {
    courseUseQueryResult: useGetCourse(id, {
      enabled: !!id,
      ...options,
    }),
    id,
  };
};
