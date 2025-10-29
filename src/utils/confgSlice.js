import { createSlice } from "@reduxjs/toolkit";

const confgSlice = createSlice({
  name: "confg",
  initialState: {
    lang: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
  },
});
export default confgSlice.reducer;
export const { changeLanguage } = confgSlice.actions;
