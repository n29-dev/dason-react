import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { name: 'A', value: 400 },
    { name: 'B', value: 300 },
    { name: 'C', value: 300 },
];

const salesData = createSlice({
    name: 'sales',
    initialState,
});

export default salesData.reducer;
