import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import confgReducer from "./confgSlice";
import searchReducer from "./searchSlice";
import favoritesReducer from "./favoritesSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer,
    confg: confgReducer,
    search: searchReducer,
    favorites: favoritesReducer,
  },
});
export default appStore;
