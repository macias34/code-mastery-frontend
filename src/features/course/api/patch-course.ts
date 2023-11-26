import { type UseMutationOptions, useMutation } from "react-query";

import { request } from "@/shared/utils";

import { useGetPathnameId } from "../hooks";

interface PatchCourseDTO {
  name?: string;
  price?: number;
  instructorName?: string;
  description?: string;
  categoriesIds?: number[];
  thumbnailImage?: FileList;
}

// eslint-disable-next-line max-lines-per-function
export const patchCourse = (id: number, patchableArguments: PatchCourseDTO) => {
  const formData = new FormData();

  if (patchableArguments.name !== undefined) {
    formData.append("name", patchableArguments.name);
  }

  if (patchableArguments.price !== undefined) {
    formData.append("price", patchableArguments.price.toString());
  }

  if (patchableArguments.instructorName !== undefined) {
    formData.append("instructorName", patchableArguments.instructorName);
  }

  if (patchableArguments.description !== undefined) {
    formData.append("description", patchableArguments.description);
  }

  if (patchableArguments.categoriesIds !== undefined) {
    formData.append(
      "categoriesIds",
      JSON.stringify(patchableArguments.categoriesIds),
    );
  }

  if (
    patchableArguments.thumbnailImage &&
    patchableArguments.thumbnailImage[0]
  ) {
    formData.append("thumbnailImage", patchableArguments.thumbnailImage[0]);
  }

  return request(`/course/${id.toString()}`, {
    method: "PATCH",
    body: formData,
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
