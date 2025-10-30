import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "favorites";

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Failed to load favorites:", e);
    return [];
  }
};

const initialState = {
  favorites: load(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const movie = action.payload;
      if (!state.favorites.find((m) => m.id === movie.id)) {
        state.favorites.push(movie);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
        } catch (e) {
          console.warn("Failed to save favorites:", e);
        }
      }
    },
    removeFavorite(state, action) {
      const id = action.payload;
      state.favorites = state.favorites.filter((m) => m.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
      } catch (e) {
        console.warn("Failed to save favorites:", e);
      }
    },
    clearFavorites(state) {
      state.favorites = [];
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn("Failed to clear favorites:", e);
      }
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
