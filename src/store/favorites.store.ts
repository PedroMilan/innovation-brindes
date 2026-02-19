"use client";

import { create } from "zustand";

type FavoritesState = {
  onlyFavorites: boolean;
  favoriteCodes: string[];
  hydrate: () => void;
  toggleFavorite: (code: string) => void;
  isFavorite: (code: string) => boolean;
  setOnlyFavorites: (v: boolean) => void;
};

const LS_KEY = "favorites_codes_v1";

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  onlyFavorites: false,
  favoriteCodes: [],
  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? (JSON.parse(raw) as string[]) : [];
      set({ favoriteCodes: Array.isArray(parsed) ? parsed : [] });
    } catch {
      set({ favoriteCodes: [] });
    }
  },
  toggleFavorite: (code) => {
    const current = get().favoriteCodes;
    const exists = current.includes(code);
    const next = exists ? current.filter((c) => c !== code) : [...current, code];
    set({ favoriteCodes: next });
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  },
  isFavorite: (code) => get().favoriteCodes.includes(code),
  setOnlyFavorites: (v) => set({ onlyFavorites: v }),
}));
