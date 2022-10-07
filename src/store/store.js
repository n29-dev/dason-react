import { configureStore } from '@reduxjs/toolkit';
import marketReducer from '../features/market/marketSlice';
import salesReducer from '../features/sales/salesSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        sales: salesReducer,
        market: marketReducer,
    },
});

export default store;
