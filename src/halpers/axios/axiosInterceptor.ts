"use client";
import { setUser } from "@/redux/api/features/authSlice";
import { store } from "@/redux/store";
import { decodedToken } from "@/utils/decodedToken";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
  timeout: 60000,
});

// ✅ Request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `${token}`; // Bearer token
    }

    // যদি data FormData হয়, তাহলে Content-Type না সেট করা (axios auto handle করবে)
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // 401 error হলে refresh token try করা
    if (error.response?.status === 401) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const token = res?.data?.accessToken;
        if (token) {
          const user = decodedToken(token);
          store.dispatch(setUser({ user, token }));
        }
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
