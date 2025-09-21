"use client";
import { persistor, store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { ClientOnlyWrapper } from "./ClientWrapper";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClientOnlyWrapper>{children}</ClientOnlyWrapper>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
