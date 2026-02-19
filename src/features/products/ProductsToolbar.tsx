"use client";

import * as React from "react";
import { IconSearch } from "@/components/icons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export type ToolbarState = {
  search: string;
  sort: "nome_asc" | "nome_desc" | "preco_asc" | "preco_desc";
  onlyFavorites: boolean;
};

export function ProductsToolbar(props: {
  value: ToolbarState;
  onChange: (next: ToolbarState) => void;
}) {
  const v = props.value;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-md">
        <Input
          placeholder="Buscar por nome ou código..."
          value={v.search}
          onChange={(e) => props.onChange({ ...v, search: e.target.value })}
          leftIcon={<IconSearch />}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={v.sort}
          onChange={(e) => props.onChange({ ...v, sort: e.target.value as any })}
          className="h-10 rounded-full border border-neutral-200 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/40"
          aria-label="Ordenação"
        >
          <option value="nome_asc">Nome (A-Z)</option>
          <option value="nome_desc">Nome (Z-A)</option>
          <option value="preco_asc">Preço (menor)</option>
          <option value="preco_desc">Preço (maior)</option>
        </select>

        <Button
          type="button"
          variant={v.onlyFavorites ? "primary" : "outline"}
          onClick={() => props.onChange({ ...v, onlyFavorites: !v.onlyFavorites })}
          className="h-10"
        >
          {v.onlyFavorites ? "Favoritos: ON" : "Apenas favoritos"}
        </Button>
      </div>
    </div>
  );
}
