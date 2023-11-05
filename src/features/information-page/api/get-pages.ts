import { useQuery } from "react-query";

import { type ApiError, request } from "@/shared/utils";

import { type InformationPageDto } from "../types";

export const getPages = () =>
  request<InformationPageDto[]>("/information-page");

export const usePages = () => {
  return useQuery<InformationPageDto[], ApiError>({
    queryFn: getPages,
    queryKey: ["pages"],
  });
};
