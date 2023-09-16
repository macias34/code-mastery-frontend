export const useEnvironment = () => {
  const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? "";

  return {
    getApiUrl,
  };
};
