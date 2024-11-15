import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import { authSlice } from './auth/slice';
import loadingReducer from './misc/loading.slice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice.reducer,
  loading: loadingReducer,

});

export default rootReducer;