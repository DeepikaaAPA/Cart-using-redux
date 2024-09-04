import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";
const items = [...products];
const initialState = {
  items,
  totalAmount: 5780,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
        item.total = item.price * quantity;
      }
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.total,
        0
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.total,
        0
      );
    },
  },
});

export const { updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
