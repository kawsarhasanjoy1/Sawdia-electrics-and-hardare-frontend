"use client";
import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}) => {
  let spinnerSize = "w-8 h-8";
  if (size === "sm") spinnerSize = "w-4 h-4";
  if (size === "lg") spinnerSize = "w-12 h-12";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3  h-screen w-ull ${
        fullScreen ? "fixed inset-0 bg-white/70 z-50" : ""
      }`}
    >
      <div
        className={`animate-spin rounded-full border-4 border-t-blue-500 border-gray-200 ${spinnerSize}`}
      ></div>
      <p className="text-gray-600 font-medium">{text}</p>
    </div>
  );
};

export default Loading;
