import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    // cart: cartReducer,
    // product: productReducer,
  },
});

export default store;
