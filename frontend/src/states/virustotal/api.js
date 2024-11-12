import { apiSlice } from "../api";

const baseUrl = '/virustotal';
const headers = {
    'Content-Type': 'application/json',
}

export const vtApi = apiSlice.injectEndpoints({
    endpoints: build => ({
        scanUrl: build.mutation({
            query: url => ({
                url: `${baseUrl}/get_url_report/`,
                method: 'POST',
                headers,
                body: JSON.stringify({
                    url,
                }),
            }),
        }),
    }),
});

export const { useScanUrlMutation } = vtApi;