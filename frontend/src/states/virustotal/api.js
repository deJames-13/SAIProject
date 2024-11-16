import { apiSlice } from "../api";

function toFormData(obj) {
    const formData = new FormData();
    Object.keys(obj).forEach(key => {
        if (obj[key] instanceof Array) {
            obj[key].forEach(item => {
                formData.append(key, item);
            });
        } 
        else if (obj[key] instanceof Object) {
            formData.append(key, JSON.stringify(obj[key]));
        }
        else {
            formData.append(key, obj[key]);
        }
        
    });
    return formData;
}

const token = localStorage.getItem('accessToken');
const baseUrl = '/virustotal';
const headers = {
    'Content-Type': 'application/json',
    'authorization': `Token ${token}`,
}


export const vtApi = apiSlice.injectEndpoints({
    endpoints: build => ({

        // ##############################################################################
        // SCANNING
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
                    url: `/file-reports/scan-file/`,
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
        // ##############################################################################
        // REPORTS
        getFileData: build.mutation({
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
        getUrlData: build.mutation({
            query: (id) => ({
                url: `${baseUrl}/get-analysis/?id=${id}`,
                method: 'GET',
                headers,
            }),
        }),
        // ##############################################################################



        // ##############################################################################
        // URL REPORTS CRUD
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
        // ##############################################################################


        // FILE REPORTS CRUD
        // ##############################################################################
        getFileReports: build.mutation({
            query: () => ({
                url: `/file-reports/`,
                method: 'GET',
                headers,
            }),
        }),
        getFileReport: build.mutation({
            query: (id) => ({
                url: `/file-reports/${id}/`,
                method: 'GET',
                headers,
            }),
        }),
        saveFileReport: build.mutation({
            query: (report) => ({
                url: `/file-reports/`,
                method: 'POST',
                body: JSON.stringify(report),
                headers,
                // headers: {
                //     'Authorization': `Token ${token}`,
                // },
                // formData: true,
            }),
        }),
        editFileReport: build.mutation({
            query: (report) => ({
                url: `/file-reports/${report.id}/`,
                method: 'PUT',
                body: JSON.stringify(report),
                headers,
                // headers: {
                //     'Authorization': `Token ${token}`,
                // },
                // formData: true,
            }),
        }),
        deleteFileReport: build.mutation({
            query: (id) => ({
                url: `/file-reports/${id}/`,
                method: 'DELETE',
                headers,
            }),
        }),
        // ##############################################################################

        // RESTORE
        // ##############################################################################
        restoreUrlReport: build.mutation({
            query: (id) => ({
                url: `/url-reports/${id}/restore/`,
                method: 'POST',
                headers,
            }),
        }),
        restoreFileReport: build.mutation({
            query: (id) => ({
                url: `/file-reports/${id}/restore/`,
                method: 'POST',
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