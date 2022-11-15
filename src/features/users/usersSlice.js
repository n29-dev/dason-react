import { createSlice } from '@reduxjs/toolkit';

const setAllUsersListAction = (state, { payload }) => {
    state.allUsers = payload;
};

const setCurrentUserAction = (state, { payload }) => {
    state.currentUser = { ...state.currentUser, ...payload };
};

const setCurrentUserPeersAction = (state, { payload }) => {
    if (payload) {
        state.currentUser.peers = payload;
    } else {
        console.log(state.allUsers);
        const { peers } = state.allUsers.find((user) => user.uid === state.currentUser.uid);
        state.currentUser.peers = peers;
    }
};

const setCurrentActiveChatAction = (state, { payload }) => {
    const { allUsers, currentUser } = state;
    const newActiveChat = currentUser.peers.find((peer) => peer.peerId === payload);

    if (newActiveChat) {
        const { messageRoomPath } = newActiveChat;
        const activeChatUser = allUsers.find((user) => user.uid === payload);
        state.currentActiveChat = { ...activeChatUser, messageRoomPath, messages: [] };
    } else {
        const activeChatUser = allUsers.find((user) => user.uid === payload);
        state.currentActiveChat = { ...activeChatUser, messages: [] };
    }
};

const setCurrentActiveChatMessageAction = (state, { payload }) => {
    state.currentActiveChat.messages = payload;
};

const setCurrentActiveChatMessageRoomPathAction = (state, { payload }) => {
    state.currentActiveChat.messageRoomPath = payload;
};

const setPeersAndContactsAction = (state) => {
    const peers = [];
    const contacts = [];
    let isContact = true;

    state.allUsers.forEach((user) => {
        isContact = true;

        if (user.uid === state.currentUser.uid) {
            return;
        }

        state.currentUser.peers.forEach((peer) => {
            if (peer.peerId === user.uid) {
                peers.push(user);
                isContact = false;
            }
        });

        if (isContact) {
            contacts.push(user);
        }
    });

    state.contacts = contacts;
    state.peers = peers;
};

const removeContactAction = (state, { payload }) => {
    state.contacts = state.contacts.filter((user) => user.uid !== payload);
};

const allUsers = createSlice({
    name: 'users',
    initialState: {
        allUsers: [],
        currentUser: {},
        currentActiveChat: {},
        peers: [],
        contacts: [],
    },
    reducers: {
        setAllUsersList: setAllUsersListAction,
        setCurrentUser: setCurrentUserAction,
        setCurrentUserPeers: setCurrentUserPeersAction,
        setCurrentActiveChat: setCurrentActiveChatAction,
        setCurrentActiveChatMessage: setCurrentActiveChatMessageAction,
        setPeersAndContacts: setPeersAndContactsAction,
        setCurrentActiveChatMessageRoomPath: setCurrentActiveChatMessageRoomPathAction,
        removeContact: removeContactAction,
    },
});

export default allUsers.reducer;

export const {
    setAllUsersList,
    setCurrentUser,
    setCurrentUserPeers,
    setCurrentActiveChat,
    setCurrentActiveChatMessage,
    setPeersAndContacts,
    setCurrentActiveChatMessageRoomPath,
    removeContact,
} = allUsers.actions;
