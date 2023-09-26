import { type AccessToken } from "./types";
import {
  createRequest,
  handleResponseError,
  handleValidResponse,
} from "./utils";

export async function request<TResponse>(
  url: string,
  config?: RequestInit,
  session?: AccessToken,
): Promise<TResponse> {
  const request = createRequest(url, config, session);
  const response = await request;

  const errorResponse = await handleResponseError<TResponse>(response);
  if (errorResponse) {
    return errorResponse;
  }

  const validResponse = await handleValidResponse<TResponse>(response);
  if (validResponse) {
    return validResponse;
  }

  return {} as TResponse;
}
