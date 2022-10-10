import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setCurrentUser(state, { payload }) {
            return payload;
        },
    },
});

export default user.reducer;

export const { setCurrentUser } = user.actions;
