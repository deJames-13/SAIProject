import { createSlice } from '@reduxjs/toolkit';

const userInfo = window.localStorage.getItem('userInfo');
const accessToken = window.localStorage.getItem('accessToken');
const initialState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,
  accessToken: accessToken || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userInfo, token } = action.payload;
      state.userInfo = userInfo;
      state.accessToken = token;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('accessToken', token);
    },
    logout: (state) => {
      state.userInfo = null;
      state.accessToken = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => !!state.auth.userInfo;