import { useRouter } from "next/router";

export const useGetPathnameId = () => {
  const { query } = useRouter();
  const id = Number.parseInt(query?.id as string);

  return id;
};
