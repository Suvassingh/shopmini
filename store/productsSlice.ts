import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./withType";
import { fetchProducts as fetchProductsApi } from "../src/services/ProductsApi";
import type { Product } from "../src/types";
import type { RootState } from "./index";

type ProductsState = {
  data: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAppAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProductsApi();
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : "Failed to load products",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const { products } = getState();
      if (products.loading || products.data.length > 0) return false;
    },
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "Something went wrong";
      });
  },
});

export const { clearProductsError } = productsSlice.actions;
export default productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.data;
export const selectProductsLoading = (state: RootState) =>
  state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
