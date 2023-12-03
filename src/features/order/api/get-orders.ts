import { useQuery } from "react-query";

import { type ApiError, request } from "@/shared/utils";

import { type OrderDto } from "../types";

export const getOrders = () =>
  request<OrderDto[]>(`/orders/get`, { method: "POST" });

export const useGetOrders = () => {
  return useQuery<OrderDto[], ApiError>({
    queryFn: () => getOrders(),
    queryKey: ["orders"],
  });
};
