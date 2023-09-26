import { type ApiError } from "../types";

export const handleResponseError = async <TResponse>(response: Response) => {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {} as TResponse;
    }

    const error = (await response.json()) as ApiError;
    throw new Error(error.message);
  }
};
