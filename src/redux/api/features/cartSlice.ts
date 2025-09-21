import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  subtotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.subtotal = 0;
    },

    calculateTotals: (state) => {
      let totalQty = 0;
      let subtotal = 0;

      state.items.forEach((item) => {
        totalQty += item.quantity;
        subtotal += item.price * item.quantity;
      });

      state.totalQuantity = totalQty;
      state.subtotal = subtotal;
    },
  },
});

const persistConfig = {
  key: "cart",
  storage,
};

export const cartReducer = persistReducer(persistConfig, cartSlice.reducer);

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
