"use client";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { store } from "@/redux/store";
import { setUser, logOut } from "@/redux/api/features/authSlice";
import { decodedToken } from "@/utils/decodedToken";

const ACCESS_COOKIE = "accessToken";

// base URL from env so staging/prod easy to switch
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://mazza-rastourent-backend-1.onrender.com/api/v1";
const REFRESH_URL = `${API_BASE}/auth/refresh-token`;

// cookie options
const isProd = process.env.NODE_ENV === "production";
const isCrossSite = true; // true if frontend+backend on different origins
const COOKIE_OPTS: Cookies.CookieAttributes = isCrossSite
  ? { path: "/", sameSite: "none", secure: true, expires: 365 }
  : { path: "/", sameSite: "lax", secure: isProd, expires: 365 };

const instance = axios.create({
  baseURL: API_BASE.endsWith("/") ? API_BASE : API_BASE + "/",
  withCredentials: true,
});

// ---------- refresh queue ----------
let allowRefresh = true;
export const disableRefresh = () => { allowRefresh = false; };
export const enableRefresh = () => { allowRefresh = true; };

let refreshInFlight: Promise<string | undefined> | null = null;
const runRefreshOnce = () => {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const r = await axios.post(REFRESH_URL, {}, { withCredentials: true });
        return (r as any)?.data?.data?.accessToken as string | undefined;
      } catch {
        return undefined;
      } finally {
        setTimeout(() => { refreshInFlight = null; }, 50);
      }
    })();
  }
  return refreshInFlight;
};

// ---------- request interceptor ----------
instance.interceptors.request.use((config: any) => {
  const token = store.getState().auth.token || Cookies.get(ACCESS_COOKIE);
  if (token) {
    config.headers = config.headers ?? {};
    // send raw token, no Bearer
    config.headers.Authorization = token;
  }

  if (config.data && !(config.data instanceof FormData)) {
    config.headers = config.headers ?? {};
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }
  return config;
});

// ---------- response interceptor ----------
instance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const original = err.config as any;
    if (!err.response) return Promise.reject(err);

    const status = err.response.status;
    const isRefreshCall = String(original?.url || "").includes("/auth/refresh-token");

    if (isRefreshCall || original?._retry || !allowRefresh) {
      return Promise.reject(err);
    }

    if (status === 401) {
      original._retry = true;

      const token = await runRefreshOnce();
      if (!token) {
        try { Cookies.remove(ACCESS_COOKIE, { path: "/" }); } catch {}
        store.dispatch(logOut());
        return Promise.reject(err);
      }

      store.dispatch(setUser({ user: decodedToken(token), token }));
      Cookies.set(ACCESS_COOKIE, token, COOKIE_OPTS);

      instance.defaults.headers.common.Authorization = token;
      original.headers = original.headers ?? {};
      original.headers.Authorization = token;

      return instance(original);
    }

    return Promise.reject(err);
  }
);

export default instance;
