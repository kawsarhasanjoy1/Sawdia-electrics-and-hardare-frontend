"use client";

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { store } from "@/redux/store";
import { setUser, logOut } from "@/redux/api/features/authSlice";
import { decodedToken } from "@/utils/decodedToken";

// Constants
const ACCESS_COOKIE = "accessToken";
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://sawdia-electrics-and-hardare-backen.vercel.app/api/v1";
const REFRESH_URL = `${API_BASE}/auth/refresh-token`;

const isProd = process.env.NODE_ENV === "production";
const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  path: "/",
  sameSite: "none",
  secure: true,
  expires: 365,
};

// Create Axios instance
const instance = axios.create({
  baseURL: API_BASE.endsWith("/") ? API_BASE : `${API_BASE}/`,
  withCredentials: true,
});

// === Refresh Token Control ===
let allowRefresh = true;
export const disableRefresh = () => {
  allowRefresh = false;
};
export const enableRefresh = () => {
  allowRefresh = true;
};

let refreshInProgress: Promise<string | undefined> | null = null;

// === Only Run One Refresh at a Time ===
const refreshAccessToken = async (): Promise<string | undefined> => {
  if (!allowRefresh) return undefined;

  if (!refreshInProgress) {
    refreshInProgress = axios
      .post(REFRESH_URL, {}, { withCredentials: true })
      .then((res) => res?.data?.data?.accessToken)
      .catch(() => undefined)
      .finally(() => {
        setTimeout(() => {
          refreshInProgress = null;
        }, 100); // Slight delay to prevent rapid retry
      });
  }

  return refreshInProgress;
};

// === Request Interceptor ===
instance.interceptors.request.use((config: any) => {
  const token =  Cookies.get(ACCESS_COOKIE);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = token;

  }

  if (config.data && !(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

// === Response Interceptor ===
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (
      !error.response ||
      originalRequest?._retry ||
      !allowRefresh ||
      originalRequest.url.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    // Handle 401: try refresh
    if (error.response.status === 401 || error.response.status === 403) {
      console.log(error.response)
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();
      console.log(newToken)
      if (!newToken) {
        ["", "/", window.location.pathname].forEach((path) => {
          Cookies.remove(ACCESS_COOKIE, { path });
        });
        Cookies.remove('refreshToken',{path: '/'})
        store.dispatch(logOut());
        return Promise.reject(error);
      }

      // Save new token
      Cookies.set(ACCESS_COOKIE, newToken, COOKIE_OPTIONS);
      store.dispatch(setUser({ user: decodedToken(newToken), token: newToken }));

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = newToken;

      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;
