"use client";

import * as React from "react";
import type { Product } from "@/shared/types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid(props: {
  items: Product[];
  onQuickView: (p: Product) => void;
  isFavorite: (code: string) => boolean;
  onToggleFavorite: (code: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
      {props.items.map((p) => (
        <ProductCard
          key={p.codigo}
          product={p}
          onQuickView={props.onQuickView}
          isFavorite={props.isFavorite(p.codigo)}
          onToggleFavorite={() => props.onToggleFavorite(p.codigo)}
        />
      ))}
    </div>
  );
}
