import { apiSlice } from "../api";

const baseUrl = '/virustotal';
const headers = {
    'Content-Type': 'application/json',
}

export const vtApi = apiSlice.injectEndpoints({
    endpoints: build => ({
        scanUrl: build.mutation({
            query: url => ({
                url: `${baseUrl}/scan-url/`,
                method: 'POST',
                headers,
                body: JSON.stringify({
                    url,
                }),
            }),
        }),
        getData: build.mutation({
            query: (id) => ({
                url: `${baseUrl}/get-analysis/?id=${id}`,
                method: 'GET',
                headers,
            }),
        }),
    }),
});

export const { 
    useScanUrlMutation,
    useGetDataMutation,
  } = vtApi;
export default vtApi;