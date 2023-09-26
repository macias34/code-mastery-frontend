import { getApiUrl } from "@/shared/hooks";

import { type AccessToken } from "../types";

export const createRequest = (
  url: string,
  config?: RequestInit,
  accessToken?: AccessToken,
) => {
  let headers = config?.headers;

  if (accessToken) {
    headers = {
      ...config?.headers,
      Authorization: "Bearer " + accessToken.accessToken,
    };
  }

  const response = fetch(getApiUrl() + url, {
    ...config,
    headers,
  });

  return response;
};
