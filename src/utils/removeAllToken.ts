"use client";
import { logOut } from "@/redux/api/features/authSlice";
import { store } from "@/redux/store";
import Cookies from "js-cookie";

export const removeAllToken = () => {
  store.dispatch(logOut());
  Cookies.remove("accessToken", { path: "/" });
};
