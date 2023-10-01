import { useRouter } from "next/router";

export const useGetPathnameId = () => {
  const { query } = useRouter();

  return Number.parseInt(query?.id as string);
};
