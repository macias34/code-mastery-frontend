import { request } from "@/shared/utils";

import { type CategoryDto } from "../types";

export const getAllCategories = () => {
  return request<CategoryDto[]>("/category/");
};
