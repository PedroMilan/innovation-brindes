"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useFavoritesStore } from "@/store/favorites.store";
import { useProducts } from "@/features/products/useProducts";
import {
  ProductsToolbar,
  type ToolbarState,
} from "@/features/products/ProductsToolbar";
import { ProductGrid } from "@/features/products/ProductGrid";
import { ProductQuickView } from "@/features/products/ProductQuickView";
import type { Product } from "@/shared/types/product";
import { ProductSkeleton } from "@/features/products/ProductSkeleton";
import { safeNumber } from "@/shared/utils/format";

export default function ProductsClient() {
  const router = useRouter();

  // ✅ selectors (estáveis)
  const token = useAuthStore((s) => s.token);
  const userName = useAuthStore((s) => s.userName);
  const hydrateAuth = useAuthStore((s) => s.hydrate);
  const logout = useAuthStore((s) => s.logout);

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

  const [visible, setVisible] = React.useState(20);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  // Reset visible on new data
  React.useEffect(() => {
    setVisible(20);
  }, [data]);

  // Infinite scroll (client-side batches)
  React.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setVisible((v) => v + 20);
        }
      },
      { rootMargin: "800px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [quickOpen, setQuickOpen] = React.useState(false);
  const [quickProduct, setQuickProduct] = React.useState<Product | null>(null);

  function openQuick(p: Product) {
    setQuickProduct(p);
    setQuickOpen(true);
  }

  const itemsRaw = data ?? [];

  // Filter favorites if enabled
  const itemsFiltered = toolbar.onlyFavorites
    ? itemsRaw.filter((p) => favoriteCodes.includes(p.codigo))
    : itemsRaw;

  // Local sort
  const itemsSorted = [...itemsFiltered].sort((a, b) => {
    if (toolbar.sort === "nome_asc")
      return a.nome.localeCompare(b.nome, "pt-BR");
    if (toolbar.sort === "nome_desc")
      return b.nome.localeCompare(a.nome, "pt-BR");
    if (toolbar.sort === "preco_asc")
      return safeNumber(a.preco) - safeNumber(b.preco);
    return safeNumber(b.preco) - safeNumber(a.preco);
  });

  const items = itemsSorted.slice(0, Math.min(visible, itemsSorted.length));
  const hasMore = items.length < itemsSorted.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar (similar to screenshot) */}
      <header className="h-14 bg-brand-500">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-36">
              <Image
                src="/logo.jpg"
                alt="Innovation Brindes"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex items-center gap-3 text-white">
            <div className="hidden text-right text-xs leading-tight md:block">
              <div className="font-semibold">{userName ?? "Usuário"}</div>
              <div className="opacity-90">Bem-vindo!</div>
            </div>

            <button
              onClick={logout}
              className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        <ProductsToolbar
          value={{ ...toolbar, onlyFavorites: toolbar.onlyFavorites }}
          onChange={setToolbar}
        />

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

              {/* Sentinel for infinite scroll */}
              <div ref={sentinelRef} className="h-10" />

              {/* Loading incremental */}
              {isFetching && !isLoading ? (
                <div className="mt-4 text-center text-xs text-neutral-500">
                  Carregando...
                </div>
              ) : null}

              {/* Fallback button in case IntersectionObserver doesn't fire */}
              {hasMore ? (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setVisible((v) => v + 20)}
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
