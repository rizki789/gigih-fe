import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface tokenState {
  accessToken: string,
}

const initialState: tokenState = {
  accessToken: localStorage.getItem('access_token') ?? '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      localStorage.setItem('access_token', accessToken);
      // eslint-disable-next-line no-param-reassign
      state.accessToken = accessToken;
    },
    removeAccessToken: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.accessToken = '';
      localStorage.removeItem('access_token');
    },
  },
});

export const { setAccessToken, removeAccessToken } = authSlice.actions;
export const accessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
