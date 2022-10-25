import { onAuthStateChanged } from 'firebase/auth';
import { collection } from 'firebase/firestore';
import { useEffect } from 'react';
import { batch, useDispatch } from 'react-redux';
import { getAllDocs } from '../components/chats/actions';
import { setLoading } from '../features/loading/loadingSlice';
import {
    setAllUsersList,
    setCurrentActiveChat,
    setCurrentUser,
    setCurrentUserPeers,
    // eslint-disable-next-line prettier/prettier
    setPeersAndContacts
} from '../features/users/usersSlice';
import { auth, db } from '../firebase';
import { getCookie } from '../lib/cookie';

function AuthObserver({ children }) {
    const dispatch = useDispatch();

    // set loading to true on pause content render
    dispatch(setLoading(true));

    async function getAndFilterAllUsers(currentActiveChatId) {
        const allUsersRef = collection(db, 'users');
        const allUsers = await getAllDocs(allUsersRef);
        // set all initial data
        dispatch(setAllUsersList(allUsers));
        dispatch(setCurrentUserPeers());

        batch(() => {
            if (currentActiveChatId) {
                dispatch(setCurrentActiveChat(currentActiveChatId));
            }
            dispatch(setPeersAndContacts());
            dispatch(setLoading(false));
        });
    }

    useEffect(() => {
        // listener for auth state change, also fires initially
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const { uid, displayName, email, photoURL } = currentUser;
                dispatch(setCurrentUser({ uid, displayName, email, photoURL }));
                const currentActiveChatId = getCookie('activeChatUser');
                getAndFilterAllUsers(currentActiveChatId);

                // if user not found set user to empty object
            } else {
                dispatch(setLoading(false));
                dispatch(setCurrentUser({}));
            }
        });
    }, []);

    return children;
}

export default AuthObserver;
