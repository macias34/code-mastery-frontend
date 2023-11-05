import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components/use-toast";
import { type ApiError, request } from "@/shared/utils";

import { type InformationPageDto } from "../types";

interface CreatePageParameters {
  createPageDto: InformationPageDto;
  accessToken: string;
}

export const createPage = async ({
  createPageDto,
  accessToken,
}: CreatePageParameters) => {
  return await request<InformationPageDto>(
    `/information-page`,
    {
      method: "POST",
      body: JSON.stringify(createPageDto),
      headers: {
        "Content-type": "application/json",
      },
    },
    { accessToken },
  );
};

export const useCreatePage = () => {
  const router = useRouter();

  return useMutation(createPage, {
    onSuccess: (data) => {
      void router.push(`/dashboard/pages/${data.slug}`);
      toast({
        title: TOAST_SUCCESS_TITLE,
        description: "You have successfully created page!",
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
