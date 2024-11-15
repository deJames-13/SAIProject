import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    activeRequests: 0,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.activeRequests += 1;
            state.isLoading = true;
        },
        stopLoading: (state) => {
            state.activeRequests -= 1;
            if (state.activeRequests === 0) {
                state.isLoading = false;
            }
        },
    },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;