import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      return state;
    },
    removerUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      return state;
    },
  },
});
export default userSlice.reducer;
export const { addUser, removerUser } = userSlice.actions;
