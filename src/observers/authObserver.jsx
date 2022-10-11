import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../features/loading/loadingSlice';
import { setCurrentUser } from '../features/user/userSlice';
import { auth } from '../firebase';

function AuthObserver({ children }) {
    const dispatch = useDispatch();

    dispatch(setLoading(true));

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, displayName, email, photoURL } = user;
                dispatch(setCurrentUser({ uid, displayName, email, photoURL }));
            } else {
                dispatch(setCurrentUser({}));
            }

            dispatch(setLoading(false));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
}

export default AuthObserver;
