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
      const existing = state.items.find((i) => i._id === action.payload._id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: Math.max(action.payload.quantity ?? 1, 1),
        });
      }
      cartSlice.caseReducers.calculateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, Math.floor(action.payload.quantity || 1));
      }
      cartSlice.caseReducers.calculateTotals(state);
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{ id: string; step?: number; max?: number }>
    ) => {
      const { id, step = 1, max } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) {
        const next = item.quantity + step;
        item.quantity = max ? Math.min(next, max) : next;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        step?: number;
        removeIfZero?: boolean;
      }>
    ) => {
      const { id, step = 1, removeIfZero = false } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) {
        const next = item.quantity - step;
        if (next <= 0 && removeIfZero) {
          state.items = state.items.filter((i) => i._id !== id);
        } else {
          item.quantity = Math.max(1, next);
        }
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
        subtotal += Number(item.price) * item.quantity;
      });
      state.totalQuantity = totalQty;
      state.subtotal = subtotal;
    },
  },
});

const persistConfig = { key: "cart", storage };

export const cartReducer = persistReducer(persistConfig, cartSlice.reducer);

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.subtotal;
export const selectCartTotalQty = (state: { cart: CartState }) =>
  state.cart.totalQuantity;
