/* eslint-disable consistent-return */
import { createSlice } from '@reduxjs/toolkit';

const contacts = createSlice({
    name: 'contacts',
    initialState: [],
    reducers: {
        setContactList(state, { payload }) {
            return payload;
        },
        removeContact(state, { payload }) {
            // filer conact
            return state.filter((contact) => contact.uid !== payload);
        },
    },
});

export default contacts.reducer;

export const { setContactList, removeContact } = contacts.actions;
