/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';

const messages = createSlice({
    name: 'messages',
    initialState: {},
    reducers: {
        setPeerMessageList(state, { payload }) {
            state[payload.peerId] = payload.messageList;
        },
    },
});
export default messages.reducer;

export const { setPeerMessageList } = messages.actions;
