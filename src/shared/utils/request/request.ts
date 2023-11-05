import { type AccessToken } from "./types";
import { createRequest } from "./utils";

export async function request<TResponse>(
  url: string,
  config?: RequestInit,
  session?: AccessToken,
): Promise<TResponse> {
  const request = createRequest(url, config, session);
  const response = await request;

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {} as TResponse;
    }

    throw await response.json();
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as TResponse;
  }

  return {} as TResponse;
}
