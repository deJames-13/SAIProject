import { apiSlice } from "../api";

const token = localStorage.getItem('accessToken');

const baseUrl = '/scan-history';
const headers = {
    'Content-Type': 'application/json',
    'authorization': `Token ${token}`,
}

export const historyApi = apiSlice.injectEndpoints({
    endpoints: build => ({
        save: build.mutation({
            query: (data) => ({
                url: `${baseUrl}/`,
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            }),
        }),

        get: build.mutation({
            query: () => ({
                url: `${baseUrl}/`,
                method: 'GET',
                headers,
            }),
        }),

        getById: build.mutation({
            query: (id) => ({
                url: `${baseUrl}/${id}/`,
                method: 'GET',
                headers,
            }),
        }),

        getDeleted: build.mutation({
            query: () => ({
                url: `${baseUrl}/deleted-only/`,
                method: 'GET',
                headers,
            }),
        }),

        getAll: build.mutation({
            query: () => ({
                url: `${baseUrl}/all-with-deleted/`,
                method: 'GET',
                headers,
            }),
        }),

        delete: build.mutation({
            query: (id) => ({
                url: `${baseUrl}/${id}/`,
                method: 'DELETE',
                headers,
                body: JSON.stringify({id}),
            }),
        }),

        restore: build.mutation({
            query: (id) => ({
                url: `${baseUrl}/restore/`,
                method: 'POST',
                headers,
                body: JSON.stringify({id}),
            }),
        }),

    }),
});

export default historyApi;