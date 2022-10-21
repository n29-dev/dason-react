import { createSlice } from '@reduxjs/toolkit';

const allUsers = createSlice({
    name: 'allUsers',
    initialState: [],
    reducers: {
        setAllUsersList(state, { payload }) {
            return payload;
        },
    },
});

export default allUsers.reducer;

export const { setAllUsersList } = allUsers.actions;
