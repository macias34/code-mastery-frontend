import { useQueryClient } from "react-query";

import { useGetPathnameId } from "./use-get-pathname-id";

export const useInvalidatePathnameCourse = () => {
  const id = useGetPathnameId();
  const queryClient = useQueryClient();
  return {
    invalidateCourse: async () => {
      await queryClient.invalidateQueries(["course", id]);
    },
  };
};
