"use client";

import { AUTH_TOKEN } from "@/shared/constants/auth";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_URL } from "@/shared/config/properties";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const excessionRouter = ["/", "/login", "/signup", "/recovery-password"];

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (!excessionRouter.includes(window.location.pathname)) {
        window.location.href = "/";
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
