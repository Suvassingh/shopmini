import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
  ids: number[];
};

const initialState: FavoritesState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const idx = state.ids.indexOf(action.payload);
      if (idx === -1) state.ids.push(action.payload);
      else state.ids.splice(idx, 1);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

import type { RootState } from "./index";

export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectIsFavorite = (id: number) => (state: RootState) =>
  state.favorites.ids.includes(id);
export const selectFavoritesCount = (state: RootState) =>
  state.favorites.ids.length;
