import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
import cartReduce  from './slices/cartSlice'
const store = configureStore({
  reducer: {
    // auth: authReducer,
    cart: cartReduce,
  },
});

export default store;
