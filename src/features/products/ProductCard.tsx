"use client";

import * as React from "react";
import Image from "next/image";
import type { Product } from "@/shared/types/product";
import { Button } from "@/components/ui/Button";
import { IconHeart } from "@/components/icons";
import clsx from "clsx";
import { formatBRL, safeNumber } from "@/shared/utils/format";

type Props = {
  product: Product;
  onQuickView: (p: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

function ProductCardBase(props: Props) {
  const p = props.product;

  const price = React.useMemo(() => formatBRL(safeNumber(p.preco)), [p.preco]);

  const handleQuick = React.useCallback(() => {
    props.onQuickView(p);
  }, [props, p]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={props.onToggleFavorite}
        className={clsx(
          "absolute left-2 top-2 rounded-full p-2 transition focus:outline-none focus:ring-2 focus:ring-brand-500/40",
          props.isFavorite
            ? "bg-rose-50 text-rose-600"
            : "bg-white/90 text-neutral-600 hover:bg-neutral-50",
        )}
        aria-label={
          props.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
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
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <p className="mt-2 line-clamp-2 text-[11px] text-neutral-600">
            {p.descricao}
          </p>

          {/* ✅ substitui 10 bolinhas por 1 elemento leve (parece "paleta") */}
          <div
            className="mt-3 h-2 w-28 rounded-full border border-neutral-200 bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300"
            aria-hidden="true"
          />

          <div className="mt-2 text-[11px] text-neutral-500">a partir de</div>
          <div className="text-base font-bold">{price}</div>

          <div className="mt-3 w-full">
            <Button
              type="button"
              className="h-10 w-full rounded-none rounded-b-xl"
              onClick={handleQuick}
            >
              CONFIRA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProductCard = React.memo(
  ProductCardBase,
  (prev, next) =>
    prev.product.codigo === next.product.codigo &&
    prev.product.preco === next.product.preco &&
    prev.product.nome === next.product.nome &&
    prev.product.imagem === next.product.imagem &&
    prev.product.descricao === next.product.descricao &&
    prev.isFavorite === next.isFavorite,
);
