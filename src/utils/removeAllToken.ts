"use client";
import instance, { disableRefresh } from "@/halpers/axios/axiosInterceptor";
import { logOut } from "@/redux/api/features/authSlice";
import { clearCart } from "@/redux/api/features/cartSlice";
import { store } from "@/redux/store";
import Cookies from "js-cookie";

export const removeAllToken = async () => {
  disableRefresh()
  await instance.post("auth/logout", {});
  Cookies.remove("accessToken", { path: "/" });
  store.dispatch(logOut());
  store.dispatch(clearCart());
};
