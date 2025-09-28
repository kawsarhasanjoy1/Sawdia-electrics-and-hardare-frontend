// logout util on FE
import instance, {
  disableRefresh,
  enableRefresh,
} from "@/halpers/axios/axiosInterceptor";
import Cookies from "js-cookie";
import { store } from "@/redux/store";
import { logOut } from "@/redux/api/features/authSlice";
import { clearCart } from "@/redux/api/features/cartSlice";

export const removeAllToken = async () => {
  try {
    disableRefresh();
    await instance.post("/auth/logout", {});
  } finally {
    Cookies.remove("accessToken", { path: "/" });
    store.dispatch(logOut());
    store.dispatch(clearCart());
    enableRefresh();
  }
};
