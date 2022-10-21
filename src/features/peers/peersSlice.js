import { createSlice } from '@reduxjs/toolkit';

const peers = createSlice({
    name: 'peers',
    initialState: [],
    reducers: {
        setPeersList(state, { payload }) {
            return payload;
        },
    },
});

export default peers.reducer;

export const { setPeersList } = peers.actions;
