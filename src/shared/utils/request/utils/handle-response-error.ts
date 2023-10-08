import { type ApiError } from "../types";

export const handleResponseError = async (response: Response) => {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("No application/json content type provided in headers");
    }

    const error = (await response.json()) as ApiError;
    throw new Error(JSON.stringify(error));
  }
};
