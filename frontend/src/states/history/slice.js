import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: []
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory: (state, action) => {
            state.history = action.payload;
        },
        save: (state, action) => {
            state.history.push(action.payload);
        },
        delete: (state, action) => {
            const id = action.payload;
            state.history = state.history.filter(item => item.id !== id);
        }
    },

});

export const actions = historySlice.actions;
export default historySlice.reducer;
