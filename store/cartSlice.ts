import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./withType";
import {
  getCart,
  addToCart as addToCartApi,
  removeFromCart as removeFromCartApi,
  type Cart,
  type AddToCartRequest,
} from "../src/services/CartApi";
import type { RootState } from "./index";

type CartState = {
  data: Cart | null;
  loading: boolean;
  error: string | null;
};

const initialState: CartState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchCart = createAppAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getCart();
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : "Failed to load cart",
      );
    }
  },
);

export const addToCart = createAppAsyncThunk(
  "cart/add",
  async (body: AddToCartRequest, { rejectWithValue }) => {
    try {
      return await addToCartApi(body);
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : "Failed to add to cart",
      );
    }
  },
);

export const removeFromCart = createAppAsyncThunk(
  "cart/remove",
  async (productId: number, { rejectWithValue }) => {
    try {
      return await removeFromCartApi(productId);
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : "Failed to remove item",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "Something went wrong";
      })
      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "Something went wrong";
      })
      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "Something went wrong";
      });
  },
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart.data;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;
export const selectCartItemCount = (state: RootState) =>
  state.cart.data?.lines.reduce((sum, l) => sum + l.quantity, 0) ?? 0;
