import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
    },
    {
        name: 'Page B',
        uv: -3000,
        pv: 1398,
    },
    {
        name: 'Page C',
        uv: -2000,
        pv: -9800,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
    },
    {
        name: 'Page E',
        uv: -1890,
        pv: 4800,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: -3800,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
    },
];

const market = createSlice({
    name: 'market',
    initialState,
    reducers: {
        updateMarketData: (state, { payload }) =>
            state.map((entry) => ({
                name: entry.name,
                uv: entry.uv / payload,
                pv: entry.pv / payload,
            })),
    },
});

export default market.reducer;
export const { updateMarketData } = market.actions;
