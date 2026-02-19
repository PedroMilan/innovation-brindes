"use client";

import * as React from "react";
import Image from "next/image";
import type { Product } from "@/shared/types/product";
import { Button } from "@/components/ui/Button";
import { IconHeart } from "@/components/icons";
import clsx from "clsx";
import { formatBRL, safeNumber } from "@/shared/utils/format";

export function ProductCard(props: {
  product: Product;
  onQuickView: (p: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const p = props.product;
  const price = formatBRL(safeNumber(p.preco));

  return (
    <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      {false ? null : null}

      <button
        type="button"
        onClick={props.onToggleFavorite}
        className={clsx(
          "absolute left-2 top-2 rounded-full p-2 transition focus:outline-none focus:ring-2 focus:ring-brand-500/40",
          props.isFavorite ? "bg-rose-50 text-rose-600" : "bg-white/90 text-neutral-600 hover:bg-neutral-50",
        )}
        aria-label={props.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <IconHeart filled={props.isFavorite} />
      </button>

      <div className="p-3">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-sm font-semibold leading-tight">{p.nome}</h3>
          <p className="text-[11px] text-neutral-500">{p.codigo}</p>

          <div className="mt-2 w-full">
            <div className="relative mx-auto h-40 w-full">
              <Image
                src={p.imagem}
                alt={p.nome}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-contain"
                priority={false}
              />
            </div>
          </div>

          <p className="mt-2 line-clamp-2 text-[11px] text-neutral-600">
            {p.descricao}
          </p>

          <div className="mt-3 flex items-center justify-center gap-1">
            {/* Dots (visual only; API doesn't provide colors in the test) */}
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full bg-neutral-300"
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="mt-2 text-[11px] text-neutral-500">a partir de</div>
          <div className="text-base font-bold">{price}</div>

          <div className="mt-3 w-full">
            <Button
              type="button"
              className="h-10 w-full rounded-none rounded-b-xl"
              onClick={() => props.onQuickView(p)}
            >
              CONFIRA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
