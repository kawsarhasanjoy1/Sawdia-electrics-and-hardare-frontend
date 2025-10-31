
import Cookies from "js-cookie";
import { store } from "@/redux/store";
import { logOut } from "@/redux/api/features/authSlice";
import { clearCart } from "@/redux/api/features/cartSlice";
import instance, { disableRefresh, enableRefresh } from "@/halpers/axios/axiosInterceptor";

export const removeAllToken = async () => {
  try {
    disableRefresh();
    await instance.post("/auth/logout");
    Cookies.remove('refreshToken', { path: '/' })
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    ["", "/", window.location.pathname].forEach((path) =>
      Cookies.remove("accessToken", { path })
    );

    // Reset Redux store
    store.dispatch(logOut());
    store.dispatch(clearCart());
    enableRefresh();
  }
};
