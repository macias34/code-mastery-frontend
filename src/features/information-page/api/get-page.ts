import { useQuery } from "react-query";

import { type ApiError, request } from "@/shared/utils";

import { type InformationPageDto } from "../types";

export const getPage = (slug: string) =>
  request<InformationPageDto>(`/information-page/${slug}`);

export const usePage = (slug: string) => {
  return useQuery<InformationPageDto, ApiError>({
    queryFn: () => getPage(slug),
    queryKey: ["information-page", slug],
  });
};
