import { useQuery } from "react-query";

import { type ApiError, request } from "@/shared/utils";

import { type OrderDto } from "../types";

export const getOrder = (id: string) =>
  request<OrderDto>(`/orders/get/${id}`, { method: "POST" });

export const useGetOrder = (id: string) => {
  return useQuery<OrderDto, ApiError>({
    queryFn: () => getOrder(id),
    queryKey: ["order", id],
  });
};
