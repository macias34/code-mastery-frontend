import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components/use-toast";
import { type ApiError, request } from "@/shared/utils";

import {
  type InformationPageDto,
  type UpdateInformationPageDto,
} from "../types";

interface UpdatePageParameters {
  pageId: number;
  updatePageDto: UpdateInformationPageDto;
  accessToken: string;
}

export const updatePage = async ({
  pageId,
  updatePageDto,
  accessToken,
}: UpdatePageParameters) => {
  return await request<InformationPageDto>(
    `/information-page/${pageId}`,
    {
      method: "PATCH",
      body: JSON.stringify(updatePageDto),
      headers: {
        "Content-type": "application/json",
      },
    },
    { accessToken },
  );
};

export const useUpdatePage = () => {
  const router = useRouter();

  return useMutation(updatePage, {
    onSuccess: (data) => {
      void router.push(`/dashboard/information-pages/${data.slug}`);
      toast({
        title: TOAST_SUCCESS_TITLE,
        description: "You have successfully updated page!",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: TOAST_ERROR_TITLE,
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
