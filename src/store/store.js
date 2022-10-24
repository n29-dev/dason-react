import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../features/loading/loadingSlice';
import marketReducer from '../features/market/marketSlice';
import messagesReducer from '../features/messages/messagesSlice';
import salesReducer from '../features/sales/salesSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import usersReducer from '../features/users/usersSlice';

const store = configureStore({
    devTools: true,
    reducer: {
        sidebar: sidebarReducer,
        sales: salesReducer,
        market: marketReducer,
        loading: loadingReducer,
        messages: messagesReducer,
        users: usersReducer,
    },
});

export default store;
