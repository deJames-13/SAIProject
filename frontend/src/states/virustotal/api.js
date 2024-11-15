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
        scanFile: build.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: `${baseUrl}file/scan-file/`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                }
            },
        }),
        scanHash: build.mutation({
            query: hash => ({
                url: `${baseUrl}/scan-hash/`,
                method: 'POST',
                headers,
                body: JSON.stringify({
                    hash,
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