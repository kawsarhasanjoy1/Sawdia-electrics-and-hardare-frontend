"use server";
import { cookies } from "next/headers";

export const removeCookies = async (key: string) => {
  (await cookies()).delete(key);
};
