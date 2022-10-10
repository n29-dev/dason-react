import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../features/user/userSlice';
import { auth } from '../firebase';

function AuthObserver({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const { uid, displayName, email, photoURL } = user;
            dispatch(setCurrentUser({ uid, displayName, email, photoURL }));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
}

export default AuthObserver;
