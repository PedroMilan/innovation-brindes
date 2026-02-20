"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  filterProducts,
  listProducts,
  type ProductsFilter,
} from "./products.api";
import type { Product } from "@/shared/types/product";

export type SortBy = "nome_asc" | "nome_desc" | "preco_asc" | "preco_desc";

export function useDebouncedValue<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export function useProducts(params: { search: string }) {
  const debounced = useDebouncedValue(params.search, 400);

  const query = useQuery<Product[], any>({
    queryKey: ["products", debounced],
    queryFn: async () => {
      const s = debounced.trim();
      if (!s) return await listProducts();

      const isLikelyCode = /^[0-9]+$/.test(s);
      const filters: ProductsFilter = isLikelyCode
        ? { codigo_produto: s }
        : { nome_produto: s };
      return await filterProducts(filters);
    },
  });

  return { ...query, debouncedSearch: debounced };
}
