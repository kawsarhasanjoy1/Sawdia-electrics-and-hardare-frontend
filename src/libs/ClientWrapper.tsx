"use client";
import { OnlineProvider } from "@/component/ui/Socket/Socket";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";

interface ClientOnlyWrapperProps {
  children: ReactNode;
}

export const ClientOnlyWrapper = ({ children }: ClientOnlyWrapperProps) => {
  const { userId } = useAppSelector((state) => state.auth.user) as any;

  return userId ? (
    <OnlineProvider userId={userId}>{children}</OnlineProvider>
  ) : (
    <>{children}</>
  );
};
