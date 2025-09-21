import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
  const decode = jwtDecode(token);
  return decode;
};
