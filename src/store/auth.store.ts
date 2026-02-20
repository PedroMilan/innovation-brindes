"use client";

import { create } from "zustand";
import { AUTH_TOKEN, AUTH_COOKIE } from "@/shared/constants/auth";
import { deleteCookie, setCookie } from "@/shared/utils/cookies";

type AuthState = {
  token: string | null;
  userName: string | null;
  remember: boolean;
  setRemember: (v: boolean) => void;
  loginSuccess: (params: { token: string; nome: string }) => void;
  hydrate: () => void;
  logout: () => void;
};

function storage(remember: boolean) {
  return remember ? localStorage : sessionStorage;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  userName: null,
  remember: true,
  setRemember: (v) => set({ remember: v }),
  hydrate: () => {
    if (typeof window === "undefined") return;
    const token =
      localStorage.getItem(AUTH_TOKEN) ?? sessionStorage.getItem(AUTH_TOKEN);
    const userName =
      localStorage.getItem("user_name") ?? sessionStorage.getItem("user_name");
    const remember = localStorage.getItem("remember") === "1";
    set({ token, userName, remember: remember || false });
  },
  loginSuccess: ({ token, nome }) => {
    const remember = get().remember;
    const s = storage(remember);
    s.setItem(AUTH_TOKEN, token);
    s.setItem("user_name", nome);
    s.setItem("remember", remember ? "1" : "0");

    if (!remember) {
      localStorage.setItem(AUTH_TOKEN, token);
      localStorage.setItem("user_name", nome);
    }

    setCookie(AUTH_COOKIE, token, remember ? 7 : 1);

    set({ token, userName: nome });
  },
  logout: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem("user_name");
    localStorage.removeItem("remember");
    sessionStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("remember");
    deleteCookie(AUTH_COOKIE);
    set({ token: null, userName: null });
    window.location.href = "/login";
  },
}));
