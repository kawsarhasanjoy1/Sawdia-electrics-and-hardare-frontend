import { setUser } from "@/redux/api/features/authSlice";
import { AppDispatch } from "@/redux/store";
import { decodedToken } from "@/utils/decodedToken";


export const handleLoginSuccess = (dispatch: AppDispatch, token: string) => {
  const user = decodedToken(token);
  dispatch(setUser({ user, token }));
};
