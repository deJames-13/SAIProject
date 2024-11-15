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
        getUrlReports: build.mutation({
            query: () => ({
                url: `/url-reports/`,
                method: 'GET',
                headers,
            }),
        }),
        getUrlReport: build.mutation({
            query: (id) => ({
                url: `/url-reports/${id}/`,
                method: 'GET',
                headers,
            }),
        }),
        saveUrlReport: build.mutation({
            query: (report) => ({
                url: `/url-reports/`,
                method: 'POST',
                headers,
                body: JSON.stringify(report),
            }),
        }),
        editUrlReport: build.mutation({
            query: (report) => ({
                url: `/url-reports/${report.id}/`,
                method: 'PUT',
                headers,
                body: JSON.stringify(report),
            }),
        }),
        deleteUrlReport: build.mutation({
            query: (id) => ({
                url: `/url-reports/${id}/`,
                method: 'DELETE',
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