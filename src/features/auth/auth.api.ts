"use client";

import axiosInstance from "@/shared/services/axios";
import type { LoginPayload, LoginResponse } from "@/shared/types/auth";

export async function loginRequest(payload: LoginPayload) {
  const res = await axiosInstance.post<LoginResponse>(
    "/login/acessar",
    payload,
  );
  const data = res.data;

  if (data.status !== 1) {
    const err = new Error(data.message || "Erro ao autenticar.");

    (err as any).apiStatus = data.status;
    throw err;
  }

  return data;
}
