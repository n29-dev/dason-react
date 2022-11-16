import { createSlice } from '@reduxjs/toolkit';

const chatsTab = createSlice({
    name: 'chatsTab',
    initialState: {
        open: 'chat',
    },
    reducers: {
        toggleChatsTab: (state, { payload }) => {
            state.open = payload;
        },
    },
});

export default chatsTab.reducer;

export const { toggleChatsTab } = chatsTab.actions;
