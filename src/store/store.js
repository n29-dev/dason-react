import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../features/loading/loadingSlice';
import marketReducer from '../features/market/marketSlice';
import salesReducer from '../features/sales/salesSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        sales: salesReducer,
        market: marketReducer,
        user: userReducer,
        loading: loadingReducer,
    },
});

export default store;
