import { createSlice } from '@reduxjs/toolkit';

const loading = createSlice({
    name: 'loading',
    initialState: {
        isLoading: true,
    },
    reducers: {
        setLoading(state, { payload }) {
            state.isLoading = payload;
        },
    },
});

export default loading.reducer;

export const { setLoading } = loading.actions;
