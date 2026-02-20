"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useAuthStore } from "@/store/auth.store";
import { useFavoritesStore } from "@/store/favorites.store";
import { useProducts } from "@/features/products/useProducts";
import {
  ProductsToolbar,
  type ToolbarState,
} from "@/features/products/ProductsToolbar";
import { ProductGrid } from "@/features/products/ProductGrid";
import type { Product } from "@/shared/types/product";
import { ProductSkeleton } from "@/features/products/ProductSkeleton";
import { safeNumber } from "@/shared/utils/format";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

const ProductQuickView = dynamic(
  () =>
    import("@/features/products/ProductQuickView").then(
      (m) => m.ProductQuickView,
    ),
  { ssr: false },
);

const PAGE_SIZE = 10;

export default function ProductsClient() {
  const userName = useAuthStore((s) => s.userName);
  const hydrateAuth = useAuthStore((s) => s.hydrate);

  const favoriteCodes = useFavoritesStore((s) => s.favoriteCodes);
  const hydrateFav = useFavoritesStore((s) => s.hydrate);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  React.useEffect(() => {
    hydrateAuth();
    hydrateFav();
  }, [hydrateAuth, hydrateFav]);

  const [toolbar, setToolbar] = React.useState<ToolbarState>({
    search: "",
    sort: "nome_asc",
    onlyFavorites: false,
  });

  const { data, isLoading, isFetching, isError, refetch } = useProducts({
    search: toolbar.search,
  });

  const [visible, setVisible] = React.useState(PAGE_SIZE);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [data]);

  const itemsRaw = data ?? [];

  const itemsFiltered = React.useMemo(() => {
    if (!toolbar.onlyFavorites) return itemsRaw;
    return itemsRaw.filter((p) => favoriteCodes.includes(p.codigo));
  }, [itemsRaw, toolbar.onlyFavorites, favoriteCodes]);

  const itemsSorted = React.useMemo(() => {
    const arr = [...itemsFiltered];

    arr.sort((a, b) => {
      if (toolbar.sort === "nome_asc")
        return a.nome.localeCompare(b.nome, "pt-BR");
      if (toolbar.sort === "nome_desc")
        return b.nome.localeCompare(a.nome, "pt-BR");
      if (toolbar.sort === "preco_asc")
        return safeNumber(a.preco) - safeNumber(b.preco);
      return safeNumber(b.preco) - safeNumber(a.preco);
    });

    return arr;
  }, [itemsFiltered, toolbar.sort]);

  const items = React.useMemo(
    () => itemsSorted.slice(0, Math.min(visible, itemsSorted.length)),
    [itemsSorted, visible],
  );

  const hasMore = items.length < itemsSorted.length;

  React.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;

        setVisible((v) => {
          if (v >= itemsSorted.length) return v;
          return v + PAGE_SIZE;
        });
      },
      { rootMargin: "800px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [itemsSorted.length]);

  const [quickOpen, setQuickOpen] = React.useState(false);
  const [quickProduct, setQuickProduct] = React.useState<Product | null>(null);

  const openQuick = React.useCallback((p: Product) => {
    setQuickProduct(p);
    setQuickOpen(true);
  }, []);

  const todayLabel = React.useMemo(() => {
    const now = new Date();

    const weekday = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
    }).format(now);

    const date = new Intl.DateTimeFormat("pt-BR").format(now);

    return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${date}`;
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="h-14 bg-brand-500">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-1">
            <div className="flex flex-col pl-15">
              <h4 className="text-white">innovation</h4>
              <span className="text-white text-[10px] text-end">BRINDES</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-white">
            <div className="relative">
              <EnvelopeIcon className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-600">
                11
              </span>
            </div>

            <div className="relative">
              <PhoneIcon className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-600">
                11
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-white/30">
                <span className="text-lg font-bold text-white">
                  {userName?.charAt(0) ?? "U"}
                </span>
              </div>

              <div className="text-right text-sm leading-tight">
                <div className="font-semibold">{userName ?? "Usuário"}</div>
                <div className="text-xs opacity-90">{todayLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        <ProductsToolbar value={toolbar} onChange={setToolbar} />

        <div className="mt-4">
          {isError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <div className="text-sm font-semibold text-red-800">
                Erro ao carregar produtos.
              </div>
              <div className="mt-1 text-xs text-red-700">Tente novamente.</div>
              <button
                onClick={() => refetch()}
                className="mt-3 rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-600"
              >
                Tentar novamente
              </button>
            </div>
          ) : null}

          {isLoading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="mt-8 text-center text-sm text-neutral-600">
              Nenhum produto encontrado.
            </div>
          ) : (
            <>
              <ProductGrid
                items={items}
                onQuickView={openQuick}
                isFavorite={(code) => isFavorite(code)}
                onToggleFavorite={(code) => toggleFavorite(code)}
              />

              <div ref={sentinelRef} className="h-10" />

              {isFetching && !isLoading ? (
                <div className="mt-4 text-center text-xs text-neutral-500">
                  Carregando...
                </div>
              ) : null}

              {hasMore ? (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold hover:bg-neutral-50"
                  >
                    Carregar mais
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </main>

      <ProductQuickView
        open={quickOpen}
        onOpenChange={setQuickOpen}
        product={quickProduct}
      />
    </div>
  );
}
