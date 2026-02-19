"use client";

import * as React from "react";
import Image from "next/image";
import type { Product } from "@/shared/types/product";
import { Modal } from "@/components/ui/Modal";
import { formatBRL, safeNumber } from "@/shared/utils/format";

export function ProductQuickView(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}) {
  const p = props.product;
  if (!p) return null;

  return (
    <Modal open={props.open} onOpenChange={props.onOpenChange} title="Detalhes do produto">
      <div className="grid gap-4 md:grid-cols-[280px,1fr]">
        <div className="relative h-64 w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
          <Image src={p.imagem} alt={p.nome} fill className="object-contain" />
        </div>

        <div className="space-y-2">
          <div>
            <div className="text-lg font-semibold leading-tight">{p.nome}</div>
            <div className="text-sm text-neutral-500">Código: {p.codigo}</div>
          </div>

          {false ? null : null}

          <p className="text-sm text-neutral-700">{p.descricao}</p>

          <div className="pt-2">
            <div className="text-xs text-neutral-500">Preço</div>
            <div className="text-2xl font-bold">{formatBRL(safeNumber(p.preco))}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
