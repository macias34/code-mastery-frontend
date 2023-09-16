import { useEnvironment } from "../environment";

export async function request<TResponse>(
  url: string,
  config?: RequestInit,
  session?: {
    accessToken: string;
  },
): Promise<TResponse> {
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const { getApiUrl } = useEnvironment();

  let headers = config?.headers;

  if (session) {
    headers = {
      ...config?.headers,
      Authorization: "Bearer " + session.accessToken,
    };
  }

  const response = await fetch(getApiUrl() + url, {
    ...config,
    headers,
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {} as TResponse;
    }

    return Promise.reject(await response.json());
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as TResponse;
  }

  return {} as TResponse;
}

export interface ApiError {
  timestamp: string;
  statusCode: number;
  message: string;
  description: string | null;
}
