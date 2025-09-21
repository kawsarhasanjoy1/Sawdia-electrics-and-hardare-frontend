import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";

import storage from "redux-persist/lib/storage";
export interface TAuth {
  user: {};
  token: string;
}

const initialState: TAuth = {
  user: {},
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TAuth>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.user = {};
      state.token = "";
    },
  },
});

const createPersist = {
  key: "auth",
  storage,
};

export const authPersistReducer = persistReducer(
  createPersist,
  authSlice.reducer
);

export const { setUser, logOut } = authSlice.actions;
