/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';

const messages = createSlice({
    name: 'messages',
    initialState: {
        loading: true,
    },
    reducers: {
        setPeerMessageList(state, { payload }) {
            state[payload.peerId] = payload.messageList;
        },
        setMessageLoading(state, { payload }) {
            state.loading = payload;
        },
    },
});
export default messages.reducer;

export const { setPeerMessageList, setMessageLoading } = messages.actions;
