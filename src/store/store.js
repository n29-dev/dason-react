import { configureStore } from '@reduxjs/toolkit';
import allUsersReducer from '../features/allUsers/allUsersSlice';
import contactsReducer from '../features/contacts/contactsSlice';
import currentActiveChatReducer from '../features/currentActiveChat/currentActiveChatSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';
import loadingReducer from '../features/loading/loadingSlice';
import marketReducer from '../features/market/marketSlice';
import messagesReducer from '../features/messages/messagesSlice';
import peersReducer from '../features/peers/peersSlice';
import salesReducer from '../features/sales/salesSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';

const store = configureStore({
    devTools: true,
    reducer: {
        sidebar: sidebarReducer,
        sales: salesReducer,
        market: marketReducer,
        currentUser: currentUserReducer,
        loading: loadingReducer,
        messages: messagesReducer,
        contacts: contactsReducer,
        peers: peersReducer,
        allUsers: allUsersReducer,
        currentActiveChat: currentActiveChatReducer,
    },
});

export default store;
