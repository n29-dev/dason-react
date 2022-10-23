import { createSlice } from '@reduxjs/toolkit';

const currentActiveChat = createSlice({
    name: 'currentActiveChat',
    initialState: {},
    reducers: {
        setCurrentActiveChat(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
});

export default currentActiveChat.reducer;

export const { setCurrentActiveChat } = currentActiveChat.actions;
