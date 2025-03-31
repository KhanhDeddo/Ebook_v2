import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { checkChainQuantityCartItems: false },
  reducers: {
    toggleCheck: (state) => {
      state.checkChainQuantityCartItems = !state.checkChainQuantityCartItems;
    },
  },
});

export const { toggleCheck } = cartSlice.actions;
export default cartSlice.reducer;
