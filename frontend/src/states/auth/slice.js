import { createSlice } from '@reduxjs/toolkit';

let userInfo = null;
let accessToken = null;

try {
  const storedUserInfo = window.localStorage.getItem('userInfo');
  if (storedUserInfo) {
    userInfo = JSON.parse(storedUserInfo);
  }
} catch (error) {
  console.error('Error parsing userInfo from localStorage:', error);
}

try {
  accessToken = window.localStorage.getItem('accessToken');
} catch (error) {
  console.error('Error getting accessToken from localStorage:', error);
}

const initialState = {
  userInfo,
  accessToken,
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