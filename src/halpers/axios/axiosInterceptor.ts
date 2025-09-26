// axios.ts
"use client";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { store } from "@/redux/store";
import { setUser } from "@/redux/api/features/authSlice";
import { decodedToken } from "@/utils/decodedToken";

const ACCESS_COOKIE = "accessToken";
const COOKIE_OPTS: any = { path: "/", sameSite: "Lax", expires: 10 as const };
const REFRESH_URL =
  "https://sawdia-electrics-and-hardare-backend.onrender.com/api/v1/auth/refresh-token";

const instance = axios.create({
  baseURL: "https://sawdia-electrics-and-hardare-backend.onrender.com/api/v/",
  withCredentials: true,
});

instance.interceptors.request.use((config: any) => {
  const token = store.getState().auth.token || Cookies.get(ACCESS_COOKIE);
  if (token) config.headers.Authorization = token;

  if (config.data && !(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const original: any = err.config || {};
    if (!err.response) return Promise.reject(err);
    const isRefresh = String(original?.url || "").includes(
      "auth/refresh-token"
    );
    if (isRefresh || original._retry) return Promise.reject(err);

    if (err.response.status === 401) {
      original._retry = true;
      const r = await axios.post(REFRESH_URL, {}, { withCredentials: true });
      const token = (r as any)?.data?.data?.accessToken as string | undefined;
      if (!token) return Promise.reject(err);

      store.dispatch(setUser({ user: decodedToken(token), token }));
      Cookies.set(ACCESS_COOKIE, token, COOKIE_OPTS);
      instance.defaults.headers.common.Authorization = token;
      original.headers = original.headers || {};
      original.headers.Authorization = token;
      return instance(original);
    }
    return Promise.reject(err);
  }
);

export default instance;
