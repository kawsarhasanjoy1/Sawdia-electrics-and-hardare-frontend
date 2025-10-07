"use client";

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { setUser, logOut } from "@/redux/api/features/authSlice";
import { decodedToken } from "@/utils/decodedToken";
import storeAccesor from "@/redux/storeAccesor/storeAccessor";

const ACCESS_COOKIE = "accessToken";
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://sawdia-electrics-and-hardare-frontend-1.onrender.com/api/v1";
const REFRESH_URL = `${API_BASE}/auth/refresh-token`;

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  path: "/",
  sameSite: "none",
  secure: true,
  expires: 365,
};


const instance = axios.create({
  baseURL: API_BASE.endsWith("/") ? API_BASE : `${API_BASE}/`,
  withCredentials: true,
});


let allowRefresh = true;
export const disableRefresh = () => {
  allowRefresh = false;
};
export const enableRefresh = () => {
  allowRefresh = true;
};

let refreshInProgress: Promise<string | undefined> | null = null;

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
        }, 100);
      });
  }

  return refreshInProgress;
};


instance.interceptors.request.use((config: any) => {
  const token = storeAccesor.getState().auth.token || Cookies.get(ACCESS_COOKIE);

  if (token) {
    config.headers.Authorization = token;
  }

  if (config.data && !(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});


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

    if (error.response.status === 401) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();

      if (!newToken) {
        ["", "/", window.location.pathname].forEach((path) => {
          Cookies.remove(ACCESS_COOKIE, { path });
        });

        storeAccesor.dispatch(logOut());
        return Promise.reject(error);
      }

      Cookies.set(ACCESS_COOKIE, newToken, COOKIE_OPTIONS);
      storeAccesor.dispatch(setUser({ user: decodedToken(newToken), token: newToken }));

      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = newToken;

      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;
