import { createSlice } from '@reduxjs/toolkit';

const sidebar = createSlice({
    name: 'sidebar',
    initialState: {
        open: true,
    },
    reducers: {
        toggleSidebar: (slice) => {
            slice.open = !slice.open;
        },
    },
});

export default sidebar.reducer;

export const { toggleSidebar } = sidebar.actions;
