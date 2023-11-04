import { useMutation, useQueryClient } from "react-query";

import { TOAST_ERROR_TITLE, TOAST_SUCCESS_TITLE } from "@/libs/toast";
import { toast } from "@/shared/components";
import { type ApiError, request } from "@/shared/utils";

import { type InformationPageDto } from "../types";

export const deletePage = ({
  id,
  accessToken,
}: {
  id: number;
  accessToken: string;
}) =>
  request<InformationPageDto>(
    `/information-page/${id}`,
    {
      method: "DELETE",
    },
    { accessToken },
  );

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePage, {
    onSuccess: () => {
      toast({
        title: TOAST_SUCCESS_TITLE,
        description: "You have successfully deleted page!",
      });
      void queryClient.invalidateQueries(["information-pages"]);
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
