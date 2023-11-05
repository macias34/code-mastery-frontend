import { type UseMutationOptions, useMutation } from "react-query";

import { useUser } from "@/features/user";
import { type AccessToken, type ApiError, request } from "@/shared/utils";

import { type OverridePropertyDto, type PropertyDto } from "../types";

type OverridePropertyArguments = {
  properties: OverridePropertyDto[];
  courseId: number;
};

export const overrideProperties = ({
  properties,
  accessToken,
  courseId,
}: OverridePropertyArguments & AccessToken) => {
  return request<PropertyDto[]>(
    `/property/course/${courseId}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(properties),
    },
    { accessToken },
  );
};

export const useOverrideProperties = (
  options?: UseMutationOptions<
    PropertyDto[],
    ApiError,
    OverridePropertyArguments
  >,
) => {
  const { accessToken } = useUser();

  return useMutation<
    PropertyDto[],
    ApiError,
    OverridePropertyArguments,
    unknown
  >({
    mutationFn: ({ courseId, properties }) =>
      overrideProperties({ accessToken, courseId, properties }),
    ...options,
  });
};
