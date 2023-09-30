import { API_URL } from "@/shared/constants";

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

  return fetch(API_URL + url, {
    ...config,
    headers,
  });
};
