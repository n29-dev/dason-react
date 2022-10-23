import { onAuthStateChanged } from 'firebase/auth';
import { collection } from 'firebase/firestore';
import { useEffect } from 'react';
import { batch, useDispatch } from 'react-redux';
import { getAllDocs } from '../components/chats/actions';
import { setAllUsersList } from '../features/allUsers/allUsersSlice';
import { setContactList } from '../features/contacts/contactsSlice';
import { setCurrentActiveChat } from '../features/currentActiveChat/currentActiveChatSlice';
import { setCurrentUser } from '../features/currentUser/currentUserSlice';
import { setLoading } from '../features/loading/loadingSlice';
import { setPeersList } from '../features/peers/peersSlice';
import { auth, db } from '../firebase';
import useFilterUsers from '../hooks/useFilterUsers';
import { getCookie } from '../lib/cookie';

function AuthObserver({ children }) {
    const dispatch = useDispatch();
    const filterUsers = useFilterUsers();

    // set loading to true on pause content render
    dispatch(setLoading(true));

    // get all users
    async function getAllUsers() {
        const allUsersRef = collection(db, 'users');
        const allUsers = await getAllDocs(allUsersRef);
        dispatch(setAllUsersList(allUsers));

        return allUsers;
    }

    // add current user peers
    function addCurrentUserPeers(allUsers, currentUser) {
        const currentUserDoc = allUsers.find((user) => user.uid === currentUser.uid);
        dispatch(setCurrentUser({ peers: currentUserDoc.peers }));
        return { ...currentUser, peers: currentUserDoc.peers };
    }

    // filter users and peers
    function filterPeersContactsAndCurrentActiveChat(currentUser, allUsers, currentActiveChatId) {
        const [peerList, contactList, currentActiveChat] = filterUsers(currentUser, allUsers, currentActiveChatId);

        batch(() => {
            dispatch(setContactList(contactList));
            dispatch(setPeersList(peerList));
            dispatch(setCurrentActiveChat(currentActiveChat));
        });
    }

    async function getAndFilterAllUsers(currentUser) {
        const allUsers = await getAllUsers();
        const updatedCurrentUser = addCurrentUserPeers(allUsers, currentUser);
        // for filtering current user must have peers list
        const currentActiveChatId = getCookie('currentActiveChat') || 0;
        filterPeersContactsAndCurrentActiveChat(updatedCurrentUser, allUsers, currentActiveChatId);

        // set loading false
        dispatch(setLoading(false));
    }

    useEffect(() => {
        // listener for auth state change, also fires initially
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const { uid, displayName, email, photoURL } = currentUser;
                dispatch(setCurrentUser({ uid, displayName, email, photoURL }));
                getAndFilterAllUsers(currentUser);

                // if user not found set user to empty object
            } else {
                dispatch(setCurrentUser({}));
                dispatch(setLoading(false));
            }
        });
    }, []);

    return children;
}

export default AuthObserver;
