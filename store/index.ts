import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import favoritesReducer from "./favouriteSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
