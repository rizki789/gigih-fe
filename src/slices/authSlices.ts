import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("access_token") ?? "",
  },
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      localStorage.setItem("access_token", accessToken);
      state.accessToken = accessToken;
    },
    removeAccessToken: (state) => {
      state.accessToken = "";
      localStorage.removeItem("access_token");
    },
  },
});

export const { setAccessToken, removeAccessToken } = authSlice.actions;

export default authSlice.reducer;