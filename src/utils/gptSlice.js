import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    moviesName: null,
    tmdbMovieResults: null,
  },
  reducers: {
    toggeleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovie: (state, action) => {
      const { moviesName, tmdbMovieResults } = action.payload;
      state.moviesName = moviesName;
      state.tmdbMovieResults = tmdbMovieResults;
    },
  },
});
export const { toggeleGptSearch, addGptMovie } = gptSlice.actions;
export default gptSlice.reducer;
