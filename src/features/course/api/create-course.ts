import { type MutateOptions, useMutation } from "react-query";

import { type CourseDto } from "@/features/course";
import { useUser } from "@/features/user";
import { type AccessToken, type ApiError, request } from "@/shared/utils";

export const createCourse = ({ accessToken }: AccessToken) => {
  return request<CourseDto>(
    "/course",
    {
      method: "POST",
    },
    { accessToken },
  );
};

export const useCreateCourse = (
  options?: MutateOptions<CourseDto, ApiError, void, unknown> | undefined,
) => {
  const { accessToken } = useUser();

  return useMutation<CourseDto, ApiError>({
    mutationFn: () => createCourse({ accessToken }),
    ...options,
  });
};
