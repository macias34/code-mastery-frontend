export const useEnvironment = () => {
  return {
    getApiUrl,
  };
};

export const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? "";
