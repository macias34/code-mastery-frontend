import { UseMutationOptions, useMutation } from "react-query";

import { request } from "@/shared/utils";

import { useGetPathnameId } from "../hooks";

interface PatchCourseDTO {
  name?: string;
  price?: string;
  instructorName?: string;
  description?: string;
  categoriesIds?: number[];
}

export const patchCourse = (id: number, patchableArguments: PatchCourseDTO) => {
  return request(`/course/${id.toString()}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(patchableArguments),
  });
};

type UsePatchCourseOptions = UseMutationOptions<
  unknown,
  unknown,
  PatchCourseDTO,
  unknown
>;

export const usePatchCourse = (options?: UsePatchCourseOptions) => {
  const id = useGetPathnameId();

  return useMutation({
    mutationFn: (patchableArguments: PatchCourseDTO) =>
      patchCourse(id, patchableArguments),
    ...options,
  });
};
