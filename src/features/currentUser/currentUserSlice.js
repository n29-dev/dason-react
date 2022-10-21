import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'currentUser',
    initialState: {},
    reducers: {
        setCurrentUser(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
});

export default user.reducer;

export const { setCurrentUser } = user.actions;
