"use client";

import axiosInstance from "@/shared/services/axios";
import type { Product } from "@/shared/types/product";

export type ProductsFilter = {
  nome_produto?: string;
  codigo_produto?: string;
};

export async function listProducts() {
  const res = await axiosInstance.get<Product[]>("/produtos/listar");
  return res.data;
}

export async function filterProducts(filters: ProductsFilter) {
  const res = await axiosInstance.post<Product[]>("/produtos/listar", filters);
  return res.data;
}
