import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "./withType";
import {
  login,
  logout,
  type LoginRequest,
  type LoginResponse,
} from "../src/services/AuthApi";
import type { RootState } from "./index";

type AuthState = {
  data: LoginResponse | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  data: null,
  loading: false,
  error: null,
};

export const loginUser = createAppAsyncThunk(
  "auth/login",
  async (body: LoginRequest, { rejectWithValue }) => {
    try {
      return await login(body);
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : "Login failed");
    }
  },
);

export const logoutUser = createAppAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      return null;
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : "Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "Something went wrong";
      })
      // logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "Something went wrong";
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth.data;
export const selectIsAuthed = (state: RootState) => state.auth.data !== null;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;