/* eslint-disable no-unused-vars */
// Hooks Naming Convention:
// mutation: use{Resource}Mutation
// query: use{Resource}Query
// subscription: use{Resource}Subscription
//
//
// ex: useLoginMutation, useLoginQuery, useLoginSubscription
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';
import { logout, setCredentials } from "./auth/slice";
import { startLoading, stopLoading } from "./misc/loading.slice";

const BASE_URL = import.meta.env.VITE_APP_API_URL + '/api';
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });


const baseQueryWithReAuth = async (args, api, extraOptions) => {
  api.dispatch(startLoading());
  if (![401, 403].includes(result.error?.status)) {
    api.dispatch(stopLoading());
    return result;
  }
  const refreshResult = await baseQuery('/users/refresh', api, extraOptions);
  if (refreshResult?.data?.token) {
    const userInfo = api.getState().auth.userInfo;
    const token = refreshResult.data.token;
    api.dispatch(setCredentials({ userInfo, token }));
    const result = await baseQuery(args, api, extraOptions);
    api.dispatch(stopLoading());
    return result;
  } else {
    api.dispatch(logout());
  }
  api.dispatch(stopLoading());
}


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['threats'],
  endpoints: (builder) => ({}),
});