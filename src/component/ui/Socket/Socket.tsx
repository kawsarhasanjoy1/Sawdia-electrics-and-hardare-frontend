"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

export interface OnlineUser {
  userId: string;
  status: "online" | "offline";
}

export interface OnlineContextType {
  onlineUsers: OnlineUser[];
}

export const OnlineContext = createContext<OnlineContextType>({
  onlineUsers: [],
});

let socket: Socket | null = null;

export const OnlineProvider = ({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string;
}) => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io("http://localhost:5000", {
        withCredentials: true,
        transports: ["websocket"],
      });
    }


    socket.emit("userOnline", userId);

    // Listen for status updates
    const handleStatusUpdate = (data: OnlineUser) => {
      setOnlineUsers((prev) => {
        const exists = prev.find((u) => u.userId === data.userId);
        if (exists)
          return prev.map((u) => (u.userId === data.userId ? data : u));
        return [...prev, data];
      });
    };

    socket.on("userStatusUpdate", handleStatusUpdate);

    // Disconnect on unload
    const handleUnload = () => {
      socket?.emit("userOffline", userId);
      socket?.disconnect();
      socket = null;
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      socket?.emit("userOffline", userId);
      socket?.off("userStatusUpdate", handleStatusUpdate);
      window.removeEventListener("beforeunload", handleUnload);
      socket = null;
    };
  }, [userId]);

  return (
    <OnlineContext.Provider value={{ onlineUsers }}>
      {children}
    </OnlineContext.Provider>
  );
};

export const useOnlineUsers = () => useContext(OnlineContext);
