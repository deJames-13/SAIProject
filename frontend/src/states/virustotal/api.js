import { apiSlice } from "../api";


const baseUrl = '/virustotal';
const headers = () => {
    const token = localStorage.getItem('accessToken');
    let h = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
    };
    return h;
}


export const vtApi = apiSlice.injectEndpoints({
    endpoints: build => ({
        scanUrl: build.mutation({
            query: url => {
                console.log(headers());
                return {
                    url: `${baseUrl}/scan-url/`,
                    method: 'POST',
                    headers: headers(),
                    body: JSON.stringify({
                        url,
                    }),
                }
            },
        }),
        scanFile: build.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: `${baseUrl}file/scan-file/`,
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
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

        getFileReport: build.mutation({
            query: ({id, type}) => ({
                url: `${baseUrl}/get-file-report/`,
                method: 'POST',
                headers,
                body: JSON.stringify({
                    id,
                    type
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